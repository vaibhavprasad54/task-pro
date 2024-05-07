import { Pencil, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import {v4 as uuidv4} from "uuid";
uuidv4();


function Todo() {

  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [todoEditId, setTodoEditId] = useState(null);

  const handleEdit = (id, todo) => {
    setIsEditing(true);
    setTodoText(todo);
    setTodoEditId(id);
  }

  const handleDelete = (id) => {
    setTodos(todos.filter(( item => item.id !== id )));
    localStorage.setItem('Todos', JSON.stringify(todos));
  }

  const addTodo = (e) => {
    e.preventDefault();
    if (isEditing){
      setTodos(todos.map(item => item.id == todoEditId ? {...item, todo: todoText} : item ))
      setIsEditing(false);
      setTodoEditId(null);
      localStorage.setItem('Todos', JSON.stringify(todos));
    } else {
      setTodos([...todos, { todo: todoText, isCompleted: false, id: uuidv4() }]);
      localStorage.setItem('Todos', JSON.stringify(todos));
    }
    setTodoText("");
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(item => item.id == id ? { ...item, isCompleted: !item.isCompleted } : item ));
    localStorage.setItem('Todos', JSON.stringify(todos));
  }

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('Todos'));
    if(savedTodos){
      setTodos(savedTodos);
    }
  }, [])

  console.log("Todos:", todos);

  return (
    <div className='w-full h-screen flex flex-col items-center justify-start bg-[#10161d] px-4 py-16'>
      <h2 className='font-bold text-3xl text-center text-green-500 opacity-90'>Manage all your tasks in one <br /> place!</h2>
      <h3 className='text-2xl font-bold text-gray-300 opacity-90 pt-5'>Notes App - React</h3>
      <form onSubmit={addTodo} className="add-todo w-96 flex items-center justify-center gap-3 mt-5">
        <input type="text" onChange={(e) => setTodoText(e.target.value)} value={todoText} className='w-full rounded-[4px] px-5 py-2 my-4 outline-none' placeholder="What's on your mind today ?..." />
        <button type='submit' className='bg-green-500 hover:bg-green-600 font-semibold text-white opacity-90 rounded-[4px] whitespace-nowrap px-3 py-2'>
          {`${isEditing ? 'Update' : 'Add'} Todo`}
        </button>
      </form>
      <div className="todos w-96 mt-5 flex flex-col gap-3">
        {todos.length > 0 ? todos.map((item) => (
          <div key={item.id} className="todo bg-green-300 opacity-95 rounded-[5px] px-5 py-2 flex items-center justify-between cursor-pointer">
            <div className='flex items-center justify-center gap-4'>
              <input type="checkbox" value={item?.isCompleted} name={item.id} onChange={()=> toggleComplete(item.id)} className='w-3 h-3 cursor-pointer' />
              <p className={` ${item.isCompleted ? 'line-through' : ''} font-normal`}>{item?.todo}</p>
            </div>
            <div className="actionsBtns flex items-center justify-center gap-3">
              <Pencil onClick={()=> handleEdit(item.id, item.todo)} size={16} className='hover:text-green-800' />
              <Trash onClick={()=> handleDelete(item.id)} size={16} className='hover:text-red-600' />
            </div>
          </div>
        )) : (
          <p className='text-center text-gray-200 font-semibold'>You don't have any tasks....</p>
        )}
      </div>
    </div>
  )
}

export default Todo
