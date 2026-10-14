import { useGameContext } from '../context/GameContext'

const Flag = () => {
	const { currentCountry, isTimeUp, continueRound } = useGameContext()

	if (!currentCountry) {
		return (
			<section className="flag flag--loading">
				<p className="flag__message">Cargando bandera...</p>
			</section>
		)
	}

	return (
		<section className="flag">
			<div className="flag__image-wrapper">
				<img
					className="flag__image"
					src={currentCountry.flag}
					alt={`Bandera de ${currentCountry.name}`}
				/>
				{isTimeUp && (
					<div className="flag__overlay">
						<p className="flag__reveal-text">Se terminó el tiempo.</p>
						<p className="flag__answer">Era {currentCountry.name}</p>
						<button className="flag__continue-button" type="button" onClick={continueRound}>
							Continuar
						</button>
					</div>
				)}
			</div>
		</section>
	)
}

export default Flag