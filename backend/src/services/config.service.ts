import ConfigModel from '../models/config.model';
import ConfigElement from '../types/configElement';
import ConfigSection from '../types/configSection';

export class ConfigService {
  public static async getAll() {
    return await ConfigModel.find();
  }

  public static async updateConfigElement(
    id: string,
    updateData: ConfigElement,
  ) {
    // Validate the id
    if (id == undefined || id.trim() == '') {
      throw new Error('Id is required');
    }
    if (!/^[0-9a-fA-F]{24}$/.test(id.trim())) {
      throw new Error('Invalid id');
    }

    // Find the element in the config
    const config = await ConfigModel.findOne();
    if (!config) {
      throw new Error(`Critical error: no config found`);
    }
    const foundInColors = config.colorsConfigs.find(
      c => c._id.toString() === id,
    );
    const foundInTech = config.techConfigs.find(c => c._id.toString() === id);
    const element = foundInColors || foundInTech;

    if (!element) {
      throw new Error(`Config element not found (id: ${id})`);
    }

    Object.assign(element, updateData.toModel());
    await config.save();

    return element;
  }

  public static async createConfigElement(
    configSection: ConfigSection,
    data: ConfigElement,
  ) {
    const config = await ConfigModel.findOne();
    if (!config) {
      throw new Error(`Critical error: no config found`);
    }

    if (configSection.isColors) {
      config.colorsConfigs.push(data.toModel());
    } else if (configSection.isTech) {
      config.techConfigs.push(data.toModel());
    }

    await config.save();
    return config;
  }
}
