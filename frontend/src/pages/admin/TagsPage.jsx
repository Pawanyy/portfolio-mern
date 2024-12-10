import { useEffect, useState } from "react";
import Alert from "../../components/Alert";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import ConfirmModal from "../../components/ConfirmModel";
import axios from "axios";
import constant from "../../constants.js";
import { useSelector } from "react-redux";
import Modal from "../../components/Model";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";

function EditModal({ record, onClose, onUpdate }) {
  const [name, setName] = useState(record.name);
  const [slug, setSlug] = useState(record.slug);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && slug.trim()) {
      onUpdate(record._id, { name, slug });
    }
  };

  return (
    <Modal title="Edit Tag" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
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
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && slug.trim()) {
      onAdd({ name, slug });
      setName("");
      setSlug("");
    }
  };

  return (
    <Modal title="Add Tag" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter tag name"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Enter tag slug"
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [records, setRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const tokenDetails = useSelector((state) => state.auth.tokenDetails);

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${constant.API_URL}/tag`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenDetails.authToken}`,
          },
          params: {
            page: currentPage,
            limit: 10,
          },
        });
        setRecords(response.data.data.results);
        setTotalPages(response.data.data.totalPages);
      } catch (error) {
        setErrorMessage("Error fetching tags");
      } finally {
        setLoading(false);
        setRefresh(false);
      }
    };

    fetchRecords();
  }, [currentPage, refresh, tokenDetails.authToken]);

  const handleAdd = async (tagData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${constant.API_URL}/tag`, tagData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenDetails.authToken}`,
        },
      });
      setRecords([response.data.data, ...records]);
      setIsAddModalOpen(false);
      setRefresh(true);
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Error adding tag");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (recordId, updatedData) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${constant.API_URL}/tag/${recordId}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenDetails.authToken}`,
          },
        }
      );
      const updatedRecords = records.map((record) =>
        record._id === recordId ? response.data.data : record
      );
      setRecords(updatedRecords);
      setIsEditModalOpen(false);
      setRefresh(true);
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Error updating tag");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`${constant.API_URL}/tag/${selectedRecord._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenDetails.authToken}`,
        },
      });
      setRecords(records.filter((record) => record._id !== selectedRecord._id));
      setIsDeleteModalOpen(false);
      setRefresh(true);
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Error deleting tag");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEditModal = (record) => {
    setSelectedRecord(record);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (record) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="px-4 space-y-4">
        <div className="flex justify-between">
          <h1 className=" text-4xl tracking-tight font-extrabold text-gray-800 dark:text-white">
            Tags
          </h1>

          <button
            className="flex items-center justify-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow dark:hover:bg-blue-700"
            onClick={() => setIsAddModalOpen(true)}
          >
            <PlusCircle className="me-2" />
            <span>Tag</span>
          </button>
        </div>

        <Alert message={errorMessage} type="error" />

        {loading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
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
                      <td>{(currentPage - 1) * 10 + index + 1}</td>
                      <td>{tag.name}</td>
                      <td>{tag.slug}</td>
                      <td>{new Date(tag.createdAt).toLocaleString()}</td>
                      <td>{new Date(tag.updatedAt).toLocaleString()}</td>
                      <td>
                        <button
                          className="text-green-500 mr-2"
                          onClick={() => handleOpenEditModal(tag)}
                        >
                          <Edit />
                        </button>
                        <button
                          className="text-red-500"
                          onClick={() => handleOpenDeleteModal(tag)}
                        >
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
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />

        {isAddModalOpen && (
          <AddModal
            onClose={() => setIsAddModalOpen(false)}
            onAdd={handleAdd}
          />
        )}

        {isEditModalOpen && (
          <EditModal
            record={selectedRecord}
            onClose={() => setIsEditModalOpen(false)}
            onUpdate={handleEdit}
          />
        )}

        {isDeleteModalOpen && (
          <ConfirmModal
            message="Are you sure you want to delete this tag?"
            onConfirm={handleDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
