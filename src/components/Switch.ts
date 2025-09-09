import { createTextNode } from "../createTextNode.js"
import { IObservable, ISwitch, PickBy } from "../types.js"

export type BranchFactory<T> = (value: T) => JSX.Element

export class Switch<T = any, U = T> implements ISwitch {
	/** Keeps track of the subscription so it can be cleaned up later. */
	unsubscribe?: () => void

	protected branchFactories = new Map<U, BranchFactory<T>>()
	#branches = new Map<U, ChildNode>()
	#comment = document.createComment("")
	#key: () => U
	#previousBranch!: ChildNode

	constructor(
		private state: IObservable<T>,
		key?: ((value: T) => U) | keyof PickBy<T, U>,
	) {
		if (typeof key === "function")
			this.#key = () => key(state.value)
		else if (typeof key === "undefined")
			this.#key = (): any => state.value
		else this.#key = (): any => state.value[key]
	}

	case(key: U, value: BranchFactory<T>): this {
		this.branchFactories.set(key, value)
		return this
	}

	createChildNode(branch: JSX.Element): ChildNode | undefined {
		if (branch === null) return
		if (typeof branch !== "object")
			return document.createTextNode(String(branch))
		if ("subscribe" in branch) return createTextNode(branch)
		if (Symbol.iterator in branch)
			console.error("Array is not supported as a branch")
		else if (!("render" in branch)) return branch as ChildNode
		else if (branch instanceof Switch) return branch.render()
		else console.error("Each is not supported as a branch")
	}

	emplaceBranch(key: U): ChildNode | undefined {
		const branchFactory = this.branchFactories.get(key)
		if (!branchFactory) return
		const branch = branchFactory(this.state.value)
		const childNode = this.createChildNode(branch)
		if (!childNode) return
		this.#branches.set(key, childNode)
		return childNode
	}

	getCurrentBranch(): ChildNode {
		const key = this.#key()

		return (
			this.#branches.get(key) ||
			this.emplaceBranch(key) ||
			this.#comment
		)
	}

	/**
	 * Renders the current branch and sets up a one-time listener that swaps
	 * nodes when `state` emits.
	 *
	 * The initial render returns the currently active child node, and
	 * subsequent updates replace it in place.
	 */
	render(): ChildNode {
		// Keep a reference to the unsubscribe function so callers can
		// tear down the switch if needed.
		this.unsubscribe = this.state.subscribe(() => {
			const currentBranch = this.getCurrentBranch()
			this.#previousBranch.replaceWith(currentBranch)
			this.#previousBranch = currentBranch
		})

		// Store the first rendered branch so that future replacements
		// know what to remove.
		const currentBranch = this.getCurrentBranch()
		this.#previousBranch = currentBranch
		return currentBranch
	}
}
