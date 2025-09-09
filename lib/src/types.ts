import { Attrs } from "./Attrs.js"

/**
 * A callback that receives a value of type `T` and an "unsubscribe" function.
 *
 * The unsubscribe function allows the consumer to stop receiving further
 * values. This pattern is common in observable or event emitter APIs.
 */
export type Callback<T> = (value: T, unsubscribe: () => void) => void

export type CSSValue = IObservable<null | string> | null | string

export type IEach = {
	render(reference: WeakRef<ParentNode>): Generator<Node | string>
}

export type IObservable<T = any> = {
	is(previousValue: T, currentValue: T): boolean
	subscribe(callback: Callback<T>): () => void
	value: T
}

export type ISwitch = {
	render(): ChildNode
}

/**
 * Select only those properties from `T` whose values are assignable to the type
 * `U`.
 */
export type PickBy<T, U> = {
	[P in keyof T as T[P] extends U ? P : never]: T[P]
}

export type Props<T extends keyof HTMLElementTagNameMap> = {
	[P in keyof Attrs[T]]?: Attrs[T][P] | IObservable<Attrs[T][P]>
} & {
	[P in keyof Attrs[T] as `${P & string}:${keyof HTMLElementEventMap}`]?: IObservable<
		Attrs[T][P]
	>
} & {
	[P in keyof HTMLElementTagNameMap[T] as P extends `on${infer U}`
		? U
		: never]?: HTMLElementTagNameMap[T][P]
} & {
	dataset?: Record<string, IObservable<TextContent> | TextContent>
	style?:
		| ({
				[key: `--${string}`]: CSSValue
		  } & {
				[P in keyof CSSStyleDeclaration as CSSStyleDeclaration[P] extends
					| null
					| string
					? P
					: never]?: CSSValue
		  })
		| CSSValue
}

export type TextContent = boolean | number | string
