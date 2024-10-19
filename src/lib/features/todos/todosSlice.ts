import { createSlice, nanoid } from "@reduxjs/toolkit";

interface Todo {
  id: string;
  text: string;
  completed: boolean
}

const initialState: {todos: Todo[] } = {
  todos: []
}

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: nanoid(),
        text: action.payload.text,
        completed: false
      }
      state.todos.push(newTodo)
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    toggleTodoCompleted: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id)
      if (todo){
        todo.text = action.payload.text
      }
    }
    
  }
})

export const { addTodo, deleteTodo, toggleTodoCompleted, editTodo } = todoSlice.actions
export default todoSlice.reducer