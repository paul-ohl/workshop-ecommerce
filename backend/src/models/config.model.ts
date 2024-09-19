import { getModelForClass, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

class RefType {
	@prop()
	label!: string;

	@prop({
		validate: {
			validator: (v) => {
				return /^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/gm.test(v);
			}
		}
	})
	color?: string;

	@prop()
	path?: string;

	@prop({
		validate: {
			validator: (v) => {
				return v >= 0;
			}
		}
	})
	value!: number;

	@prop()
	isDefault!: boolean;
}

export class ConfigElement {
	@prop({ required: true, type: () => Types.ObjectId })
	public _id!: Types.ObjectId;

	@prop()
	title!: string;

	@prop()
	description?: string;

	@prop({ type: RefType })
	refs!: RefType[];

	@prop()
	isMultiSelection!: boolean;

	@prop()
	isBase?: boolean;
}

export class Config {
	@prop({ type: ConfigElement })
	colorsConfigs!: ConfigElement[];

	@prop({ type: ConfigElement })
	techConfigs!: ConfigElement[];
}

const ConfigModel = getModelForClass(Config);

export default ConfigModel;
