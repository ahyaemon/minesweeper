import { useAtom } from "jotai"
import { n_col_atom, n_mine_atom, n_row_atom } from "../../states/game"
import { NumberInput } from "../NumberInput"

export function SettingForm() {
	const [n_row, set_n_row] = useAtom(n_row_atom)
	const [n_col, set_n_col] = useAtom(n_col_atom)
	const [n_mine, set_n_mine] = useAtom(n_mine_atom)

	return (
		<div className="flex flex-row gap-2">
			<div>
				<p>縦</p>
				<NumberInput value={n_row} on_change={(s) => set_n_row(Number(s))} />
			</div>
			<div>
				<p>横</p>
				<NumberInput value={n_col} on_change={(s) => set_n_col(Number(s))} />
			</div>
			<div>
				<p>地雷の数</p>
				<NumberInput value={n_mine} on_change={(s) => set_n_mine(Number(s))} />
			</div>
		</div>
	)
}
