export function deep_copy<T>(o: T): T {
	return JSON.parse(JSON.stringify(o))
}
