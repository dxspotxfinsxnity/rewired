import {
	createElement,
	css,
	Each,
	Observable,
	render,
} from "../../lib/src/index.js"

// Update visuals through CSS.
const { completedLineThrough } = css`
	.completedLineThrough[data-completed="true"] {
		text-decoration: line-through;
	}
`

// Todo model with nested observable.
class Todo {
	completed$ = new Observable(false)
	id = Math.random().toString(36).slice(2)
	constructor(public text: string) {}
}

// Todo template.
const createTodo = (todo$: Observable<Todo>): JSX.Element => {
	// `.map(value => value.propName)` shorthand
	const id$ = todo$.at("id")

	return (
		<div>
			<input
				// Triggering the checkbox would update the
				// completed$ observable using two-way binding
				// syntax `htmlAttrName:htmlEventName`. Access
				// the nested observable directly through the
				// parent observable. This assumes the todo
				// won't be re-created with a different
				// `completed$` observable.
				checked:change={todo$.value.completed$}
				id={id$}
				type="checkbox"
			/>
			<label
				className={completedLineThrough}
				// Use dataset to trigger CSS visuals.
				dataset={{ completed: todo$.value.completed$ }}
				htmlFor={id$}
			>
				{todo$.at("text")}
			</label>
		</div>
	)
}

const App = (): JSX.Element => {
	const text$ = new Observable("")
	const todos$ = new Observable<Todo[]>([])

	function addTodo(): void {
		// Check for empty string.
		const text = text$.value.trim()
		if (!text) return
		const todo = new Todo(text)
		text$.value = ""
		// `concat` will return new instance of the array which will
		// trigger an update.
		todos$.value = todos$.value.concat(todo)
	}

	return [
		<div>
			{/* Use two-way binding for todo text. */}
			<input type="text" value:input={text$} />
			<button click={addTodo}>Add Todo</button>
		</div>,
		new Each(todos$, "id", todo$ => {
			console.log(`Creating ${todo$.value.text}`)
			return createTodo(todo$)
		}),
	]
}

render(<App />, document.body)
