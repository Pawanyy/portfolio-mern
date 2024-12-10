import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import fsPromise from "fs/promises";
import fs from "fs";
import { asClass, Lifetime } from 'awilix';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ServiceLoader = async (serviceDir, container) => {

    try {
        const folderPath = path.join(path.dirname(__dirname), serviceDir);

        if (!fs.existsSync(folderPath)) {
            return;
        }

        const files = await fsPromise.readdir(folderPath);

        for (const file of files) {

            const fileUrl = pathToFileURL(path.join(folderPath, file));

            const serviceFile = (await import(fileUrl)).default;
            const serviceFileName = file.charAt(0).toLowerCase() + file.slice(1).replace(".js", "");
            container.register({
                [`${serviceFileName}`]: asClass(serviceFile).singleton(),
            })
        }

    } catch (error) {
        console.error(`Error in ServiceLoader: ${serviceDir} `, error);
    }
}

export { ServiceLoader };