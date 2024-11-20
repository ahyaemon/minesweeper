export function create_zero_filled_array(len: number): number[] {
  return new Array(len).fill(0)
}

export function seq(n: number): number[] {
  return [...Array(n).keys()]
}

export function head(ar: number[], n: number): number[] {
  return ar.slice(0, n)
}

function shuffle_mutable(array: number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

export function create_random_array(len: number): number[] {
  const ar = seq(len)
  shuffle_mutable(ar)
  return ar
}
