import { useState } from "react";
import Alert from "../../components/Alert";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import ConfirmModal from "../../components/ConfirmModel";

function EditModal({ record, onClose, onUpdate }) {
  const [text, setText] = useState(record.text);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onUpdate(record.id, text);
    }
  };

  return (
    <Modal title="Edit Todo" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
}

function AddModal({ onClose, onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText("");
    }
  };

  return (
    <Modal title="Add Todo" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter todo item"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default function TagsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedRecord, setSelectedRecord] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);
  const [records, setRecords] = useState([
    {
      _id: "1",
      name: "JavaScript",
      slug: "javascript",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "2",
      name: "React",
      slug: "react",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "3",
      name: "Node.js",
      slug: "node-js",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const handleDelete = (recordId) => {
    setIsDeleteModalOpen(true);
    setSelectedRecord(recordId);
  };

  const handleDeleteModelConfirm = async () => {};

  return (
    <div>
      <div className="px-4 space-y-4">
        <div className="flex justify-between">
          <h1 className=" text-4xl tracking-tight font-extrabold text-gray-800 dark:text-white">
            Tags
          </h1>

          <button className="flex items-center justify-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow dark:hover:bg-blue-700">
            <PlusCircle className="me-2" />
            <span>Tag</span>
          </button>
        </div>

        <Alert message={errorMessage} type="error" />

        {/* Tags Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.length > 0 ? (
                records.map((tag, index) => (
                  <tr key={tag._id}>
                    <td>{index + 1}</td>
                    <td>{tag.name}</td>
                    <td>{tag.slug}</td>
                    <td>{new Date(tag.createdAt).toLocaleString()}</td>
                    <td>{new Date(tag.updatedAt).toLocaleString()}</td>
                    <td>
                      <button
                        className="text-green-500 mr-2"
                        onClick={handleEdit}
                      >
                        <Edit />
                      </button>
                      <button className="text-red-500" onClick={handleDelete}>
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && <AddModal onClose={() => setIsAddModalOpen(false)} />}

      {isEditModalOpen && (
        <EditModal onClose={() => setIsEditModalOpen(false)} />
      )}

      {isDeleteModalOpen && (
        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteModelConfirm}
          title="Delete Record"
          message="Are you sure you want to delete this record."
        />
      )}
    </div>
  );
}
