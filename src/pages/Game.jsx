import Flag from '../components/Flag'
import GuessForm from '../components/GuessForm'
import Hint from '../components/Pista'
import ScoreBoard from '../components/ScoreBoard'
import Timer from '../components/Timer'

const Game = () => {
	return (
		<main className="game-page">
			<section className="game-page__header">
				<ScoreBoard />
				<Timer />
			</section>

			<section className="game-page__content">
				<Flag />
				<Hint />
				<GuessForm />
			</section>
		</main>
	)
}

export default Game