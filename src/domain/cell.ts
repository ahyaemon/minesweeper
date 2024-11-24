import type { Coord } from "./coord"

export const CellType = {
  number: "number",
  mine: "mine",
} as const

type CellType = keyof typeof CellType

export const CellStatus = {
  closed: "closed",
  opened: "opened",
  flagged: "flagged",
} as const

type CellStatus = keyof typeof CellStatus

type NumberCell = {
  type: typeof CellType.number
  status: CellStatus
  n: number
  coord: Coord
}

type MineCell = {
  type: typeof CellType.mine
  status: CellStatus
  coord: Coord
}

export type Cell = NumberCell | MineCell

export function create_number_cell(n: number, coord: Coord): NumberCell {
  return { type: CellType.number, status: CellStatus.closed, n, coord }
}

export function increment_number_cell(cell: NumberCell): NumberCell {
  return { ...cell, n: cell.n + 1 }
}

export function create_mine_cell(coord: Coord): MineCell {
  return { type: CellType.mine, status: CellStatus.closed, coord }
}

export function is_opened(cell: Cell): boolean {
  return cell.status === CellStatus.opened
}

export function is_closed(cell: Cell): boolean {
  return cell.status === CellStatus.closed
}

export function is_flagged(cell: Cell): boolean {
  return cell.status === CellStatus.flagged
}

export function is_number(cell: Cell): cell is NumberCell {
  return cell.type === CellType.number
}

export function is_mine(cell: Cell): cell is MineCell {
  return cell.type === CellType.mine
}
