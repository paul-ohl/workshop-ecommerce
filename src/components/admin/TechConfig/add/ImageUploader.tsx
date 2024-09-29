import { TrashIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface ImageUploaderProps {
  path?: string;
  position: string; // "front", "back", or "side"
  onImageChange: (position: string, image: string | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ path = "", position, onImageChange }) => {
  const [image, setImage] = useState<string | null>(
    path ? `/uploads/${path}/${position}/${path}.png` : null
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const uploadedImage = reader.result as string;
        setImage(uploadedImage);
        onImageChange(position, uploadedImage); // Remonte l'image vers le parent
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    onImageChange(position, null); // Remonte la suppression d'image vers le parent
  };

  return (
    <div className="text-center">
      <div className="relative mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25">
        {!image ? (
          <label className="relative cursor-pointer w-full rounded-lg bg-white font-semibold text-indigo-600">
            <div className="text-center mx-3 my-5 rounded-lg">
              <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
              <input
                type="file"
                className="sr-only"
                onChange={handleImageUpload}
              />
              <span>Upload a file</span>
              <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </label>
        ) : (
          <div className="relative w-full h-36 m-1">
            <img
              src={image}
              alt="Uploaded"
              className="object-contain h-full w-full rounded-lg"
            />
            <div
              className="absolute inset-0 flex items-center opacity-0 hover:opacity-100 justify-center rounded-lg cursor-pointer bg-red-400 bg-opacity-0 hover:bg-opacity-75 transition-opacity"
              onClick={handleRemoveImage}
            >
              <TrashIcon className="h-12 w-12 text-white" />
            </div>
          </div>
        )}
      </div>
      <label className="block text-sm m-1 font-medium leading-6 text-gray-900">
        {position.charAt(0).toUpperCase() + position.slice(1)}
      </label>
    </div>
  );
};

export default ImageUploader;
