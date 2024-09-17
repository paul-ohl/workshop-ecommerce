import { prop } from "@typegoose/typegoose";

export class GbaSPConfig {
	@prop()
	colorsConfigs!: ColorsConfigs;

	@prop()
	techConfigs!: TechConfigs;
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

class TechConfigs {
	@prop()
	consoleBase?: Type;

	@prop()
	batteryUpgrade?: Type;

	@prop()
	usbC?: Type;

	@prop()
	rgbLed?: Type;

	@prop()
	ampAudio?: Type;

	@prop()
	accessories?: Type;
}

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
