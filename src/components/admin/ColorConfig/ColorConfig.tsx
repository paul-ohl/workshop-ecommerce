import { useState } from "react";
import "react-color-palette/css";
import EditDialog from "./edit/EditDialog";
import AddDialog from "./add/AddDialog";
import DeleteDialog from "./DeleteDialog";
const ColorConfig = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  return (
    <>
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
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

      <EditDialog open={editOpen} onClose={() => setEditOpen(false)} />
      <AddDialog open={addOpen} onClose={() => setAddOpen(false)} />
      <DeleteDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default ColorConfig;