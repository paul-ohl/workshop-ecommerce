import { TrashIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface AccordionItemProps {
  id: number;
  title: string;
  onRemove: () => void;
}

const EditAccordionItem: React.FC<AccordionItemProps> = ({
  id,
  title,
  value = 0,
  isDefault = false,
  onRemove,
}) => {
  const [images, setImages] = useState({
    front: null as string | null,
    back: null as string | null,
    side: null as string | null,
  });

  const handleImageUpload = (
    position: keyof typeof images,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => ({
          ...prevImages,
          [position]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (position: keyof typeof images) => {
    setImages((prevImages) => ({
      ...prevImages,
      [position]: null,
    }));
  };

  return (
    <div  className="collapse collapse-arrow join-item border-base-300 border w-full">
      <input type="checkbox" name={`accordion-${id}`} />
      <div className="collapse-title bg-white text-xl font-medium">{`Name ${title}`}</div>
      <div className="collapse-content w-full border-t border-gray-300">
        <button
          className="text-red-500 hover:text-red-700 float-right"
          onClick={onRemove}
        >
          <TrashIcon className="h-5 w-5" />
        </button>

        <div className="mb-4 mt-4">
          <label className="block text-sm font-medium text-gray-700">Titre</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Prix</label>
          <input
            type="number"
            className="mt-1 block rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Valeur par défaut</label>
          <input type="checkbox" defaultChecked className="checkbox" />
        </div>

  

      </div>
    </div>
  );
};

export default EditAccordionItem;
