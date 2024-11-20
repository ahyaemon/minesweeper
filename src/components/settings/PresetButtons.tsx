import { useSetAtom } from "jotai"
import { n_col_atom, n_mine_atom, n_row_atom } from "../../states/game"
import { Button } from "../Button"

const preset = {
	begginer: {
		n_row: 9,
		n_col: 9,
		n_mine: 10,
	},
	intermediate: {
		n_row: 16,
		n_col: 16,
		n_mine: 40,
	},
	advanced: {
		n_row: 16,
		n_col: 30,
		n_mine: 99,
	},
}

export function PresetButtons() {
	const set_n_row = useSetAtom(n_row_atom)
	const set_n_col = useSetAtom(n_col_atom)
	const set_n_mine = useSetAtom(n_mine_atom)

	const handle_begginer_click = () => {
		set_n_row(preset.begginer.n_row)
		set_n_col(preset.begginer.n_col)
		set_n_mine(preset.begginer.n_mine)
	}

	const handle_intermediate_click = () => {
		set_n_row(preset.intermediate.n_row)
		set_n_col(preset.intermediate.n_col)
		set_n_mine(preset.intermediate.n_mine)
	}

	const handle_advanced_click = () => {
		set_n_row(preset.advanced.n_row)
		set_n_col(preset.advanced.n_col)
		set_n_mine(preset.advanced.n_mine)
	}

	return (
		<div className="flex flex-row gap-2">
			<Button on_click={handle_begginer_click}>初級</Button>
			<Button on_click={handle_intermediate_click}>中級</Button>
			<Button on_click={handle_advanced_click}>上級</Button>
		</div>
	)
}
