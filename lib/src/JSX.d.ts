import { IEach, IObservable, ISwitch, Props, TextContent } from "./types.js"

declare global {
	namespace JSX {
		type Element =
			| Element[]
			| IEach
			| IObservable<TextContent>
			| ISwitch
			| Node
			| null
			| TextContent

		type IntrinsicElements = {
			[T in keyof HTMLElementTagNameMap]: Props<T>
		}
	}
}
