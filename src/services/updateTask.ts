import axios from "axios";
export const updateTask = async (
  id: string,
  title: string,
  description: string,
  created_at: string,
  expiry_date: string
) => {
  try {
    await axios.put(`http://localhost:8000/tasks/${id}`, {
      title: title,
      description: description,
      created_at: created_at,
      expiry_date: expiry_date,
    });
  } catch (error) {
    console.log(error);
  }
};
