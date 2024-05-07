import { createSlice, nanoid } from "@reduxjs/toolkit"


const initialState = {
    todos: [],
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload,
                isCompleted: false,
                isEditing: false,
            }
            state.todos.push(todo);
        },
        editTodo: (state, action) => {
            state.todos = state.todos.map(item => item.id === action.payload.id ? {...item, text: action.payload.text} : item);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(item => item.id !== action.payload);
        },
        completeTodo: (state, action) => {
            state.todos = state.todos.map(item => item.id == action.payload  ? {...item, isCompleted: !item.isCompleted} : item);
            console.log(action.payload);
        },
    }
})

//---------Exporting Reducer functions----------
export const { addTodo, editTodo, removeTodo, completeTodo } = todoSlice.actions;

//--------Exporting Reducer to be used in store-------
export default todoSlice.reducer