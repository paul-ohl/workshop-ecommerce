import { useState, useEffect } from "react";

interface AccordionItemProps {
  id: string;
  title: string;
  value?: number;
  isDefault: boolean;
  path?: string;
  onRemove: () => void;
  onChange: (id: string, field: string, value: any) => void;
}

const EditAccordionItem: React.FC<AccordionItemProps> = ({
  id,
  title,
  value = 0,
  isDefault = false,
  onRemove,
  onChange,
}) => {
  const [localTitle, setLocalTitle] = useState(title);
  const [localValue, setLocalValue] = useState(value);
  const [localIsDefault, setLocalIsDefault] = useState(isDefault);

  useEffect(() => {
    setLocalTitle(title);
    setLocalValue(value);
    setLocalIsDefault(isDefault);
  }, [title, value, isDefault]);

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

  

      </div>
    </div>
  );
};

export default EditAccordionItem;
