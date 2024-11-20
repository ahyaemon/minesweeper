type IfNotNullProps<T> = {
	o: T | null
	t: (arg: T) => JSX.Element
	f: JSX.Element
}

export function IfNotNull<T>({ o, t, f }: IfNotNullProps<T>) {
	return (
		<>
			{o && t(o)}
			{!o && f}
		</>
	)
}
