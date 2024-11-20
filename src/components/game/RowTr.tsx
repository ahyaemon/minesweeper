import type { Row } from "../../domain/game"
import { CellTd } from "./CellTd"

type RowTrProps = {
	row: Row
}

export function RowTr({ row }: RowTrProps) {
	// biome-ignore lint/suspicious/noArrayIndexKey: list の順序は変わらないため
	const cell_items = row.map((cell, i) => <CellTd key={i} cell={cell} />)
	return <div className="flex flex-row">{cell_items}</div>
}
