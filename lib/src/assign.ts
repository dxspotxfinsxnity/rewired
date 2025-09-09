import { addEventListener } from "./addEventListener.js"
import { dataset } from "./dataset.js"
import { style } from "./style.js"
import { sync } from "./sync.js"
import { IObservable } from "./types.js"

export function assign(
	element: HTMLElement,
	reference: WeakRef<HTMLElement>,
	properties: Record<string, any>,
): void {
	for (const [key, value] of Object.entries(properties)) {
		if (key !== "scroll" && typeof value === "function")
			addEventListener(element, reference, key, value)
		else if (key === "dataset") dataset(value, element, reference)
		else if (key === "style") style(value, element, reference)
		else if (
			value !== null &&
			typeof value === "object" &&
			"subscribe" in value
		) {
			if (key.includes(":")) {
				bind(key.split(":"), value, element, reference)
			} else sync(key, value, element, reference)
		} else (element as any)[key] = value
	}
}

function bind(
	[key, type]: string[],
	value: IObservable,
	element: HTMLElement,
	reference: WeakRef<HTMLElement>,
): void {
	addEventListener(
		element,
		reference,
		type,
		(event, removeEventListener) => {
			const element = reference.deref()
			if (element) value.value = (event.target as any)[key]
			else removeEventListener()
		},
	)

	sync(key, value, element, reference)
}
