import { createElement, Each, Observable, render } from "../../lib/src/index.js"

const createCat = (
	cat$: Observable<{ id: string; name: string }>,
	i$: Observable<number>,
): JSX.Element => (
	<li>
		<a
			href={cat$.map(
				value =>
					`https://www.youtube.com/watch?v=${value.id}`,
			)}
			target="_blank"
		>
			{i$.map(value => value + 1)}: {cat$.at("name")}
		</a>
	</li>
)

const App = (): JSX.Element => {
	const cats$ = new Observable([
		{ id: "J---aiyznGQ", name: "Keyboard Cat" },
		{ id: "z_AbfPXTKms", name: "Maru" },
		{ id: "OUtn3pvWmpg", name: "Henri The Existential Cat" },
	])

	return <ul>{new Each(cats$, "id", createCat)}</ul>
}

render(<App />, document.body)
