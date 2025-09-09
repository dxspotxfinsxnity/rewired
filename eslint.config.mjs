import parser from "@typescript-eslint/parser"
import perfectionist from "eslint-plugin-perfectionist"

export default [
	{
		files: ["**/*.ts"],
		languageOptions: {
			parser,
		},
	},
	perfectionist.configs["recommended-alphabetical"],
]
