import { useEffect } from "react";
import axios from "axios";
import { Table } from "./table";
import { useDispatch } from "react-redux";
import { getTodos } from "../features/todo/todoSlice";
import { Link } from "react-router-dom";

export const Home = () => {
  const dispatch = useDispatch();

  const getAllTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8000/tasks");
      dispatch(getTodos(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <>
      <Link
        to={"/addtask"}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add Task
      </Link>

      <Table />
    </>
  );
};
