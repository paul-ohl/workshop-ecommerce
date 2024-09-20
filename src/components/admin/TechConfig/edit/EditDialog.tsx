import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import EditAccordionItem from "./EditAccordionItem";
import { useQuery } from "react-query";

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  configId: string | null; // Recevoir configId
}

const EditDialog: React.FC<EditDialogProps> = ({ open, onClose, configId }) => {
  const [accordionItems, setAccordionItems] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [isModified, setIsModified] = useState(false);
  const [techConfig, setTechConfig] = useState<any>(null);
  const [initialTitle, setInitialTitle] = useState("");

  const useGetAllConfigs = () => {
    return useQuery(
      "configsData",
      async () =>
        await fetch("http://localhost:3000/config").then((res) => res.json())
    );
  };

  const { data, error, isLoading } = useGetAllConfigs();

  useEffect(() => {
    if (data && configId) {
      const foundConfig = data?.[0]?.techConfigs?.find(
        (conf: any) => conf._id === configId
      );

      if (foundConfig) {
        setTechConfig(foundConfig);
        setFormData({
          title: foundConfig.title,
          description: foundConfig.description || "",
        });
        setAccordionItems(foundConfig.refs || []);
        setInitialTitle(foundConfig.title);
      } else {
        console.log("Aucune configuration trouvée pour cet ID");
      }
    }
  }, [data, configId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("Error fetching config data:", error);
    return <div>Error loading data</div>;
  }

  const resetForm = () => {
    if (techConfig) {
      setFormData({
        title: techConfig.title,
        description: techConfig.description || "",
      });
      setAccordionItems(techConfig.refs || []);
      setIsModified(false);
    }
  };

  const handleAccordionItemChange = (id: string, field: string, value: any) => {
    setAccordionItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, [field]: value } : item
      )
    );
    setIsModified(true);
  };

  const addAccordionItem = () => {
    setAccordionItems([
      ...accordionItems,
      {
        _id: Date.now().toString(),
        label: `New Item ${accordionItems.length + 1}`,
        value: 0,
        isDefault: false,
      },
    ]);
    setIsModified(true);
  };

  const removeAccordionItem = (id: string) => {
    setAccordionItems(accordionItems.filter((item) => item._id !== id));
    setIsModified(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setIsModified(true);
  };

  // Fonction de soumission du formulaire
  const handleSubmit = async () => {
    const payload = {
      title: formData.title,
      description: formData.description,
      refs: accordionItems.map((item) => ({
        label: item.label,
        value: item.value,
        isDefault: item.isDefault,
      })),
    };
    console.log("Payload envoyé à l'API :", JSON.stringify(payload));

    try {
      const response = await fetch(`http://localhost:3000/config/${configId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const updatedConfig = await response.json();
        console.log("Mise à jour réussie :", updatedConfig);
        onClose();
      } else {
        console.error("Erreur lors de la mise à jour de la configuration");
      }
    } catch (error) {
      console.error("Erreur lors de la requête PATCH", error);
    }
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
                    Modifier {initialTitle}
                    {isModified && (
                      <button
                        type="button"
                        className="absolute top-4 right-4 btn btn-outline btn-sm"
                        onClick={resetForm}
                      >
                        Réinitialiser
                      </button>
                    )}
                  </DialogTitle>
                  <div className="mt-2 w-full">
                    <form className="w-full">
                      <div className="mb-4 w-full">
                        <label className="block text-sm font-medium text-gray-700">
                          Titre
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="mb-4 w-full">
                        <label className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                        onClick={addAccordionItem}
                      >
                        Ajouter un élément
                      </button>

                      <div className="join join-vertical w-full mt-3">
                        {accordionItems.map((item) => (
                          <EditAccordionItem
                            key={item._id}
                            id={item._id}
                            title={item.label}
                            value={item.value}
                            isDefault={item.isDefault}
                            path={item.path}
                            onChange={handleAccordionItemChange}
                            onRemove={() => removeAccordionItem(item._id)}
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
                onClick={handleSubmit}
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

export default EditDialog;
