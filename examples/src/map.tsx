import { createElement, Observable, render } from "../../lib/src/index.js"

const App = ({ loggedIn$ = new Observable(false) }): JSX.Element => (
	<button click={() => (loggedIn$.value = !loggedIn$.value)}>
		{loggedIn$.map(value => (value ? "Log out" : "Log in"))}
	</button>
)

render(<App />, document.body)
