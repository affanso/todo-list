import axios from "axios";
export const deleteTasks = async (selectedTasks: string[]) => {
  try {
    await Promise.all(
      selectedTasks.map((taskId) =>
        axios.delete(`http://localhost:8000/tasks/${taskId}`)
      )
    );
  } catch (error) {
    console.log(error);
  }
};
