import { create_random_array, head, seq } from "../utils/array"
import { deep_copy } from "../utils/object"
import { type Board, is_all_opened, open_cells } from "./board"
import {
  type Cell,
  create_mine_cell,
  create_number_cell,
  increment_number_cell,
  is_closed,
  is_flagged,
  is_number,
  is_opened,
} from "./cell"
import type { Coord } from "./coord"

export type Game = {
  board: Board
  n_row: number
  n_col: number
  status: "playing" | "gameover" | "cleared"
}

export function create_all_zero_board(n_row: number, n_col: number): Game {
  const board = seq(n_row).map((i_row) => {
    return seq(n_col).map((i_col) => {
      return create_number_cell(0, [i_row, i_col])
    })
  })

  return { board, n_row, n_col, status: "playing" }
}

export function is_empty(game: Game): boolean {
  for (const row of game.board) {
    for (const cell of row) {
      if (cell.type === "mine") {
        return false
      }
    }
  }
  return true
}

function create_mine_coords(
  n_row: number,
  n_col: number,
  n_mine: number,
  exclusion_coord: Coord,
): number[][] {
  const len = n_row * n_col

  if (n_mine > len) {
    throw Error("n is greater than len")
  }

  const ar_random = create_random_array(len)

  const exclusion_number = exclusion_coord[0] * n_col + exclusion_coord[1]
  const ar_filtered = ar_random.filter((i) => i !== exclusion_number)

  const ar_head = head(ar_filtered, n_mine)

  return ar_head.map((n) => {
    const i_row = Math.trunc(n / n_col)
    const i_col = n % n_col
    return [i_row, i_col]
  })
}

function increment_number_cell_mutable(
  i_row: number,
  i_col: number,
  board: Cell[][],
) {
  const row = board[i_row]

  if (!row) {
    return
  }

  const cell = row[i_col]

  if (!cell) {
    return
  }

  if (cell.type !== "number") {
    return
  }

  board[i_row][i_col] = increment_number_cell(cell)
}

export function place_mine(
  game: Game,
  n_mine: number,
  clicked_coord: Coord,
): Game {
  const new_game = deep_copy(game)
  const board = new_game.board
  const mine_coords = create_mine_coords(
    game.n_row,
    game.n_col,
    n_mine,
    clicked_coord,
  )

  // まず地雷に置き換え
  for (const mine_coord of mine_coords) {
    const i_row = mine_coord[0]
    const i_col = mine_coord[1]
    board[i_row][i_col] = create_mine_cell([i_row, i_col])
  }

  // 地雷の周りのマスの数を数える
  for (const mine_coord of mine_coords) {
    const i_row = mine_coord[0]
    const i_col = mine_coord[1]

    // 上
    increment_number_cell_mutable(i_row - 1, i_col, board)
    // 右上
    increment_number_cell_mutable(i_row - 1, i_col + 1, board)
    // 右
    increment_number_cell_mutable(i_row, i_col + 1, board)
    // 右下
    increment_number_cell_mutable(i_row + 1, i_col + 1, board)
    // 下
    increment_number_cell_mutable(i_row + 1, i_col, board)
    // 左下
    increment_number_cell_mutable(i_row + 1, i_col - 1, board)
    // 左
    increment_number_cell_mutable(i_row, i_col - 1, board)
    // 左上
    increment_number_cell_mutable(i_row - 1, i_col - 1, board)
  }

  return new_game
}

export function get_cell(game: Game, coord: Coord): Cell {
  return game.board[coord[0]][coord[1]]
}

export function click_cell(game: Game, coord: Coord): Game {
  const clicked_cell = get_cell(game, coord)

  if (clicked_cell.type === "mine") {
    // mine の場合、終わり
    const new_game = deep_copy(game)
    const new_board = new_game.board
    new_board[coord[0]][coord[1]].status = "opened"
    new_game.status = "gameover"
    return new_game
  }

  if (clicked_cell.n > 0) {
    // 0 より大きい number の場合、そのマスだけ空けて返す
    const new_game = deep_copy(game)
    const new_board = new_game.board
    new_board[coord[0]][coord[1]].status = "opened"

    if (is_all_opened(new_board)) {
      new_game.status = "cleared"
    }

    return new_game
  }

  // 0 の number の場合、開ける分だけ開いて返す
  const new_game = deep_copy(game)
  const new_board = open_cells(new_game.board, coord)
  new_game.board = new_board

  if (is_all_opened(new_board)) {
    new_game.status = "cleared"
  }

  return new_game
}

export function is_gameover(game: Game): boolean {
  return game.status === "gameover"
}

export function is_cleared(game: Game): boolean {
  return game.status === "cleared"
}

function add_flag(game: Game, coord: Coord): Game {
  const new_game = deep_copy(game)
  const new_cell = get_cell(new_game, coord)
  new_cell.status = "flagged"
  return new_game
}

function remove_flag(game: Game, coord: Coord): Game {
  const new_game = deep_copy(game)
  const new_cell = get_cell(new_game, coord)
  new_cell.status = "closed"
  return new_game
}

export function right_click_cell(game: Game, coord: Coord): Game {
  const cell = get_cell(game, coord)

  if (is_flagged(cell)) {
    return remove_flag(game, coord)
  }

  if (is_closed(cell)) {
    return add_flag(game, coord)
  }

  if (is_opened(cell) && is_number(cell)) {
    // TODO opened で number の場合は隣接するマスを全て開ける
  }

  return game
}
