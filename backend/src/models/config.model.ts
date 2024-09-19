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

	@prop({ default: false })
	isDefault?: boolean;
}

export class ConfigElement {
	@prop({ type: () => Types.ObjectId, default: () => new Types.ObjectId() })
	public _id!: Types.ObjectId;

	@prop()
	title!: string;

	@prop({ default: "" })
	description?: string;

	@prop({ type: RefType })
	refs!: RefType[];

	@prop()
	isMultiSelection!: boolean;

	@prop({ default: false })
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
