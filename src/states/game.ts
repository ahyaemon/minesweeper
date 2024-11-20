import { atom, useAtomValue, useSetAtom } from "jotai"
import { is_flagged } from "../domain/cell"
import type { Coord } from "../domain/coord"
import {
  type Game,
  click_cell,
  create_all_zero_board,
  get_cell,
  is_cleared,
  is_empty,
  is_gameover,
  place_mine,
  right_click_cell,
} from "../domain/game"

export const n_row_atom = atom(9)
export const n_col_atom = atom(9)
export const n_mine_atom = atom(10)
export const game_atom = atom<Game | null>(null)

export const init_game_atom = atom(null, (get, set) => {
  const n_row = get(n_row_atom)
  const n_col = get(n_col_atom)
  set(game_atom, () => create_all_zero_board(n_row, n_col))
})

export function useGame() {
  const game = useAtomValue(game_atom)
  return {
    game,
    is_gameover: game ? is_gameover(game) : false,
    is_cleared: game ? is_cleared(game) : false,
  }
}

export function useInitGame() {
  const init_game = useSetAtom(init_game_atom)
  return init_game
}

export function useClickCell() {
  const setGame = useSetAtom(game_atom)
  const n_mine = useAtomValue(n_mine_atom)
  return (coord: Coord) => {
    setGame((game) => {
      if (game === null) {
        throw Error("Game is null at click cell.")
      }

      const cell = get_cell(game, coord)
      if (is_flagged(cell)) {
        return game
      }

      let new_game = game
      if (is_empty(new_game)) {
        new_game = place_mine(new_game, n_mine, coord)
      }

      new_game = click_cell(new_game, coord)

      return new_game
    })
  }
}

export function useRightClickCell() {
  const setGame = useSetAtom(game_atom)
  return (coord: Coord) => {
    setGame((game) => {
      if (game === null) {
        throw Error("Game is null at flag cell.")
      }

      const new_game = right_click_cell(game, coord)

      return new_game
    })
  }
}
