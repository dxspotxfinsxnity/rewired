import { flat } from "../flat.js"

export function render(element: JSX.Element, parentElement: Element): void {
	const reference = new WeakRef(parentElement)
	const children = flat(reference, element)
	parentElement.append(...children)
}
