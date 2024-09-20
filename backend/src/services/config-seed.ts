import { describe } from "node:test";
import ConfigModel from "../models/config.model";

export async function seedConfig() {
	await ConfigModel.create({
		colorsConfigs: [{
			title: "Coque",
			description: "Comprend avant et arrière",
			refs: [{
				label: "Clear black",
				color: "#000000",
				pathToImg: "shell_000000.jpg",
				value: 0,
				isDefault: true,
			}, {
				label: "Blue",
				color: "#0000FF",
				pathToImg: "shell_0000FF.jpg",
				value: 0,
				isDefault: false,
			}],
			isMultiSelection: false,
			isBase: true,
		}, {
			title: "Boutons",
			refs: [{
				label: "Black",
				color: "#000000",
				pathToImg: "buttons_000000.jpg",
				value: 0,
				isDefault: true,
			}, {
				label: "Blue",
				color: "#0000FF",
				pathToImg: "buttons_0000FF.jpg",
				value: 0,
				isDefault: false,
			}],
			isMultiSelection: false,
			isBase: false,
		}, {
			title: "Coque Double Couleurs",
			description: "Uniquement si la coque basse est différente de la haute",
			refs: [{
				label: "Lear Black",
				color: "#000000",
				pathToImg: "double_shell_000000.png",
				value: 11.90,
				isDefault: false,
			}, {
				label: "Clear Blue",
				color: "#0000FF",
				pathToImg: "double_shell_0000FF.png",
				value: 11.90,
				isDefault: false,
			}, {
				label: "Jaune",
				color: "#FFFF00",
				pathToImg: "double_shell_FFFF00.png",
				value: 11.90,
				isDefault: false,
			}, {
				label: "Sans",
				value: 0,
				isDefault: true,
			}],
			isMultiSelection: false,
			isBase: false,
		}],
		techConfigs: [{
			title: "Accessoires",
			refs: [{
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
