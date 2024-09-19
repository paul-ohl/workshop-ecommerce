import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { PhotoIcon, TrashIcon } from "@heroicons/react/24/solid";

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Saturation, Hue, useColor, Alpha } from "react-color-palette";
import "react-color-palette/css";

const TechConfig = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [color, setColor] = useColor("#ffffff");

  const [imageFront, setImageFront] = useState<string | null>(null); // Stocker l'image
  const [imageBack, setImageBack] = useState<string | null>(null); // Stocker l'image
  const [imageSide, setImageSide] = useState<string | null>(null); // Stocker l'image

  const [accordionItems, setAccordionItems] = useState([{ id: Date.now() }]);

  // Fonction pour ajouter un nouvel élément dans l'accordéon
  const addAccordionItem = () => {
    setAccordionItems([...accordionItems, { id: Date.now() }]);
  };

  // Fonction pour supprimer un élément de l'accordéon
  const removeAccordionItem = (id: number) => {
    setAccordionItems(accordionItems.filter((item) => item.id !== id));
  };


  // Gérer le téléchargement de l'image
  const handleImageUploadFront = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFront(reader.result as string); // Convertir en base64
      };
      reader.readAsDataURL(file);
    }
  };

  // Supprimer l'image
  const handleRemoveImageFront = () => {
    setImageFront(null); // Réinitialiser l'image
  };

  // Gérer le téléchargement de l'image
  const handleImageUploadBack = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBack(reader.result as string); // Convertir en base64
      };
      reader.readAsDataURL(file);
    }
  };

  // Supprimer l'image
  const handleRemoveImageBack = () => {
    setImageBack(null); // Réinitialiser l'image
  };

  // Gérer le téléchargement de l'image
  const handleImageUploadSide = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSide(reader.result as string); // Convertir en base64
      };
      reader.readAsDataURL(file);
    }
  };

  // Supprimer l'image
  const handleRemoveImageSide = () => {
    setImageSide(null); // Réinitialiser l'image
  };

  return (
    <>
      <div
        role="tabpanel"
        className="tab-content bg-base-100 border-base-300 rounded-box p-6"
      >
        <div className="flex items-center gap-4 mb-5">
          <label className="input input-bordered flex items-center gap-2 rounded-badge w-50 input-sm">
            <input
              type="text"
              className="grow bg-white rounded-md"
              placeholder="Search"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <button className="btn btn-active btn-sm btn-primary"
          onClick={() => setAddOpen(true)}>Ajouter</button>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Titre</th>
                <th>Description</th>
                <th>Contenu</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <td>
                  <div className="font-bold">Base console</div>
                </td>
                <td>Zemlak, Daniel and Leannon...</td>
                <td>
                  <span className="badge badge-ghost badge-sm mr-2 p-2.5">
                    Desktop Support Technician
                  </span>
                  <span className="badge badge-ghost badge-sm mr-2 p-2.5">
                    Desktop Support Technician
                  </span>
                  <span className="badge badge-ghost badge-sm mr-2 p-2.5">
                    ...
                  </span>
                </td>
                <th>
                  <button
                    className="btn btn-warning btn-xs mr-2"
                    onClick={() => setEditOpen(true)}
                  >
                    Modifier
                  </button>

                  <button
                    className="btn btn-outline btn-error btn-xs "
                    onClick={() => setOpen(true)}
                  >
                    Supprimer
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


{/* Edit */}
      <Dialog open={editOpen} onClose={setEditOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 w-full">
                <div className="sm:flex sm:items-start w-full">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Modifier 'name'
                    </DialogTitle>
                    <div className="mt-2 w-full">
                      <form className="w-full">
                        <div className="mb-4 w-full">
                          <label className="block text-sm font-medium text-gray-700">
                            Titre
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div className="mb-4 w-full">
                          <label className="block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <textarea className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
                        </div>
                        <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                        onClick={addAccordionItem}
                      >
                        Ajouter un élément
                      </button>

                        <div className="join join-vertical w-full mt-3">
                          {/* Collaps 1*/}
                          {accordionItems.map((item, index) => (
                            <div  key={item.id} className="collapse collapse-arrow join-item border-base-300 border w-full">




                            <input type="checkbox" name={`accordion-${item.id}`} />
                            <div className="collapse-title bg-white text-xl font-medium w-full">

                            Name {index + 1}

                          </div>
                            <div className="collapse-content w-full border-t border-gray-300">


                                <button
                              type="button"
                              className="text-red-500 mt- hover:text-red-700 float-right"
                              onClick={() => removeAccordionItem(item.id)}
                            >


                              <TrashIcon className="h-5 w-5" />
                            </button>



                              <div className="mb-2 mt-10 w-full">

                                <label className="block text-sm font-medium text-gray-700">
                                  Titre
                                </label>

                                <input
                                  type="text"
                                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>
                              <div className="mb-2 ">
                                <label className="block text-sm font-medium text-gray-700">
                                  Prix
                                </label>

                                <input
                                  type="number"
                                  className="mt-1 block rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>
                              <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Valeur par défaut
                                </label>

                                <input
                                  type="checkbox"
                                  defaultChecked
                                  className="checkbox"
                                />
                              </div>
                              <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Couleur
                                </label>
                                <div className=" bg-slate-200 rounded-xl ">
                                  <Saturation
                                    height={50}
                                    color={color}
                                    onChange={setColor}
                                  />
                                  <div className="p-3 space-y-3">
                                    <Hue color={color} onChange={setColor} />
                                    <Alpha color={color} onChange={setColor} />
                                    <input
                                      value={color.hex}
                                      onChange={(e) =>
                                        setColor({
                                          ...color,
                                          hex: e.target.value || "#ffffff",
                                        })
                                      }
                                      type="text"
                                      className="text-center mt-1 block rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Images
                                </label>
                                <div className="grid grid-cols-3 gap-4">
                                  {/* Front */}
                                  <div className="text-center">
                                    <div className="relative mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25">
                                      {!imageFront ? (
                                        <label
                                          htmlFor="file-upload-front"
                                          className="relative cursor-pointer w-full rounded-lg bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:ring-2 hover:ring-indigo-600 hover:ring-offset-2"
                                        >
                                          <div className="text-center mx-3 my-5 rounded-lg">
                                            <PhotoIcon
                                              aria-hidden="true"
                                              className="mx-auto h-12 w-12 text-gray-300"
                                            />
                                            <input
                                              id="file-upload-front"
                                              name="file-upload-front"
                                              type="file"
                                              className="sr-only "
                                              onChange={handleImageUploadFront}
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
                                            src={imageFront}
                                            alt="Uploaded"
                                            className="object-contain h-full w-full rounded-lg"
                                          />
                                          <div
                                            className="absolute inset-0 flex items-center opacity-0 hover:opacity-100 justify-center rounded-lg cursor-pointer  bg-red-400 bg-opacity-0 hover:bg-opacity-75 transition-opacity"
                                            onClick={handleRemoveImageFront}
                                          >
                                            <TrashIcon className="h-12 w-12 text-white" />
                                          </div>
                                        </div>
                                      )}
                                    </div>

                                    <label
                                      htmlFor="cover-photo-front"
                                      className="block text-sm m-1 font-medium leading-6 text-gray-900"
                                    >
                                      Devant
                                    </label>
                                  </div>

                                  {/* Side */}
                                  <div className="text-center">
                                    <div className="relative mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25">
                                      {!imageBack ? (
                                        <label
                                          htmlFor="file-upload-back"
                                          className="relative cursor-pointer w-full rounded-lg bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:ring-2 hover:ring-indigo-600 hover:ring-offset-2"
                                        >
                                          <div className="text-center mx-3 my-5 rounded-lg">
                                            <PhotoIcon
                                              aria-hidden="true"
                                              className="mx-auto h-12 w-12 text-gray-300"
                                            />
                                            <input
                                              id="file-upload-back"
                                              name="file-upload-back"
                                              type="file"
                                              className="sr-only "
                                              onChange={handleImageUploadBack}
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
                                            src={imageBack}
                                            alt="Uploaded"
                                            className="object-contain h-full w-full rounded-lg"
                                          />
                                          <div
                                            className="absolute inset-0 flex items-center opacity-0 hover:opacity-100 justify-center rounded-lg cursor-pointer  bg-red-400 bg-opacity-0 hover:bg-opacity-75 transition-opacity"
                                            onClick={handleRemoveImageBack}
                                          >
                                            <TrashIcon className="h-12 w-12 text-white" />
                                          </div>
                                        </div>
                                      )}
                                    </div>

                                    <label
                                      htmlFor="cover-photo-back"
                                      className="block text-sm m-1 font-medium leading-6 text-gray-900"
                                    >
                                      Arrière
                                    </label>
                                  </div>

                                  {/* Back */}
                                  <div className="text-center">
                                    <div className="relative mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25">
                                      {!imageSide ? (
                                        <label
                                          htmlFor="file-upload-side"
                                          className="relative cursor-pointer w-full rounded-lg bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:ring-2 hover:ring-indigo-600 hover:ring-offset-2"
                                        >
                                          <div className="text-center mx-3 my-5 rounded-lg">
                                            <PhotoIcon
                                              aria-hidden="true"
                                              className="mx-auto h-12 w-12 text-gray-300"
                                            />
                                            <input
                                              id="file-upload-side"
                                              name="file-upload-side"
                                              type="file"
                                              className="sr-only "
                                              onChange={handleImageUploadSide}
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
                                            src={imageSide}
                                            alt="Uploaded"
                                            className="object-contain h-full w-full rounded-lg"
                                          />
                                          <div
                                            className="absolute inset-0 flex items-center opacity-0 hover:opacity-100 justify-center rounded-lg cursor-pointer  bg-red-400 bg-opacity-0 hover:bg-opacity-75 transition-opacity"
                                            onClick={handleRemoveImageSide}
                                          >
                                            <TrashIcon className="h-12 w-12 text-white" />
                                          </div>
                                        </div>
                                      )}
                                    </div>

                                    <label
                                      htmlFor="cover-photo-side"
                                      className="block text-sm m-1 font-medium leading-6 text-gray-900"
                                    >
                                      Coté
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          ))}

                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 w-full">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                >
                  Modifier
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setEditOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Annuler
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>




{/* Add */}
      <Dialog open={addOpen} onClose={setAddOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 w-full">
                <div className="sm:flex sm:items-start w-full">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Ajouter
                    </DialogTitle>
                    <div className="mt-2 w-full">
                      <form className="w-full">
                        <div className="mb-4 w-full">
                          <label className="block text-sm font-medium text-gray-700">
                            Titre
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div className="mb-4 w-full">
                          <label className="block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <textarea className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
                        </div>

                        <div className="join join-vertical w-full mt-3">
                          {/* Collaps 1*/}
                          <div className="collapse collapse-arrow join-item border-base-300 border w-full">
                            <input type="checkbox" name="my-accordion-4" />
                            <div className="collapse-title bg-white text-xl font-medium w-full ">
                              Name
                            </div>
                            <div className="collapse-content w-full border-t border-gray-300">
                              <div className="mb-2 mt-3 w-full">
                                <label className="block text-sm font-medium text-gray-700">
                                  Titre
                                </label>

                                <input
                                  type="text"
                                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>
                              <div className="mb-2 ">
                                <label className="block text-sm font-medium text-gray-700">
                                  Prix
                                </label>

                                <input
                                  type="number"
                                  className="mt-1 block rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>
                              <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Valeur par défaut
                                </label>

                                <input
                                  type="checkbox"
                                  defaultChecked
                                  className="checkbox"
                                />
                              </div>
                              <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Couleur
                                </label>
                                <div className=" bg-slate-200 rounded-xl ">
                                  <Saturation
                                    height={50}
                                    color={color}
                                    onChange={setColor}
                                  />
                                  <div className="p-3 space-y-3">
                                    <Hue color={color} onChange={setColor} />
                                    <Alpha color={color} onChange={setColor} />
                                    <input
                                      value={color.hex}
                                      onChange={(e) =>
                                        setColor({
                                          ...color,
                                          hex: e.target.value || "#ffffff",
                                        })
                                      }
                                      type="text"
                                      className="text-center mt-1 block rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Images
                                </label>
                                <div className="grid grid-cols-3 gap-4">
                                  {/* Front */}
                                  <div className="text-center">
                                    <div className="relative mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25">
                                      {!imageFront ? (
                                        <label
                                          htmlFor="file-upload-front"
                                          className="relative cursor-pointer w-full rounded-lg bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:ring-2 hover:ring-indigo-600 hover:ring-offset-2"
                                        >
                                          <div className="text-center mx-3 my-5 rounded-lg">
                                            <PhotoIcon
                                              aria-hidden="true"
                                              className="mx-auto h-12 w-12 text-gray-300"
                                            />
                                            <input
                                              id="file-upload-front"
                                              name="file-upload-front"
                                              type="file"
                                              className="sr-only "
                                              onChange={handleImageUploadFront}
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
                                            src={imageFront}
                                            alt="Uploaded"
                                            className="object-contain h-full w-full rounded-lg"
                                          />
                                          <div
                                            className="absolute inset-0 flex items-center opacity-0 hover:opacity-100 justify-center rounded-lg cursor-pointer  bg-red-400 bg-opacity-0 hover:bg-opacity-75 transition-opacity"
                                            onClick={handleRemoveImageFront}
                                          >
                                            <TrashIcon className="h-12 w-12 text-white" />
                                          </div>
                                        </div>
                                      )}
                                    </div>

                                    <label
                                      htmlFor="cover-photo-front"
                                      className="block text-sm m-1 font-medium leading-6 text-gray-900"
                                    >
                                      Devant
                                    </label>
                                  </div>

                                  {/* Side */}
                                  <div className="text-center">
                                    <div className="relative mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25">
                                      {!imageBack ? (
                                        <label
                                          htmlFor="file-upload-back"
                                          className="relative cursor-pointer w-full rounded-lg bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:ring-2 hover:ring-indigo-600 hover:ring-offset-2"
                                        >
                                          <div className="text-center mx-3 my-5 rounded-lg">
                                            <PhotoIcon
                                              aria-hidden="true"
                                              className="mx-auto h-12 w-12 text-gray-300"
                                            />
                                            <input
                                              id="file-upload-back"
                                              name="file-upload-back"
                                              type="file"
                                              className="sr-only "
                                              onChange={handleImageUploadBack}
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
                                            src={imageBack}
                                            alt="Uploaded"
                                            className="object-contain h-full w-full rounded-lg"
                                          />
                                          <div
                                            className="absolute inset-0 flex items-center opacity-0 hover:opacity-100 justify-center rounded-lg cursor-pointer  bg-red-400 bg-opacity-0 hover:bg-opacity-75 transition-opacity"
                                            onClick={handleRemoveImageBack}
                                          >
                                            <TrashIcon className="h-12 w-12 text-white" />
                                          </div>
                                        </div>
                                      )}
                                    </div>

                                    <label
                                      htmlFor="cover-photo-back"
                                      className="block text-sm m-1 font-medium leading-6 text-gray-900"
                                    >
                                      Arrière
                                    </label>
                                  </div>

                                  {/* Back */}
                                  <div className="text-center">
                                    <div className="relative mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25">
                                      {!imageSide ? (
                                        <label
                                          htmlFor="file-upload-side"
                                          className="relative cursor-pointer w-full rounded-lg bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:ring-2 hover:ring-indigo-600 hover:ring-offset-2"
                                        >
                                          <div className="text-center mx-3 my-5 rounded-lg">
                                            <PhotoIcon
                                              aria-hidden="true"
                                              className="mx-auto h-12 w-12 text-gray-300"
                                            />
                                            <input
                                              id="file-upload-side"
                                              name="file-upload-side"
                                              type="file"
                                              className="sr-only "
                                              onChange={handleImageUploadSide}
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
                                            src={imageSide}
                                            alt="Uploaded"
                                            className="object-contain h-full w-full rounded-lg"
                                          />
                                          <div
                                            className="absolute inset-0 flex items-center opacity-0 hover:opacity-100 justify-center rounded-lg cursor-pointer  bg-red-400 bg-opacity-0 hover:bg-opacity-75 transition-opacity"
                                            onClick={handleRemoveImageSide}
                                          >
                                            <TrashIcon className="h-12 w-12 text-white" />
                                          </div>
                                        </div>
                                      )}
                                    </div>

                                    <label
                                      htmlFor="cover-photo-side"
                                      className="block text-sm m-1 font-medium leading-6 text-gray-900"
                                    >
                                      Coté
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 w-full">
                <button
                  type="button"
                  onClick={() => setAddOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                >
                  Ajouter
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setAddOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Annuler
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>




{/* Delete */}
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-red-600"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Supprimer 'name'
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Êtes vous sûr de vouloir supprimer 'name' ? <br />
                        Vous perdrez toutes les références associé
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Supprimer
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Annuler
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default TechConfig;
