import { useGame } from "../../states/game"
import { RowTr } from "./RowTr"

export function BoardTable() {
  const { game, is_cleared, is_gameover } = useGame()

  if (!game) {
    return (
      <div>
        <p>Game Not Started</p>
      </div>
    )
  }

  // biome-ignore lint/suspicious/noArrayIndexKey: list の順序は変わらないため
  const board = game.board.map((row, i) => <RowTr key={i} row={row} />)
  return (
    <div>
      <div className="inline-block">{board}</div>
      {is_gameover && <p className="text-red-500">爆散してお前は死んだ</p>}
      {is_cleared && <p>クリア！おめでとう！</p>}
    </div>
  )
}
