import { useState } from "react";
import Alert from "../../components/Alert";

export default function CategoriesPage() {
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

  return (
    <div>
      <div className="px-4 space-y-4">
        <h1 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-800 dark:text-white">
          Categories
        </h1>
        <Alert message={errorMessage} type="error" />
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Created At</th>
                <th>Updated At</th>
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
