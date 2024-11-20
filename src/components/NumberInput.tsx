type NumberInputProps = {
  value: string | number
  on_change: (s: string) => void
}

export function NumberInput({ value, on_change }: NumberInputProps) {
  return (
    <input
      className="border border-black py-1 px-2 w-20"
      type="number"
      value={value}
      onChange={(e) => {
        on_change(e.currentTarget.value)
      }}
    />
  )
}
