import { getModelForClass, prop } from "@typegoose/typegoose";

export interface PutConfigElement {
	title: string;
	description: string;
	refs: PutRefType[];
	isMultiSelection: boolean;
	isBase: boolean;
}

export interface PutRefType {
	label: string;
	color: string;
	images: { side: string, file: MyImageData }[];
	value: number;
	isDefault: boolean;
}

export interface MyImageData {
	extension: string;
	content: ArrayBuffer;
}
