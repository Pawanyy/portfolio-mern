import { useEffect, useState } from "react";
import Alert from "../../components/Alert.jsx";
import axios from "axios";
import constant from "../../constants.js";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner.jsx";
import { useForm } from "react-hook-form";

export default function SettingsPage() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const tokenDetails = useSelector((state) => state.auth.tokenDetails);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${constant.API_URL}/settings`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenDetails.authToken}`,
          },
        });
        reset(response.data.data);
      } catch (error) {
        setErrorMessage("Error fetching Settings");
      } finally {
        setLoading(false);
        setRefresh(false);
      }
    };

    fetchRecords();
  }, [refresh, reset, tokenDetails.authToken]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${constant.API_URL}/settings`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenDetails.authToken}`,
          },
        },
        data
      );
      reset(response.data.data);
    } catch (error) {
      setErrorMessage("Error updating Settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="px-4 space-y-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between">
            <h1 className=" text-4xl tracking-tight font-extrabold text-gray-800 dark:text-white">
              Settings
            </h1>

            <button
              className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-700"
              type="submit"
              disabled={loading}
              onClick={() => setLoading(true)}
            >
              {loading ? "Loading..." : "Save"}
            </button>
          </div>

          <Alert message={errorMessage} type="error" />

          {loading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="overflow-x-auto bg-white p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h2 className="mb-4 text-lg font-bold">Site Details</h2>
              <div className="mb-4">
                <label
                  htmlFor="favicon"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Favicon
                </label>
                <input
                  type="file"
                  id="favicon"
                  name="favicon"
                  accept="image/x-icon,image/png"
                  className="block w-full border rounded-lg px-3 py-2"
                  {...register("favicon")}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="siteName"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Site Name
                </label>
                <input
                  type="text"
                  id="siteName"
                  name="siteName"
                  placeholder="Enter site name"
                  className="block w-full border rounded-lg px-3 py-2"
                  {...register("siteName")}
                />
              </div>
              <hr className="border-b mb-4" />
              <h2 className="mb-4 text-lg font-bold">Seo Details</h2>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Meta Title
                </label>
                <input
                  type="text"
                  id="metaTitle"
                  name="metaTitle"
                  placeholder="Enter Meta title"
                  className="block w-full border rounded-lg px-3 py-2"
                  {...register("metaTitle")}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="metaDescription"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Meta Description
                </label>
                <textarea
                  id="metaDescription"
                  name="metaDescription"
                  placeholder="Enter meta description"
                  className="block w-full border rounded-lg px-3 py-2 h-24 resize-none"
                  {...register("metaDescription")}
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="metaKeywords"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Meta Keywords
                </label>
                <input
                  type="text"
                  id="metaKeywords"
                  name="metaKeywords"
                  placeholder="Enter meta keywords (comma-separated)"
                  className="block w-full border rounded-lg px-3 py-2"
                  {...register("metaKeywords")}
                />
              </div>
              <hr className="border-b mb-4" />
              <h2 className="mb-4 text-lg font-bold">Other</h2>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Build Webhook Url
                </label>
                <input
                  type="text"
                  id="buildWebhookUrl"
                  name="buildWebhookUrl"
                  placeholder="Enter Build Webhook Url"
                  className="block w-full border rounded-lg px-3 py-2"
                  {...register("buildWebhookUrl")}
                />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
