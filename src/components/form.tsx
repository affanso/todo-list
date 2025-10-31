import { useState } from "react";
import { addTodo } from "../features/todo/todoSlice";
import { addTask } from "../services/addTask";
import { useAppDispatch } from "../app/hooks";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Form = () => {
  const navigate = useNavigate();

  const getCurrentDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const local = new Date(now.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
  };

  const dispatch = useAppDispatch();

  const [error, setError] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [expirydate, setExpirydate] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>(getCurrentDateTime());
  const [loading, setLoading] = useState<boolean>(false);

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!title || !description || !expirydate || !createdAt) {
      setError("Missing value!");
      setLoading(false);
      return;
    }

    if (new Date(expirydate) < new Date(createdAt)) {
      setError("Expiry date must be greater then Created at!!");
      setLoading(false);
      return;
    }

    await addTask(title, description, createdAt, expirydate);

    dispatch(
      addTodo({
        title,
        description,
        created_at: createdAt,
        expiry_date: expirydate,
      })
    );

    setDescription("");
    setTitle("");
    setExpirydate("");
    setLoading(false);
    navigate("/");
  };

  return (
    <form onSubmit={handelSubmit}>
      <div>
        <label
          htmlFor="title"
          className="block mt-2 mb-2 text-sm font-medium text-gray-900"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label
          htmlFor="description"
          className="block mt-2 mb-2 text-sm font-medium text-gray-900"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write your description here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div>
          <label
            htmlFor="created-at"
            className="block mt-2 mb-2 text-sm font-medium text-gray-900"
          >
            Created At
          </label>
          <input
            id="created-at"
            type="datetime-local"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            placeholder="Select date"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="expirydate"
          className="block mt-2 mb-2 text-sm font-medium text-gray-900"
        >
          Expiry date
        </label>
        <input
          id="expirydate"
          type="datetime-local"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          placeholder="Select date"
          value={expirydate}
          onChange={(e) => setExpirydate(e.target.value)}
        />
      </div>

      {error ? (
        <p
          id="filled_error_help"
          className="mt-2 text-xs text-red-600 dark:text-red-400"
        >
          <span className="font-medium">{error}</span>.
        </p>
      ) : (
        ""
      )}

      <button
        type="submit"
        className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
        disabled={loading}
      >
        {loading ? "Loading..." : "Save"}
      </button>

      <Link
        to={"/"}
        className="m-2 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Cancel
      </Link>
    </form>
  );
};
