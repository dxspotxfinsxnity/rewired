import { IObservable } from "./types.js"

export function sync<W extends WeakKey, P extends PropertyKey, T>(
	key: P,
	state: IObservable<T>,
	element: W,
	reference: WeakRef<W>,
	get?: (element: W, key: P) => T,
	set?: (element: W, key: P, value: T) => void,
): void {
	state.subscribe((value, unsubscribe) => {
		const element = reference.deref()

		if (element) {
			const previousValue = get
				? get(element, key)
				: (element as Record<P, T>)[key]

			if (!state.is(value, previousValue)) {
				if (set) set(element, key, value)
				else (element as Record<P, T>)[key] = value
			}
		} else unsubscribe()
	})

	if (set) set(element, key, state.value)
	else (element as Record<P, T>)[key] = state.value
}
