import { prop } from "@typegoose/typegoose";

class RefType {
	@prop()
	label!: string;

	@prop()
	value!: number;

	@prop()
	isDefault!: boolean;
}

class Type {
	@prop({ type: RefType })
	ref!: RefType[];

	@prop()
	description!: string;

	@prop()
	isMultiSelection!: boolean;
}

export class GbaSPConfig {
	@prop()
	colorsConfigs!: ColorsConfigs;

	@prop({ type: Type })
	techConfigs!: Type[];
}

class ColorsConfigs {
	@prop()
	shell?: Type;

	@prop()
	doubleColorsShell?: Type;

	@prop()
	screenIps?: Type;

	@prop()
	buttons?: Type;

	@prop()
	pads?: Type;

	@prop()
	strap?: Type;

	@prop()
	stickers?: Type;

	@prop()
	customInsert?: Type;
}
