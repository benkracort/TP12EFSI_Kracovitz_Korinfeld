import { useGameContext } from '../context/GameContext'
 
const ScoreBoard = () => {
	const { score } = useGameContext()
 
	return (
		<section className="scoreboard">
			<p className="scoreboard__title">Puntaje</p>
			<strong className="scoreboard__score">{score}</strong>
		</section>
	)
}
 
export default ScoreBoard
	