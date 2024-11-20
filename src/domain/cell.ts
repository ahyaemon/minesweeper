import type { Coord } from "./coord"

type CellStatus = "closed" | "opened" | "flagged"

type NumberCell = {
	type: "number"
	status: CellStatus
	n: number
} & { coord: Coord }

type MineCell = {
	type: "mine"
	status: CellStatus
} & { coord: Coord }

export function create_number_cell(n: number, coord: Coord): NumberCell {
	return { type: "number", status: "closed", n, coord }
}

export function increment_number_cell(cell: NumberCell): NumberCell {
	return { ...cell, n: cell.n + 1 }
}

export function create_mine_cell(coord: Coord): MineCell {
	return { type: "mine", status: "closed", coord }
}

export type Cell = NumberCell | MineCell

export function is_opened(cell: Cell): boolean {
	return cell.status === "opened"
}

export function is_closed(cell: Cell): boolean {
	return cell.status === "closed"
}

export function is_flagged(cell: Cell): boolean {
	return cell.status === "flagged"
}

export function is_number(cell: Cell): boolean {
	return cell.type === "number"
}
