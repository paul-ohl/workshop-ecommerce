import { prop } from "@typegoose/typegoose";

export class RefType {
	@prop()
	label!: string;

	@prop()
	pathToImg?: string;

	@prop()
	value!: number;

	@prop()
	isDefault!: boolean;
}

export class ConfigType {
	@prop()
	title!: string;

	@prop()
	description!: string;

	@prop({ type: RefType })
	ref!: RefType[];

	@prop()
	isMultiSelection!: boolean;
}

export class GbaSPConfig {
	@prop({ type: ConfigType })
	colorsConfigs!: ConfigType[];

	@prop({ type: ConfigType })
	techConfigs!: ConfigType[];
}
