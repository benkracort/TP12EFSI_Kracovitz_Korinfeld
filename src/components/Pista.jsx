import { useGameContext } from '../context/GameContext'

const Hint = () => {
	const { currentCountry, revealedHints, hintsLeft, requestHint, isTimeUp } = useGameContext()

	if (!currentCountry) return null

	const chars = Array.from(currentCountry.name)

	return (
		<section className="hint">
			{revealedHints.length > 0 && (
				<div className="hint__letters" aria-label="Pista del nombre del país">
					{chars.map((char, index) => {
						if (!/\p{L}/u.test(char)) {
							return (
								<span key={index} className="hint__separator">
									{char.trim()}
								</span>
							)
						}

						const isRevealed = revealedHints.includes(index)

						return (
							<span
								key={index}
								className={`hint__letter${isRevealed ? ' hint__letter--shown' : ''}`}
							>
								{isRevealed ? char : ''}
							</span>
						)
					})}
				</div>
			)}

			<button
				className="hint__button"
				type="button"
				onClick={requestHint}
				disabled={isTimeUp || hintsLeft === 0}
			>
				Pedir pista (−2s)
			</button>
		</section>
	)
}

export default Hint