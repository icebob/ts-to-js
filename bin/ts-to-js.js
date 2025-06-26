import mri from "mri";
import { promises as fs } from "fs";
import { convertFile, convertFolder } from "../src/index.js";

const args = mri(process.argv.slice(2), {
	boolean: ["prettier"],
	alias: {
		p: "prettier"
	}
});

// console.log("Args:", args);

if (args._.length < 1) {
	console.error("Usage: ts-to-js <srcFile> [destFile]");
	process.exit(1);
}

const srcFile = args._[0];
const destFile = args._[1];

const opts = {
	prettier: args.prettier || false
};

const stat = await fs.stat(srcFile).catch(() => null);
if (stat.isDirectory()) {
	const res = await convertFolder(srcFile, destFile, opts);
    if (!destFile) {
        console.log("Converted files:");
        for (const file in res) {
            console.log(`-----------[ ${file} ]-----------`);
            console.log(res[file]);
            console.log("---------------------------------");
        }
    } else {
        console.log("Converted files:", Object.keys(res));
    }
} else {
	if (destFile) {
		await convertFile(srcFile, destFile, opts);
	} else {
		const content = await convertFile(srcFile, null, opts);
		console.log(content);
	}
}

process.exit(0);
