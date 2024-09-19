import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import AccordionItem from "./AddAccordionItem";

interface AddDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddDialog: React.FC<AddDialogProps> = ({ open, onClose }) => {

  const [accordionItems, setAccordionItems] = useState([
    { id: Date.now(), title: "Élément 1" },
  ]);

  const addAccordionItem = () => {
    setAccordionItems([
      ...accordionItems,
      { id: Date.now(), title: `Élément ${accordionItems.length + 1}` },
    ]);
  };

  const removeAccordionItem = (id: number) => {
    setAccordionItems(accordionItems.filter((item) => item.id !== id));
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
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
                    Ajouter un élément
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
                        {/* Collaps 1 */}
                        {accordionItems.map((item) => (
                          <AccordionItem
                            key={`${item.id}${item.title}`}
                            id={item.id}
                            title={item.title}
                            onRemove={() => removeAccordionItem(item.id)}
                          />
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
                onClick={onClose}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
              >
                Modifier
              </button>
              <button
                type="button"
                data-autofocus
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py"
              >
                Annuler
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddDialog;
