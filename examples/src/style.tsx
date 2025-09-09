import { createElement, Observable, render } from "../../lib/src/index.js"

function px(value: number): string {
	return `${value}px`
}

function rgb(value: number): string {
	return `rgb(${value}, 180, ${value})`
}

const App = (): JSX.Element => {
	const num$ = new Observable(0)

	setInterval(() => (num$.value = (num$.value + 1) % 255), 30)

	return (
		<div
			style={{
				color: num$.map(rgb),
				fontSize: num$.map(px),
				fontWeight: "800",
			}}
		>
			Some Text
		</div>
	)
}

render(<App />, document.body)
