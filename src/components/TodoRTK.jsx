import { Pencil, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {addTodo, completeTodo, editTodo, removeTodo} from "../features/todoSlice/todoSlice";


function TodoRTK() {

  const [todoText, setTodoText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [todoEditId, setTodoEditId] = useState(null);

  const dispatch = useDispatch();
  const newTodos = useSelector((state) =>  state.todos );

  const addTodos = (e) => {
    e.preventDefault();
    if(isEditing){
      dispatch(editTodo({ id: todoEditId, text: todoText }));
      setIsEditing(false);
      setTodoText(null);
    } else {
      dispatch(addTodo(todoText));
    }

    setTodoText("");
  }

  const handleEdit = (id, text) => {
    setIsEditing(true);
    setTodoText(text);
    setTodoEditId(id);
  }

  const toggleComplete = (id) => {
    dispatch(completeTodo(id));
  }

  const handleDelete = (id) => {
    dispatch(removeTodo(id));
  }


  return (
    <div className='w-full h-screen flex flex-col items-center justify-start bg-[#10161d] px-4 py-28'>
      <h2 className='font-bold text-3xl text-center text-green-500 opacity-90'>Manage all your tasks in one <br /> place!</h2>
      <h3 className='text-2xl font-bold text-gray-300 opacity-90 pt-5'>Notes App - React</h3>
      <form onSubmit={addTodos} className="add-todo w-96 flex items-center justify-center gap-3 mt-7">
        <input type="text" onChange={(e) => setTodoText(e.target.value)} value={todoText} className='w-full rounded-[4px] px-5 py-2 my-4 outline-none' placeholder="What's on your mind today ?..." />
        <button type='submit' className='bg-green-500 hover:bg-green-600 font-semibold text-white opacity-90 rounded-[4px] whitespace-nowrap px-3 py-2'>
          {`${isEditing ? 'Update' : 'Add'} Todo`}
        </button>
      </form>
      <div className="todos w-96 mt-5 flex flex-col gap-3">
        {newTodos?.length > 0 ? newTodos.map((item) => (
          <div key={item.id} className={`todo ${item?.isCompleted ? "bg-gray-400" : "bg-green-300"} opacity-95 rounded-[5px] px-5 py-2 flex items-center justify-between`}>
            <div className='flex items-center justify-center gap-4'>
              <input type="checkbox" value={item?.isCompleted} name={item.id} onChange={()=> toggleComplete(item.id)} className='w-3 h-3 cursor-pointer' />
              <p className={` ${item.isCompleted ? 'line-through text-gray-500' : ''} font-normal`}>{item?.text}</p>
            </div>
            <div className="actionsBtns flex items-center justify-center gap-3">
              <Pencil onClick={()=> handleEdit(item.id, item.text)} size={16} className={`${item?.isCompleted ? "text-gray-500 pointer-events-none" : "text-gray-900 cursor-pointer"} hover:text-green-800`} />
              <Trash onClick={()=> handleDelete(item.id)} size={16} className='hover:text-red-600 cursor-pointer' />
            </div>
          </div>
        )) : (
          <p className='text-center text-gray-200 font-semibold'>You don't have any tasks....</p>
        )}
      </div>
    </div>
  )
}

export default TodoRTK
