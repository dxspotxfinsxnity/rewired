import { createTextNode } from "./createTextNode.js"

export function* flat(
	reference: WeakRef<ParentNode>,
	...children: JSX.Element[]
): Generator<Node | string> {
	for (const i of children) {
		if (i !== null) {
			if (typeof i !== "object") {
				yield String(i)
			} else if ("render" in i) {
				const value = i.render(reference)
				if (Symbol.iterator in value) yield* value
				else yield value
			} else if ("subscribe" in i) {
				yield createTextNode(i)
			} else if (Array.isArray(i)) {
				yield* flat(reference, ...i)
			} else {
				yield i
			}
		}
	}
}
