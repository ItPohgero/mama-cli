const text = {
	mama: {
		version: "Show version number",
		showHelpAfterError: "(Use --help for more information)",
		helpOption: "Display help for commands",
	},
	init: {
		description:
			"Initialize for existing project <type> application default next",
	},
	create: {
		description: "Create a new application project",
		argument: {
			name: "Name of the application",
		},
	},
};

type TypeText = typeof text;

export type { TypeText };
export default text;
