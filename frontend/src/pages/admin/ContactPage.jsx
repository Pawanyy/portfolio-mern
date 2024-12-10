import { useEffect, useState } from "react";
import Alert from "../../components/Alert";
import axios from "axios";
import constant from "../../constants.js";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";

export default function ContactPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [records, setRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const tokenDetails = useSelector((state) => state.auth.tokenDetails);

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${constant.API_URL}/contact`, {
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
        setErrorMessage("Error fetching contacts");
      } finally {
        setLoading(false);
        setRefresh(false);
      }
    };

    fetchRecords();
  }, [currentPage, refresh, tokenDetails.authToken]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="px-4 space-y-4">
        <div className="flex justify-between">
          <h1 className=" text-4xl tracking-tight font-extrabold text-gray-800 dark:text-white">
            Contacts
          </h1>
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
                  <th>Email</th>
                  <th>Message</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {records.length > 0 ? (
                  records.map((tag, index) => (
                    <tr key={tag._id}>
                      <td>{(currentPage - 1) * 10 + index + 1}</td>
                      <td>{tag.name}</td>
                      <td>{tag.email}</td>
                      <td>{tag.message}</td>
                      <td>{new Date(tag.createdAt).toLocaleString()}</td>
                      <td>{new Date(tag.updatedAt).toLocaleString()}</td>
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
      </div>
    </div>
  );
}
