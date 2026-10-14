import { useState } from 'react'
import { useGameContext } from '../context/GameContext'

const GuessForm = () => {
	const { guess, countries, currentCountry, isTimeUp } = useGameContext()
	const [answer, setAnswer] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()

		if (!answer.trim()) return

		guess(answer)
		setAnswer('')
	}

	return (
		<form className="guess-form" onSubmit={handleSubmit}>
			<label className="guess-form__label" htmlFor="countryGuess">
				Adiviná el país
			</label>

			<div className="guess-form__controls">
				<input
					className="guess-form__input"
					id="countryGuess"
					type="text"
					value={answer}
					onChange={(event) => setAnswer(event.target.value)}
					placeholder="Escribí un país"
					autoComplete="off"
					list="countries-list"
					disabled={!currentCountry || isTimeUp}
				/>

				<button
					className="guess-form__button"
					type="submit"
					disabled={!currentCountry || isTimeUp || !answer.trim()}
				>
					Enviar
				</button>
			</div>

			<datalist id="countries-list">
				{countries.map((country) => (
					<option key={country.iso3 || country.name} value={country.name} />
				))}
			</datalist>
		</form>
	)
}

export default GuessForm