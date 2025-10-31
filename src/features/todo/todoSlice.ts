import { createSlice, nanoid } from "@reduxjs/toolkit";

// // Define a type for the slice state
// interface CounterState {
//   value: number
// }

// // Define the initial state using that type
// const initialState: CounterState = {
//   value: 0,
// }

// const initialState = {
//   todos: [
//     { id: "", title: "", description: "", created_at: "", expiry_date: "" },
//   ],
// };

interface Todo {
  id: string;
  title: string;
  description: string;
  created_at: string;
  expiry_date: string;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        title: action.payload.title,
        description: action.payload.description,
        created_at: action.payload.created_at,
        expiry_date: action.payload.expiry_date,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      const idsToRemove = action.payload;
      state.todos = state.todos.filter(
        (todo) => !idsToRemove.includes(todo.id)
      );
    },
    updateTodo: (state, action) => {
      const { id, title, description } = action.payload;
      const existingTodo = state.todos.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.title = title;
        existingTodo.description = description;
      }
    },
    getTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const { addTodo, removeTodo, getTodos, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
