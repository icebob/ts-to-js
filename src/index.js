import tsBlankSpace from "ts-blank-space";
import { promises as fs } from "fs";
import path from "path";
import prettier from "prettier";
import glob from "fast-glob";

export async function convertFile(srcFile, destFile, opts = {}) {
	const content = await fs.readFile(srcFile, "utf-8");
	let convertedContent = tsBlankSpace(content);

	if (opts.prettier) {
		const options = await prettier.resolveConfig(srcFile);
		const formatted = await prettier.format(convertedContent, {
			parser: "babel",
			...options,
			filepath: path.basename(srcFile)
		});
		convertedContent = formatted;
	}

	if (destFile) {
		await fs.writeFile(destFile, convertedContent, "utf-8");
	}

	return convertedContent;
}

export async function convertFolder(srcFolder, destFolder, opts = {}) {
	const files = await glob("**/*.ts", {
		cwd: srcFolder,
		dot: true
	});

	const res = {};

	for (const file of files) {
		const srcFile = path.join(srcFolder, file);
        let content;
		if (destFolder) {
            const destFile = path.join(destFolder, file.replace(/\.ts$/, ".js"));
			await fs.mkdir(path.dirname(destFile), { recursive: true });
            content = await convertFile(srcFile, destFile, opts);
		} else {
            content = await convertFile(srcFile, null, opts);
        }

		res[file] = content;
	}

	return res;
}
