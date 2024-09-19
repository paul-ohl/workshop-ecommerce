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
}
