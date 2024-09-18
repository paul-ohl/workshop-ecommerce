import { getModelForClass, prop } from "@typegoose/typegoose";

class RefType {
	@prop()
	label!: string;

	@prop()
	color?: string;

	@prop()
	path?: string;

	@prop()
	value!: number;

	@prop()
	isDefault!: boolean;
}

class ConfigType {
	@prop()
	title!: string;

	@prop()
	description?: string;

	@prop({ type: RefType })
	ref!: RefType[];

	@prop()
	isMultiSelection!: boolean;

	@prop()
	isBase?: boolean;
}

export class Config {
	@prop({ type: ConfigType })
	colorsConfigs!: ConfigType[];

	@prop({ type: ConfigType })
	techConfigs!: ConfigType[];
}

const ConfigModel = getModelForClass(Config);

export default ConfigModel;
