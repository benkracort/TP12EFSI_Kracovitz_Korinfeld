import { useGameContext } from '../context/GameContext'

const Timer = () => {
	const { timeLeft, isTimeUp } = useGameContext()

	return (
		<section className="timer">
			<p className="timer__title">Tiempo</p>
			<strong className="timer__value">{isTimeUp ? 'Tiempo agotado' : `${timeLeft}s`}</strong>
		</section>
	)
}

export default Timer