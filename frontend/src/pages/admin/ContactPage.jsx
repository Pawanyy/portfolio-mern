import { useState } from "react";
import Alert from "../../components/Alert";

export default function ContactPage() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [contacts, setContacts] = useState([
    {
      id: "1",
      name: "John Doe",
      subject: "contact",
      email: "john@example.com",
      message: "Hello, I'd like to discuss a project.",
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Jane Smith",
      subject: "contact",
      email: "jane@example.com",
      message: "Great work on your portfolio!",
      createdAt: new Date(),
    },
    {
      id: "3",
      name: "Bob Johnson",
      subject: "contact",
      email: "bob@example.com",
      message: "Are you available for freelance work?",
      createdAt: new Date().toISOString(),
    },
  ]);

  return (
    <div>
      <div className="px-4 space-y-4">
        <h1 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-800 dark:text-white">
          Contacts
        </h1>
        <Alert message={errorMessage} type="error" />
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Subject</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {contacts.length > 0 ? (
                contacts.map((record, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{record.subject}</td>
                    <td>{record.email}</td>
                    <td>{record.message}</td>
                    <td>{new Date(record.createdAt).toLocaleString()}</td>
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
