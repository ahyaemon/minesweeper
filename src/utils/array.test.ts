import { describe, expect, test } from "vitest"
import { create_random_array, create_zero_filled_array } from "./array"

describe("create_zero_filled_array", () => {
  test("create", () => {
    const len = 3
    const ar = create_zero_filled_array(len)
    expect(ar).toStrictEqual([0, 0, 0])
  })
})

describe("create_random_array", () => {
  test("n is greater than max", () => {
    const len = 100
    const ar = create_random_array(len)
    expect(ar.length).toBe(len)
  })
})
