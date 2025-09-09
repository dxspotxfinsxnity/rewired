import { Observable } from "../core/Observable.js"
import { flat } from "../flat.js"
import { IEach, PickBy } from "../types.js"

type CreateElement<T> = (
	value: Observable<T>,
	index: Observable<number>,
	Observable: Observable<T[]>,
) => JSX.Element

type CreateKey<T> = (value: T) => PropertyKey

class Item<T> {
	element!: JSX.Element
	index: Observable<number>
	value: Observable<T>

	constructor(index: number, value: T) {
		this.index = new Observable(index)
		this.value = new Observable(value)
	}

	set(index: number, value: T) {
		this.index.value = index
		this.value.value = value
	}
}

export class Each<T = any> implements IEach {
	#current = new Map<PropertyKey, Item<T>>()
	#previous = new Map<PropertyKey, Item<T>>()

	constructor(
		private state: Observable<T[]>,
		private key:
			| CreateKey<T>
			| (T extends PropertyKey
					? null
					: keyof PickBy<T, PropertyKey>),
		private createElement: CreateElement<T>,
	) {}

	*render(
		parentElementWeakRef: WeakRef<ParentNode>,
	): Generator<Node | string> {
		const startComment = document.createComment("")
		const endComment = document.createComment("")

		const startCommentWeakRef = new WeakRef(startComment)
		const endCommentWeakRef = new WeakRef(endComment)

		this.state.subscribe((values, unsubscribe) => {
			const _parentElement = parentElementWeakRef.deref()
			const _startComment = startCommentWeakRef.deref()
			const _endComment = endCommentWeakRef.deref()

			if (_parentElement && _startComment && _endComment) {
				this.#replace(
					parentElementWeakRef,
					_parentElement,
					_startComment,
					_endComment,
					values,
				)
			} else unsubscribe()
		})

		yield startComment
		yield* flat(parentElementWeakRef, ...this.#children())
		yield endComment
	}

	*#children(values = this.state.value): Generator<JSX.Element> {
		for (let index = 0; index < values.length; ++index) {
			const value = values[index]

			let key: PropertyKey
			if (typeof this.key === "function")
				key = this.key(value)
			else if (this.key === null) key = value as PropertyKey
			else key = value[this.key] as PropertyKey

			const item = this.#previous.get(key)

			if (item) {
				item.set(index, value)
				this.#current.set(key, item)
				yield item.element
				continue
			}

			const newItem = new Item<T>(index, value)

			const element = this.createElement(
				newItem.value,
				newItem.index,
				this.state,
			)

			if (element) {
				newItem.element = element
				this.#current.set(key, newItem)
				yield element
			}
		}

		;[this.#previous, this.#current] = [
			this.#current,
			this.#previous,
		]

		this.#current.clear()
	}

	#replace(
		parentElementWeakRef: WeakRef<ParentNode>,
		parentElement: ParentNode,
		startComment: Comment,
		endComment: Comment,
		values: T[],
	) {
		const childNodes = Array.from(parentElement.childNodes)

		const startCommentIndex = childNodes.indexOf(startComment) + 1
		const endCommentIndex = childNodes.indexOf(
			endComment,
			startCommentIndex,
		)

		const childNodesBeforeEach = childNodes.slice(
			0,
			startCommentIndex,
		)
		const childNodesAfterEach = childNodes.slice(endCommentIndex)

		const flatChildren = flat(
			parentElementWeakRef,
			...this.#children(values),
		)

		parentElement.replaceChildren(
			...childNodesBeforeEach,
			...flatChildren,
			...childNodesAfterEach,
		)
	}
}
