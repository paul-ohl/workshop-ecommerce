import { Types } from "mongoose";
import ConfigModel, { ConfigElement } from "../models/config.model";
import { MyImageData, PutConfigElement, PutRefType } from "../models/put-config.model";
import fs from 'fs';

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

	public async createConfigElement(configSection: string, data: PutConfigElement) {
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
		if (data.isMultiSelection == undefined) {
			throw new Error("IsMultiSelection is required");
		}

		const refs = uploadImages(data.refs);

		const newConfigElement: ConfigElement = {
			_id: new Types.ObjectId(),
			title: data.title,
			description: data.description,
			refs,
			isMultiSelection: data.isMultiSelection,
			isBase: data.isBase,
		};

		if (configSection === 'colors') {
			config.colorsConfigs.push(newConfigElement);
		} else if (configSection === 'tech') {
			config.techConfigs.push(newConfigElement);
		} else {
			throw new Error("Invalid config section");
		}

		await config.save();
		return config;
	}
}

function uploadImages(refs: PutRefType[]) {
	return refs.map(ref => {
		const randomNumbers = Math.random().toString(36).substring(2, 8);
		let lastExtension = "";
		ref.images.map(image => {
			const { side, file } = image;
			if (file.content == undefined) {
				throw new Error("Image content is required");
			}
			if (file.extension == undefined) {
				throw new Error("Image extension is required");
			}
			if (lastExtension != "" && lastExtension != file.extension) {
				throw new Error("All images of a same ref must have the same extension");
			} else {
				lastExtension = file.extension;
			}

			const uploadPath = __dirname + '/../src/assets/' + side + '/' + randomNumbers + '.' + file.extension;

			// if file already exists, delete it
			if (fs.existsSync(uploadPath)) {
				fs.rmSync(uploadPath);
			}
			const buffer = Buffer.from(file.content);
			fs.writeFileSync(uploadPath, buffer);
		});
		return randomNumbers + '.' + lastExtension;
	});
}
