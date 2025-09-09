import { createElement, If, Observable, render } from "../../lib/src/index.js"

const App = (): JSX.Element => {
	const loggedIn$ = new Observable(false)

	function toggle() {
		return (loggedIn$.value = !loggedIn$.value)
	}

	return new If(loggedIn$)
		.then(() => <button click={toggle}>Log out</button>)
		.else(() => <button click={toggle}>Log in</button>)
}

render(<App />, document.body)
