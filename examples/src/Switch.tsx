import {
	createElement,
	Observable,
	render,
	Switch,
} from "../../lib/src/index.js"

const options = {
	blue: () => <strong style="color: blue">Blue Thing</strong>,
	green: () => <strong style="color: green">Green Thing</strong>,
	red: () => <strong style="color: red">Red Thing</strong>,
}

const keys = Object.keys(options)

const App = (): JSX.Element => {
	const selected$ = new Observable(keys[0])

	return [
		<select value:input={selected$}>
			{keys.map(value => (
				<option value={value}>{value}</option>
			))}
		</select>,
		new Switch(selected$).from(options),
	]
}

render(<App />, document.body)
