import { useState, useEffect } from "react";
import EditDialog from "./edit/EditDialog";
import AddDialog from "./add/AddDialog";
import DeleteDialog from "./DeleteDialog";
import { useQuery, useQueryClient } from "react-query";

// Hook pour récupérer les configurations
const useGetAllConfigs = () => {
  return useQuery(
    "configsData",
    async () =>
      await fetch("http://localhost:3000/config").then((res) => res.json())
  );
};

const TechConfig = () => {
  const queryClient = useQueryClient(); // Accéder au QueryClient
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null); // État pour stocker l'ID sélectionné

  // Récupération des données
  const { data, error, isLoading } = useGetAllConfigs();

  useEffect(() => {
    if (data) {
      console.log("Fetched Tech Config Data:", data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("Error fetching config data:", error);
    return <div>Error loading data</div>;
  }

  // Accès aux techConfigs
  const techConfigs = data?.[0]?.techConfigs || [];

  // Fonction pour gérer l'ouverture du modal et définir l'ID sélectionné
  const handleEdit = (id: string) => {
    setSelectedId(id);
    setEditOpen(true);
  };

  // Fonction pour rafraîchir les données après fermeture de la modale
  const handleCloseEditDialog = () => {
    setEditOpen(false);
    queryClient.invalidateQueries("configsData"); // Invalider la requête pour refetch les données
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
          <button
            className="btn btn-active btn-sm btn-primary"
            onClick={() => setAddOpen(true)}
          >
            Ajouter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Description</th>
                <th>Références</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {techConfigs.length > 0 ? (
                techConfigs.map((techConf: any) => (
                  <tr key={techConf._id}>
                    <td>
                      <div className="font-bold">{techConf.title}</div>
                    </td>
                    <td>{techConf.description || ""}</td>
                    <td>
                      {techConf.refs?.map((ref: any) => (
                        <span
                          key={ref._id}
                          className="badge badge-ghost badge-sm m-2 p-2.5 flex items-center"
                        >
                          {ref.label}
                        </span>
                      )) || "Aucune référence"}
                    </td>

                    <th>
                      <button
                        className="btn btn-warning btn-xs mr-2"
                        onClick={() => handleEdit(techConf._id)}
                      >
                        Modifier
                      </button>
                      <button
                        className="btn btn-outline btn-error btn-xs"
                        onClick={() => setOpen(true)}
                      >
                        Supprimer
                      </button>
                    </th>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>Aucune configuration technique</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <EditDialog
        open={editOpen}
        onClose={handleCloseEditDialog} // Appel de la fonction lors de la fermeture
        configId={selectedId}
      />
      <AddDialog open={addOpen} onClose={() => setAddOpen(false)} />
      <DeleteDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default TechConfig;
