import { useInitGame } from "../../states/game"
import { Button } from "../Button"

export function StartButton() {
  const init_game = useInitGame()

  const handle_start_click = () => {
    init_game()
  }

  return (
    <div>
      <Button on_click={handle_start_click}>START</Button>
    </div>
  )
}
