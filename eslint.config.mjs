import parser from "@typescript-eslint/parser"
import perfectionist from "eslint-plugin-perfectionist"

export default [
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parser,
		},
	},
	perfectionist.configs["recommended-alphabetical"],
]
