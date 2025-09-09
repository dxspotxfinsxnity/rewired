import { assign } from "../assign.js"
import { flat } from "../flat.js"
import { Props } from "../types.js"

export function createElement<
	T extends ((value: any) => JSX.Element) | keyof HTMLElementTagNameMap,
>(
	name: T,
	props?:
		| null
		| (T extends keyof HTMLElementTagNameMap
				? Props<T>
				: T extends (value: any) => JSX.Element
					? Omit<Parameters<T>[0], "children">
					: never),
	...children: JSX.Element[]
): T extends keyof HTMLElementTagNameMap
	? HTMLElementTagNameMap[T]
	: T extends (value: any) => JSX.Element
		? ReturnType<T>
		: never {
	if (typeof name !== "string") return name({ ...props, children }) as any
	const element = document.createElement(name)
	const reference = new WeakRef(element)
	if (props) assign(element, reference, props as any)
	element.append(...flat(reference, children))
	return element as any
}
