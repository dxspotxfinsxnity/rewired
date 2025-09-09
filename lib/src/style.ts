import { sync } from "./sync.js"
import { CSSValue } from "./types.js"

const uppercaseRegex = /[A-Z]/g

export function style(
	cssText: CSSValue | Record<keyof CSSStyleDeclaration, CSSValue>,
	element: HTMLElement,
	reference: WeakRef<HTMLElement>,
): void {
	if (typeof cssText === "string" || cssText === null) {
		element.style = cssText || ""
	} else if ("subscribe" in cssText) {
		sync("style", cssText, element, reference, get, set)
	} else {
		for (let [key, value] of Object.entries<CSSValue>(cssText)) {
			key = key
				.replace(uppercaseRegex, prefixWithHyphen)
				.toLowerCase()

			if (typeof value === "string" || value === null) {
				element.style.setProperty(key, value)
			} else sync(key, value, element, reference, get, set)
		}
	}
}

function get(element: HTMLElement, key: string): string {
	return element.style.getPropertyValue(key)
}

function prefixWithHyphen(char: string): string {
	return `-${char}`
}

function set(element: HTMLElement, key: string, value: null | string) {
	element.style.setProperty(key, value)
}
