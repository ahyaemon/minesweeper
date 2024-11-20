export type Coord = [i_row: number, i_col: number]

function up_coord([i_row, i_col]: Coord): Coord {
	return [i_row - 1, i_col]
}

function up_right_coord([i_row, i_col]: Coord): Coord {
	return [i_row - 1, i_col + 1]
}

function right_coord([i_row, i_col]: Coord): Coord {
	return [i_row, i_col + 1]
}

function down_right_coord([i_row, i_col]: Coord): Coord {
	return [i_row + 1, i_col + 1]
}

function down_coord([i_row, i_col]: Coord): Coord {
	return [i_row + 1, i_col]
}

function down_left_coord([i_row, i_col]: Coord): Coord {
	return [i_row + 1, i_col - 1]
}

function left_coord([i_row, i_col]: Coord): Coord {
	return [i_row, i_col - 1]
}

function up_left_coord([i_row, i_col]: Coord): Coord {
	return [i_row - 1, i_col - 1]
}

export function get_around_coords(coord: Coord): Coord[] {
	return [
		up_coord(coord),
		up_right_coord(coord),
		right_coord(coord),
		down_right_coord(coord),
		down_coord(coord),
		down_left_coord(coord),
		left_coord(coord),
		up_left_coord(coord),
	]
}
