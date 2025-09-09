import { createElement, css, Observable, render } from "../../lib/src/index.js"

const { container } = css`
	.container {
		border: 1px solid;
		height: 200px;
		width: 400px;
	}
`

const App = (): JSX.Element => {
	const offsetX$ = new Observable(0)
	const offsetY$ = new Observable(0)

	return (
		<div
			className={container}
			mousemove={event => {
				offsetX$.value = event.offsetX
				offsetY$.value = event.offsetY
			}}
		>
			The mouse position is {offsetX$} x {offsetY$}
		</div>
	)
}

render(<App />, document.body)
