import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { getCountries } from '../services/countriesnowServices'

const defaultGameContext = {
    countries: [],
    currentCountry: null,
    score: 0,
    timeLeft: 15,
    isTimeUp: false,
    revealedHints: [],
    hintsLeft: 0,
    guess: () => {},
    nextCountry: () => {},
    continueRound: () => {},
    resetScore: () => {},
    requestHint: () => {}
}

const GameContext = createContext(defaultGameContext)
const TIME_LIMIT = 15
const HINT_PENALTY = 2

export const GameProvider = ({ children }) => {
    const [countries, setCountries] = useState([])
    const [currentCountry, setCurrentCountry] = useState(null)
    const [score, setScore] = useState(0)
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT)
    const [isTimeUp, setIsTimeUp] = useState(false)
    const [revealedHints, setRevealedHints] = useState([])

    const letterIndexes = currentCountry
        ? Array.from(currentCountry.name)
              .map((char, index) => (/\p{L}/u.test(char) ? index : -1))
              .filter((index) => index !== -1)
        : []

    const hiddenLetters = letterIndexes.filter((index) => !revealedHints.includes(index))
    const hintsLeft = Math.max(0, hiddenLetters.length - 1)

    const getRandomCountry = useCallback((excludeName = '') => {
        if (countries.length === 0) return null

        const availableCountries = countries.filter(
            (country) => country.name.toLowerCase() !== excludeName.toLowerCase()
        )

        const pool = availableCountries.length > 0 ? availableCountries : countries

        return pool[Math.floor(Math.random() * pool.length)]
    }, [countries])

    const nextCountry = useCallback(() => {
        const randomCountry = getRandomCountry(currentCountry?.name ?? '')

        if (!randomCountry) return

        setCurrentCountry(randomCountry)
        setTimeLeft(TIME_LIMIT)
        setIsTimeUp(false)
        setRevealedHints([])
    }, [currentCountry?.name, getRandomCountry])

    const continueRound = useCallback(() => {
        nextCountry()
    }, [nextCountry])

    useEffect(() => {
        const loadCountries = async () => {
            try {
                const data = await getCountries()

                setCountries(data)

                const randomCountry = data[Math.floor(Math.random() * data.length)]

                setCurrentCountry(randomCountry)
                setTimeLeft(TIME_LIMIT)
                setIsTimeUp(false)
                setRevealedHints([])
            } catch (error) {
                console.error('Error al cargar los países:', error)
            }
        }

        loadCountries()
    }, [])

    const guess = (answer) => {
        if (!currentCountry) return
        if (isTimeUp) return

        const normalizedAnswer = answer.trim().toLowerCase()

        if (!normalizedAnswer) return

        if (normalizedAnswer === currentCountry.name.toLowerCase()) {
            setScore(prevScore => prevScore + 10 + timeLeft)
            nextCountry()
        } else {
            setScore(prevScore => prevScore - 1)
        }
    }

    const resetScore = () => {
        setScore(0)
    }

    const requestHint = () => {
        if (!currentCountry || isTimeUp || hintsLeft === 0) return

        const randomIndex = hiddenLetters[Math.floor(Math.random() * hiddenLetters.length)]

        setRevealedHints(prev => [...prev, randomIndex])
        setTimeLeft(prevTime => Math.max(0, prevTime - HINT_PENALTY))
    }

    useEffect(() => {
        if (!currentCountry || countries.length === 0 || isTimeUp) return

        if (timeLeft <= 0) {
            setIsTimeUp(true)
            return
        }

        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [countries.length, currentCountry, isTimeUp, timeLeft])

    return (
        <GameContext.Provider
            value={{
                countries,
                currentCountry,
                score,
                timeLeft,
                isTimeUp,
                revealedHints,
                hintsLeft,
                guess,
                nextCountry,
                continueRound,
                resetScore,
                requestHint
            }}
        >
            {children}
        </GameContext.Provider>
    )
}

export const useGameContext = () => {
    return useContext(GameContext) ?? defaultGameContext
}