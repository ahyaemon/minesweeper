import { deep_copy } from "../utils/object"
import { type Coord, get_around_coords } from "./coord"
import type { Row } from "./row"

export type Board = Row[]

function push_cand_mutable(cands: Coord[], coord: Coord, board: Board) {
	const [irow, icol] = coord
	const row = board[irow]

	if (!row) {
		return
	}

	const cell = row[icol]

	if (!cell) {
		return
	}

	if (cell.type === "mine") {
		return
	}

	if (cell.status === "closed") {
		cell.status = "opened"
		cands.push(coord)
	}
}

export function open_cells(board: Board, coord: Coord): Board {
	const cands: Coord[] = [coord]
	const new_board = deep_copy(board)

	new_board[coord[0]][coord[1]].status = "opened"

	while (cands.length > 0) {
		const cand = cands.pop()

		if (!cand) {
			break
		}

		const [irow, icol] = cand
		const cell = new_board[irow][icol]

		if (cell.type === "mine") {
			throw Error("Invalid Mine")
		}

		if (cell.n > 0) {
			continue
		}

		// 周辺のマスを開きつつ候補に入れる
		for (const c of get_around_coords(cand)) {
			push_cand_mutable(cands, c, new_board)
		}
	}

	return new_board
}

export function is_all_opened(board: Board): boolean {
	return board.every((row) => {
		return row.every((cell) => {
			if (cell.type === "mine") {
				return true
			}
			return cell.status === "opened"
		})
	})
}

// export for test
export { push_cand_mutable }
