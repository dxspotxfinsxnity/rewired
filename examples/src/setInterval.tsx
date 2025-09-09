import { createElement, Observable, render } from "../../lib/src/index.js"

export const Counter = (): JSX.Element => {
	const count$ = new Observable(0)
	setInterval(() => ++count$.value, 1000)
	return <p>Count: {count$}</p>
}

render(<Counter />, document.body)
