import { useState, useEffect } from "react";
import { Saturation, Hue, Alpha, useColor } from "react-color-palette";
import "react-color-palette/css";

interface AccordionItemProps {
  id: string;
  title: string;
  value?: number;
  isDefault: boolean;
  getcolor: string;
  path?: string;
  onRemove: () => void;
  onChange: (id: string, field: string, value: any) => void;
}

const EditAccordionItem: React.FC<AccordionItemProps> = ({
  id,
  title,
  value = 0,
  isDefault = false,
  getcolor,
  onRemove,
  onChange,
}) => {
  const [localTitle, setLocalTitle] = useState(title);
  const [localValue, setLocalValue] = useState(value);
  const [localIsDefault, setLocalIsDefault] = useState(isDefault);
  const [color, setColor] = useColor(getcolor || "#ffffff00"); // Default color
  const [useColorPicker, setUseColorPicker] = useState(true);

  useEffect(() => {
    setLocalTitle(title);
    setLocalValue(value);
    setLocalIsDefault(isDefault);
    if (!getcolor || getcolor === "#ffffff00") {
      setColor({
        hex: "#ffffff00",
        rgb: { r: 255, g: 255, b: 255, a: 0 },
        hsv: { h: 0, s: 0, v: 100, a: 0 },
      });
      setUseColorPicker(false); // Disable color picker if transparent
    }
  }, [title, value, isDefault, getcolor]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(e.target.value);
    onChange(id, "label", e.target.value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(Number(e.target.value));
    onChange(id, "value", Number(e.target.value));
  };

  const handleIsDefaultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalIsDefault(e.target.checked);
    onChange(id, "isDefault", e.target.checked);
  };

  const handleColorChange = (newColor: any) => {
    setColor(newColor);
    onChange(id, "color", newColor.hex);
  };

  const toggleColorPicker = () => {
    if (!useColorPicker) {
      // When enabling the color picker, set default color to #ffffff
      setColor({
        hex: "#ffffff",
        rgb: { r: 255, g: 255, b: 255, a: 1 },
        hsv: { h: 0, s: 0, v: 100, a: 1 },
      });
      onChange(id, "color", "#ffffff");
    } else {
      // If disabling the color picker, set color to transparent
      setColor({
        hex: "#ffffff00",
        rgb: { r: 255, g: 255, b: 255, a: 0 },
        hsv: { h: 0, s: 0, v: 100, a: 0 },
      });
      onChange(id, "color", "#ffffff00");
    }
    setUseColorPicker(!useColorPicker);
  };

  return (
    <div className="collapse collapse-arrow join-item border-base-300 border w-full">
      <input type="checkbox" name={`accordion-${id}`} />
      <div className="collapse-title bg-white text-xl font-medium">{localTitle}</div>
      <div className="collapse-content w-full border-t border-gray-300">
        <button className="text-red-500 hover:text-red-700 mt-2" onClick={onRemove}>
          Supprimer
        </button>

        <div className="mb-4 mt-4">
          <label className="block text-sm font-medium text-gray-700">Titre</label>
          <input
            type="text"
            name="title"
            value={localTitle}
            onChange={handleTitleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Prix</label>
          <input
            type="number"
            name="value"
            value={localValue}
            onChange={handleValueChange}
            className="mt-1 block rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Valeur par défaut</label>
          <input
            type="checkbox"
            name="isDefault"
            checked={localIsDefault}
            onChange={handleIsDefaultChange}
            className="checkbox"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Utiliser une couleur</label>
          <button
            type="button"
            className={`btn ${useColorPicker ? "btn-primary" : "btn-outline"}`}
            onClick={toggleColorPicker}
          >
            {useColorPicker ? "Désactiver la couleur" : "Activer la couleur"}
          </button>
        </div>

        {useColorPicker && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Couleur</label>
            <div className="bg-slate-200 rounded-xl">
              <Saturation height={50} color={color} onChange={handleColorChange} />
              <div className="p-3 space-y-3">
                <Hue color={color} onChange={handleColorChange} />
                <Alpha color={color} onChange={handleColorChange} />
                <input
                  value={color.hex}
                  onChange={(e) => handleColorChange({ ...color, hex: e.target.value })}
                  type="text"
                  className="text-center mt-1 block rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditAccordionItem;
