import axios from "axios";

export const addTask = async (
  title: string,
  description: string,
  createdAt: string,
  expirydate: string
) => {
  try {
    await axios.post("http://localhost:8000/tasks", {
      title: title,
      description: description,
      created_at: createdAt,
      expiry_date: expirydate,
    });
  } catch (error) {
    console.log(error);
  }
};
