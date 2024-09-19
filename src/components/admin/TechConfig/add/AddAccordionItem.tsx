import { TrashIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface AccordionItemProps {
  id: number;
  title: string;
  onRemove: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  title,
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

        
        <div className="">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Images
          </label>
          <div className="grid grid-cols-3 gap-4">
            {/* Front */}
            <div className="text-center">
              <div className="relative mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25">
                {!images.front ? (
                  <label className="relative cursor-pointer w-full rounded-lg bg-white font-semibold text-indigo-600">
                    <div className="text-center mx-3 my-5 rounded-lg">
                      <PhotoIcon
                        aria-hidden="true"
                        className="mx-auto h-12 w-12 text-gray-300"
                      />
                      <input
                        type="file"
                        className="sr-only"
                        onChange={(e) => handleImageUpload("front", e)}
                      />
                      <span>Upload a file</span>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </label>
                ) : (
                  <div className="relative w-full h-36 m-1">
                    <img
                      src={images.front}
                      alt="Uploaded"
                      className="object-contain h-full w-full rounded-lg"
                    />
                    <div
                      className="absolute inset-0 flex items-center opacity-0 hover:opacity-100 justify-center rounded-lg cursor-pointer bg-red-400 bg-opacity-0 hover:bg-opacity-75 transition-opacity"
                      onClick={() => handleRemoveImage("front")}
                    >
                      <TrashIcon className="h-12 w-12 text-white" />
                    </div>
                  </div>
                )}
              </div>
              <label className="block text-sm m-1 font-medium leading-6 text-gray-900">
                Devant
              </label>
            </div>

            {/* Back */}
            <div className="text-center">
              <div className="relative mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25">
                {!images.back ? (
                  <label className="relative cursor-pointer w-full rounded-lg bg-white font-semibold text-indigo-600">
                    <div className="text-center mx-3 my-5 rounded-lg">
                      <PhotoIcon
                        aria-hidden="true"
                        className="mx-auto h-12 w-12 text-gray-300"
                      />
                      <input
                        type="file"
                        className="sr-only"
                        onChange={(e) => handleImageUpload("back", e)}
                      />
                      <span>Upload a file</span>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </label>
                ) : (
                  <div className="relative w-full h-36 m-1">
                    <img
                      src={images.back}
                      alt="Uploaded"
                      className="object-contain h-full w-full rounded-lg"
                    />
                    <div
                      className="absolute inset-0 flex items-center opacity-0 hover:opacity-100 justify-center rounded-lg cursor-pointer bg-red-400 bg-opacity-0 hover:bg-opacity-75 transition-opacity"
                      onClick={() => handleRemoveImage("back")}
                    >
                      <TrashIcon className="h-12 w-12 text-white" />
                    </div>
                  </div>
                )}
              </div>
              <label className="block text-sm m-1 font-medium leading-6 text-gray-900">
                Derrière
              </label>
            </div>

            {/* Side */}
            <div className="text-center">
              <div className="relative mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25">
                {!images.side ? (
                  <label className="relative cursor-pointer w-full rounded-lg bg-white font-semibold text-indigo-600">
                    <div className="text-center mx-3 my-5 rounded-lg">
                      <PhotoIcon
                        aria-hidden="true"
                        className="mx-auto h-12 w-12 text-gray-300"
                      />
                      <input
                        type="file"
                        className="sr-only"
                        onChange={(e) => handleImageUpload("side", e)}
                      />
                      <span>Upload a file</span>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </label>
                ) : (
                  <div className="relative w-full h-36 m-1">
                    <img
                      src={images.side}
                      alt="Uploaded"
                      className="object-contain h-full w-full rounded-lg"
                    />
                    <div
                      className="absolute inset-0 flex items-center opacity-0 hover:opacity-100 justify-center rounded-lg cursor-pointer bg-red-400 bg-opacity-0 hover:bg-opacity-75 transition-opacity"
                      onClick={() => handleRemoveImage("side")}
                    >
                      <TrashIcon className="h-12 w-12 text-white" />
                    </div>
                  </div>
                )}
              </div>
              <label className="block text-sm m-1 font-medium leading-6 text-gray-900">
                Coté
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
