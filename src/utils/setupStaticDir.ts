import path from "path";
import fs from "fs";

export const setupStaticDir = () => {
	const staticDirPath = path.resolve(__dirname, "../static");
	if (!fs.existsSync(staticDirPath)) {
		fs.mkdirSync(staticDirPath)
	}
}