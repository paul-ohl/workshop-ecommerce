import { Types } from "mongoose";
import ConfigModel, { ConfigElement } from "../models/config.model";

export class ConfigService {
	public async getAll() {
		return await ConfigModel.find();
	}

	public async updateConfigElement(id: string, updateData: ConfigElement) {
		// Validate the id
		if (id == undefined || id.trim() == "") {
			throw new Error("Id is required");
		}
		const skillIdRegex = /^[0-9a-fA-F]{24}$/;
		if (!skillIdRegex.test(id.trim())) {
			throw new Error("Invalid id");
		}

		// Find the element in the config
		const config = await ConfigModel.findOne();
		if (!config) {
			throw new Error(`Critical error: no config found`);
		}
		const foundInColors = config.colorsConfigs.find(c => c._id.toString() === id);
		const foundInTech = config.techConfigs.find(c => c._id.toString() === id);
		const element = foundInColors || foundInTech;

		if (!element) {
			throw new Error(`Config element not found (id: ${id})`);
		}

		let { title, refs } = updateData;
		if (title != undefined && title.trim() === "") {
			throw new Error("Title is required");
		}
		if (refs != undefined && refs.length === 0) {
			throw new Error("Refs is required");
		}

		Object.assign(element, updateData);
		await config.save();

		return element;
	}

	public async createConfigElement(configSection: string, data: ConfigElement) {
		const config = await ConfigModel.findOne();
		if (!config) {
			throw new Error(`Critical error: no config found`);
		}

		if (data.title == undefined || data.title.trim() === "") {
			throw new Error("Title is required");
		}
		if (data.refs == undefined || data.refs.length === 0) {
			throw new Error("Refs is required");
		}
		if (data._id != undefined) {
			throw new Error("Id should not be provided");
		}
		if (data.isMultiSelection == undefined) {
			throw new Error("IsMultiSelection is required");
		}

		const newConfigElement = {
			...data,
		};

		if (configSection === 'colors') {
			config.colorsConfigs.push(newConfigElement);
		} else if (configSection === 'tech') {
			config.techConfigs.push(newConfigElement);
		} else {
			throw new Error("Invalid config section");
		}

		if (images) {
			const processedImages = req.files.map((file, index) => {
				if (file) {
					// Vérifiez le type de fichier (extension)
					if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
						throw new Error(`Le fichier ${file.originalname} doit être de type JPG ou PNG.`);
					}

					// Générez une suite de nombres aléatoires
					const randomNumbers = Math.random().toString(36).substring(2, 8);
					// Obtenez l'extension du fichier
					const fileExtension = file.originalname.replace(/\s+/g, '_');
					// Concaténez la suite de nombres avec le nom d'origine du fichier
					file.originalname = `${randomNumbers}-${fileExtension}`;

					// Enregistrez le fichier dans votre système de fichiers (dans le dossier 'uploads')
					const uploadPath = __dirname + '/../uploads/' + file.originalname; // Chemin du fichier dans votre système de fichiers
					// Écrivez le fichier sur le disque
					fs.writeFileSync(uploadPath, file.buffer);

					// Retournez le chemin d'accès au fichier téléchargé
					return `/uploads/${file.originalname}`;
				} else {
					// Si le fichier n'existe pas, retournez undefined
					return undefined;
				}
			});
		}

		await config.save();
		return config;
	}
}
