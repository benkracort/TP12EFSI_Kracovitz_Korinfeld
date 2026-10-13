import { GameProvider } from './context/GameContext'
import Game from './pages/Game'

export default function App() {
  return (
    <>
      <GameProvider>
        <Game />
      </GameProvider>
    </>
  )
}
