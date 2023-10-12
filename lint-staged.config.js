module.exports = {
	// Type check TypeScript files
	"*.(ts|tsx)": () => "yarn tsc --noEmit",

	// Type check TypeScript files
	// Lint then format TypeScript files
	"*.(ts|tsx)": (filenames) => [
		"yarn tsc --noEmit",
		`yarn eslint --fix ${filenames.join(" ")}`,
		`yarn prettier --write ${filenames.join(" ")}`,
	],

	// Format MarkDown and JSON
	"*.(md|json)": (filenames) => `yarn prettier --write ${filenames.join(" ")}`,
}
