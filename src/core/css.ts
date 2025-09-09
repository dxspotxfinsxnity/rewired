const className = /\.([a-z]+)/gi

/**
 * Generates a scoped class list from a CSS template literal.
 *
 * Each class name in the template is transformed into a unique identifier that
 * contains a random fragment so that multiple calls do not clash with each
 * other. The returned object maps the original names to the generated ones,
 * allowing callers to use the mapped keys as `className` values.
 */
export function css(
	strings: TemplateStringsArray,
	...values: any[]
): Record<string, string> {
	const classList: Record<string, string> = {}
	const style = document.createElement("style")
	const id = Math.random().toString(36).slice(2)

	let text = ""

	for (let i = 0; i < strings.length; ++i) {
		text += strings[i]
		if (i < values.length) text += values[i]
	}

	style.textContent = text.replace(className, (substring, className) => {
		const unique = `${className}_${id}`
		classList[className] = unique
		return `.${unique}`
	})

	document.head.append(style)
	return classList
}
