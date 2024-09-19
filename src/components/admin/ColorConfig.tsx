import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const ColorConfig = () => {
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

  return (
    <><div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
      >
          <div className="flex items-center gap-4 mb-5">
              <label className="input input-bordered flex items-center gap-2 rounded-badge w-50 input-sm">
                  <input
                      type="text"
                      className="grow bg-white rounded-md"
                      placeholder="Search" />
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                  >
                      <path
                          fillRule="evenodd"
                          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                          clipRule="evenodd" />
                  </svg>
              </label>
              <button className="btn btn-active btn-sm btn-primary">
                  Ajouter
              </button>
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
                              <button className="btn btn-warning btn-xs mr-2"
                               onClick={() => setEditOpen(true)}>
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
      </div><Dialog open={editOpen} onClose={setEditOpen} className="relative z-10">
              <DialogBackdrop
                  transition
                  className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                      <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                              <div className="sm:flex sm:items-start">
                                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                      <DialogTitle
                                          as="h3"
                                          className="text-base font-semibold leading-6 text-gray-900"
                                      >
                                          Modifier 'name'
                                      </DialogTitle>
                                      <div className="mt-2">
                                          <form>
                                              <div className="mb-4">
                                                  <label className="block text-sm font-medium text-gray-700">
                                                      Titre
                                                  </label>
                                                  <input
                                                      type="text"
                                                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                              </div>
                                              <div className="mb-4">
                                                  <label className="block text-sm font-medium text-gray-700">
                                                      Description
                                                  </label>
                                                  <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
                                              </div>
                                          </form>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
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
          </Dialog><Dialog open={open} onClose={setOpen} className="relative z-10">
              <DialogBackdrop
                  transition
                  className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />

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
                                          className="h-6 w-6 text-red-600" />
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
          </Dialog></>
  );
};

export default ColorConfig;
