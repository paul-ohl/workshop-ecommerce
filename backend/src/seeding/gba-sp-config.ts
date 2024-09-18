import { ReturnModelType } from "@typegoose/typegoose";
import { GbaSPConfig } from "../models/gba-sp-config.model";
import { BeAnObject } from "@typegoose/typegoose/lib/types";

function seedGbaModel(gbaModel: ReturnModelType<typeof GbaSPConfig, BeAnObject>) {
	gbaModel.create({
		colorsConfigs: [{
			title: "Coque",
			description: "Comprend avant et arrière",
			ref: [{
				label: "Clear black",
				pathToImg: "./img/0.jpg",
				views: [{
					viewName: "front",
					path: "./",
				}, {
					viewName: "back",
					path: "./",
				}, {
					viewName: "side",
					path: "./",
				}],
				value: 0,
				isDefault: true,
			}],
			isMultiSelection: false,
		}]
	})
}
