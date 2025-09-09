import { IObservable, TextContent } from "./types.js"

export function createTextNode(data: IObservable<TextContent>): Text {
	const textNode = document.createTextNode(String(data.value))
	const textNodeWeakRef = new WeakRef(textNode)

	data.subscribe((value, unsubscribe) => {
		const textNode = textNodeWeakRef.deref()
		if (textNode) textNode.nodeValue = String(value)
		else unsubscribe()
	})

	return textNode
}
