import type { Cell } from "../../domain/cell"
import { useClickCell, useGame, useRightClickCell } from "../../states/game"

type CellTdProps = {
	cell: Cell
}

function get_cell_display(cell: Cell): string {
	if (cell.status === "closed") {
		return ""
	}

	if (cell.status === "flagged") {
		return "🚩"
	}

	if (cell.type === "number") {
		if (cell.n === 0) {
			return ""
		}
		return cell.n.toString()
	}

	return "💣"
}

function ClosedCellTd({ cell }: CellTdProps) {
	const click_cell = useClickCell()
	const right_click_cell = useRightClickCell()
	const { is_cleared, is_gameover } = useGame()

	const disabled = is_gameover || is_cleared

	const display = get_cell_display(cell)
	const handle_click = () => {
		click_cell(cell.coord)
	}
	const handle_context_menu = () => {
		right_click_cell(cell.coord)
	}

	return (
		<button
			className="w-8 h-8 cell-closed"
			type="button"
			onClick={handle_click}
			onContextMenu={(event) => {
				event.preventDefault()
				handle_context_menu()
			}}
			disabled={disabled}
		>
			{display}
		</button>
	)
}

function OpenedCellTd({ cell }: CellTdProps) {
	const display = get_cell_display(cell)

	return <p className="w-8 h-8 cell-opened text-center">{display}</p>
}

export function CellTd({ cell }: CellTdProps) {
	const is_opened = cell.status === "opened"

	return (
		<div className="w-8 h-8">
			{is_opened ? <OpenedCellTd cell={cell} /> : <ClosedCellTd cell={cell} />}
		</div>
	)
}
