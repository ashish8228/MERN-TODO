import { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineDownloadDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";



function App() {
  const [Newtodo, setnewto] = useState("");
  const [todos, settodos] = useState([]);
  const [EditingTodo, SetEditingTodo] = useState(null);
  const [EditedText, SetEditedText] = useState("");


  const deletetodo = async(id)=>{
    try{
      await axios.delete(`/api/todos/${id}`);
      settodos(todos.filter((todo)=>todo._id !== id))
    }
    catch{
      console.log("Error to delete data" , err)
    }
  }

  const StartEditing = (todo) => {
    SetEditingTodo(todo._id);
    SetEditedText(todo.text);
  }

  const saveedit = async (id)=>{
    try{
      const response = await axios.patch(`/api/todos/${id}`, {
        text : EditedText
      })
      settodos(todos.map((todo)=>(todo._id === id ? response.data : todo)))
      SetEditingTodo(null)
    }
    catch(err){
      console.log("Soryy For now try again later to updating this", err)
    }
  }

  const Addtodo = async (e) => {
    e.preventDefault();

    if (!Newtodo.trim()) return;

    try {
      const response = await axios.post("/api/todos", { text: Newtodo });
      settodos([...todos, response.data])
      setnewto('')
    }
    catch (err) {
      console.log("Error to adding todo: ", err)
    }
  }


  const fetchtodos = async () => {
    try {
      const response = await axios.get("/api/todos");
      settodos(response.data)
    }
    catch (err) {
      console.log("Error in fetching todo : ", err)
    }
  }

  useEffect(() => {
    fetchtodos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-200 flex items-center justify-center p-4">
      <div className="shadow-lg p-8 rounded-2xl bg-white w-full max-w-lg">
        <h1 className="p-5 text-4xl font-bold text-gray-700 mb-6 text-center">Task Manager</h1>
        <form onSubmit={Addtodo} className="flex gap-3 border border-gray-300 rounded-lg  p-2">
          <input
            className="flex-1 
            outline-none 
            px-3
            text-gray-700
            placeholder-gray-400
            "
            type="text"
            placeholder="Enter Your Task"
            value={Newtodo}
            required
            onChange={(e) => { setnewto(e.target.value) }}
          />
          <button type="submit" className="font-semibold text-white bg-blue-400 hover:bg-blue-500  rounded-xl px-5 py-2 cursor-pointer">Add Task</button>
        </form>
        <div className="mt-4">
          {todos.length === 0 ? (
          <div>

          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {todos.map((todo) =>
              <div key={todo._id}>
                {EditingTodo === todo._id ? (
                  <div className="flex items-center gap-x-3 overflow-hidden">
                    <input className="flex-1 border border-gray-300 outline-none rounded-lg p-3 focus:ring-1 text-gray-700 shadow-inner focus:ring-blue-300"  type="text" value={EditedText} onChange={(e) => { SetEditedText(e.target.value) }} />
                    <div className="flex gap-3">
                      <button className=" bg-green-500 hover:bg-green-600 cursor-pointer px-4 py-2 rounded-lg text-white" onClick={()=>saveedit(todo._id)}><MdOutlineDownloadDone /></button>
                      <button className=" bg-red-500 hover:bg-red-600 cursor-pointer px-4 py-2 rounded-lg text-white" onClick={() => SetEditingTodo(null)}><RxCross2 /></button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between overflow-hidden">
                    <span className="text-gray-700 font-medium truncate">{todo.text}</span>
                    <div className="flex">       
                      <button className="cursor-pointer text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-3 rounded-lg" onClick={() => StartEditing(todo)}><FaRegEdit /></button>
                      <button onClick={()=>deletetodo(todo._id)} className="cursor-pointer text-red-500 hover:text-red-700 hover:bg-red-50 p-3 rounded-lg"><RiDeleteBin5Fill /></button>
                    </div>
                  </div>
                )

                }
              </div>
            )}
          </div>
        )}</div>
      </div>

    </div>

  )
}

export default App;
