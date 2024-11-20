import type { PropsWithChildren } from "react"

type ButtonProps = {
  on_click?: () => void
} & PropsWithChildren

export function Button({ on_click, children }: ButtonProps) {
  return (
    <button
      className="border border-black py-1 px-2"
      type="button"
      onClick={on_click}
    >
      {children}
    </button>
  )
}
