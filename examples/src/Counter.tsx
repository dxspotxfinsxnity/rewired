import { createElement, Observable, render } from "../../lib/src/index.js"

export const Counter = (): JSX.Element => {
	const count$ = new Observable(0)

	return (
		<div>
			<button click={() => --count$.value}>-</button>
			<button click={() => ++count$.value}>+</button>
			<p>Count: {count$}</p>
		</div>
	)
}

render(<Counter />, document.body)
