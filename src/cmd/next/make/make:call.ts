import path from "node:path";
import { useMake } from "@/hooks/use_make";
import inquirer from "inquirer";

const TEMPLATE_QUERY = path.join(
	__dirname,
	"../../../template/next/init/make/call_query.ejs.t",
);
const TEMPLATE_MUTATION = path.join(
	__dirname,
	"../../../template/next/init/make/call_mutation.ejs.t",
);

export const MakeCall = async () => {
	const { TypeOptions } = await inquirer.prompt([
		{
			type: "list",
			name: "TypeOptions",
			message: "Select the type of call:",
			choices: [
				{ name: "Query", value: TEMPLATE_QUERY },
				{ name: "Mutation", value: TEMPLATE_MUTATION },
			],
		},
		{
			type: "input",
			name: "endpoint",
			message: "Enter the endpoint path:",
		},
	]);
	const run = useMake({
		configDirKey: "call",
		templatePath: TypeOptions,
		fileStructure: {
			directoryPattern: undefined,
			filePattern: "call_{name}",
			extension: ".ts",
		},
		promptMessage: "Enter api name (e.g.,login, profile):",
	});

	await run();
};
