import GbaSPConfigModel from "../models/gba-sp-config.model";

export function seedGbaModel() {
	GbaSPConfigModel.create({
		colorsConfigs: [{
			title: "Coque",
			description: "Comprend avant et arrière",
			ref: [{
				label: "Clear black",
				color: "#000000",
				pathToImg: "shell_#000000.jpg",
				value: 0,
				isDefault: true,
			}, {
				label: "Blue",
				color: "#0000FF",
				pathToImg: "shell_#0000FF.jpg",
				value: 0,
				isDefault: false,
			}],
			isMultiSelection: false,
			isBase: true,
		}, {
			title: "Boutons",
			ref: [{
				label: "Black",
				color: "#000000",
				pathToImg: "buttons_#000000.jpg",
				value: 0,
				isDefault: true,
			}, {
				label: "Blue",
				color: "#0000FF",
				pathToImg: "buttons_#0000FF.jpg",
				value: 0,
				isDefault: false,
			}],
			isMultiSelection: false,
			isBase: false,
		}],
		techConfigs: [{
			title: "Accessoires",
			ref: [{
				label: "Sacoche Metroid (+12,90$)",
				value: 12.90,
				isDefault: true,
			}, {
				label: "Verre Trempé (+4,90$)",
				value: 4.90,
				isDefault: true,
			}, {
				label: "Coque Silicone (+6,90$)",
				value: 6.90,
				isDefault: false,
			}],
			isMultiSelection: true
		}],
	})
}
