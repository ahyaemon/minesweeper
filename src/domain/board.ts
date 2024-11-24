import { deep_copy } from "../utils/object"
import {
  type Cell,
  increment_number_cell,
  is_closed,
  is_flagged,
  is_mine,
  is_number,
  is_opened,
} from "./cell"
import { type Coord, get_around_coords } from "./coord"
import type { Row } from "./row"

export type Board = Row[]

function get_cell_or_null(board: Board, [i_row, i_col]: Coord): Cell | null {
  const row = board[i_row]

  if (!row) {
    return null
  }

  const cell = row[i_col]

  return cell ?? null
}

export function increment_number_cell_mutable(board: Board, coord: Coord) {
  const cell = get_cell_or_null(board, coord)

  if (!cell) {
    return
  }

  if (!is_number(cell)) {
    return
  }

  const [i_row, i_col] = coord
  board[i_row][i_col] = increment_number_cell(cell)
}

function push_cand_mutable(cands: Coord[], coord: Coord, board: Board) {
  const cell = get_cell_or_null(board, coord)
  if (!cell) {
    return
  }

  if (is_mine(cell)) {
    return
  }

  if (is_closed(cell) || is_flagged(cell)) {
    cell.status = "opened"
    cands.push(coord)
  }
}

function get_cell(board: Board, [i_row, i_col]: Coord): Cell {
  return board[i_row][i_col]
}

export function open_cells(board: Board, coord: Coord): Board {
  const cands: Coord[] = [coord]
  const new_board = deep_copy(board)

  get_cell(new_board, coord).status = "opened"

  while (cands.length > 0) {
    const cand = cands.pop()
    if (!cand) {
      break
    }

    const cell = get_cell(new_board, cand)
    if (is_mine(cell)) {
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
      if (is_mine(cell)) {
        return true
      }
      return is_opened(cell)
    })
  })
}

// export for test
export { push_cand_mutable }
