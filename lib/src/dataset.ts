import { sync } from "./sync.js"
import { IObservable } from "./types.js"

type T = string | undefined

export function dataset(
	dataset: Record<string, IObservable<T> | T>,
	element: HTMLElement,
	reference: WeakRef<HTMLElement>,
): void {
	for (const [key, value] of Object.entries<IObservable<T> | T>(dataset))
		if (typeof value === "string" || typeof value === "undefined")
			element.dataset[key] = value
		else sync(key, value, element, reference, get, set)
}

function get(element: HTMLElement, key: string): T {
	return element.dataset[key]
}

function set(element: HTMLElement, key: string, value: T): void {
	element.dataset[key] = value
}
