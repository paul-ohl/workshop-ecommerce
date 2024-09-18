import ConfigModel from "../models/config.model";

export class ConfigService {
	public async getAll() {
		return await ConfigModel.findOne();
	}
}
