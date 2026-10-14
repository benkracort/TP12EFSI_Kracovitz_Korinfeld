import { useGameContext } from '../context/GameContext'

const Timer = () => {
	const { timeLeft, isTimeUp } = useGameContext()

	const level = isTimeUp ? 'over' : timeLeft <= 5 ? 'danger' : 'ok'

	return (
		<section className={`timer timer--${level}`}>
			<p className="timer__title">Tiempo</p>
			<strong className="timer__value">{isTimeUp ? 'Tiempo agotado' : `${timeLeft}s`}</strong>
			{!isTimeUp && <p className="timer__bonus">Si acertás ahora: +{10 + timeLeft}</p>}
		</section>
	)
}

export default Timer