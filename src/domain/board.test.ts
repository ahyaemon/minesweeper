import { describe, expect, test } from "vitest"
import {
	type Board,
	is_all_opened,
	open_cells,
	push_cand_mutable,
} from "./board"
import { type Cell, create_mine_cell, create_number_cell } from "./cell"
import type { Coord } from "./coord"

describe("push_cand_mutable", () => {
	test("success", () => {
		const cands: Coord[] = []
		const coord: Coord = [0, 0]
		const board: Board = [
			[{ type: "number", status: "closed", n: 0, coord: [0, 0] }],
		]
		expect(cands).toStrictEqual([])

		push_cand_mutable(cands, coord, board)
		expect(cands).toStrictEqual([[0, 0]])
	})

	test("row not found", () => {
		const cands: Coord[] = []
		const coord: Coord = [-1, 0]
		const board: Board = [
			[{ type: "number", status: "closed", n: 0, coord: [0, 0] }],
		]
		expect(cands).toStrictEqual([])

		push_cand_mutable(cands, coord, board)
		expect(cands).toStrictEqual([])
	})

	test("cell not found", () => {
		const cands: Coord[] = []
		const coord: Coord = [0, -1]
		const board: Board = [
			[{ type: "number", status: "closed", n: 0, coord: [0, 0] }],
		]
		expect(cands).toStrictEqual([])

		push_cand_mutable(cands, coord, board)
		expect(cands).toStrictEqual([])
	})

	test("cell already opened", () => {
		const cands: Coord[] = []
		const coord: Coord = [0, 0]
		const board: Board = [
			[{ type: "number", status: "opened", n: 0, coord: [0, 0] }],
		]
		expect(cands).toStrictEqual([])

		push_cand_mutable(cands, coord, board)
		expect(cands).toStrictEqual([])
	})
})

// 0 0 0 0
// 1 0 0 1
// * 1 1 *
// 1 0 0 1
const create_board = (): Board => {
	return [
		[
			create_number_cell(0, [0, 0]),
			create_number_cell(0, [0, 1]),
			create_number_cell(0, [0, 2]),
			create_number_cell(0, [0, 3]),
		],
		[
			create_number_cell(1, [1, 0]),
			create_number_cell(0, [1, 1]),
			create_number_cell(0, [1, 2]),
			create_number_cell(1, [1, 3]),
		],
		[
			create_mine_cell([2, 0]),
			create_number_cell(1, [2, 1]),
			create_number_cell(1, [2, 2]),
			create_mine_cell([2, 3]),
		],
		[
			create_number_cell(1, [3, 0]),
			create_number_cell(0, [3, 1]),
			create_number_cell(0, [3, 2]),
			create_number_cell(1, [3, 3]),
		],
	]
}

describe("open_cells", () => {
	test("success", () => {
		const board = create_board()
		const coord: Coord = [0, 0]
		const actual = open_cells(board, coord)

		const expected = create_board()
		expected[0][0].status = "opened"
		expected[0][1].status = "opened"
		expected[0][2].status = "opened"
		expected[0][3].status = "opened"
		expected[1][0].status = "opened"
		expected[1][1].status = "opened"
		expected[1][2].status = "opened"
		expected[1][3].status = "opened"
		expected[2][1].status = "opened"
		expected[2][2].status = "opened"

		expect(actual).toStrictEqual(expected)
	})
})

describe("is_all_cleared", () => {
	const create_all_opened_board = (): Board => {
		const board = create_board().map((row) => {
			return row.map((cell) => {
				if (cell.type === "mine") {
					return cell
				}
				const new_cell: Cell = {
					...cell,
					status: "opened",
				}
				return new_cell
			})
		})

		return board
	}

	test("success", () => {
		const board = create_all_opened_board()
		const actual = is_all_opened(board)
		console.log(actual)

		expect(actual).toBeTruthy()
	})

	test("fail", () => {
		// const board = create_all_opened_board()
		// board[0][0].status = "closed"
		// const actual = is_all_opened(board)
		// expect(actual).toBeFalsy()
	})
})
