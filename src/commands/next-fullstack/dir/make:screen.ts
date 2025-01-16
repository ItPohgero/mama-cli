import fs from "node:fs";
import path from "node:path";
import { env } from "@/configs/environtment";
import { useReadConfig } from "@/hooks/use_configfiles";
import { useHandleFileExists } from "@/hooks/use_fileexist";
import { ProcessName } from "@/utils/capitalize";
import handleError from "@/utils/error";
import { validaCannotBeEmpty } from "@/utils/validaCannotBeEmpty";
import chalk from "chalk";
import ejs from "ejs";
import inquirer from "inquirer";

const TEMPLATE_FILE = path.resolve(
	__dirname,
	"./templates/next_fullstack/screen.ejs.t",
);

export const MakeScreen = async (): Promise<void> => {
	try {
		// Read configuration
		const config = useReadConfig(env.configFile);
		const screenDir = config?.dir?.screen;

		if (!screenDir) {
			throw new Error(
				"Screen directory not configured. Please check your config file.",
			);
		}
		const { name } = await inquirer.prompt([
			{
				type: "input",
				name: "name",
				message: chalk.dim.gray("Enter screen name (e.g., Login, Profile):"),
				validate: validaCannotBeEmpty,
			},
		]);

		const processedName = ProcessName(name);
		const fileType = ".tsx";
		const targetDir = path.resolve(screenDir);
		const targetFile = path.join(
			targetDir,
			`${processedName}Screen${fileType}`,
		);

		// Verify template exists
		if (!fs.existsSync(TEMPLATE_FILE)) {
			throw new Error(`Template file not found at: ${TEMPLATE_FILE}`);
		}

		// Check for existing file and handle overwrite
		const shouldProceed = await useHandleFileExists(targetFile);
		if (!shouldProceed) {
			return;
		}
		// Create directory structure if it doesn't exist
		await fs.promises.mkdir(targetDir, { recursive: true });

		console.log(
			chalk.blue(`Creating file ${chalk.yellow(processedName + fileType)}...`),
		);
		// Read and render template
		const templateContent = await fs.promises.readFile(TEMPLATE_FILE, "utf8");
		const renderedContent = ejs.render(templateContent, {
			name: processedName,
			createdAt: new Date().toISOString(),
			author: env.name || "unknown",
		});

		// Write file
		await fs.promises.writeFile(targetFile, renderedContent, "utf8");
		console.log(
			chalk.green(
				`✓ File successfully created at: ${chalk.yellow(targetFile)}`,
			),
		);
	} catch (error) {
		handleError(error);
	}
};
