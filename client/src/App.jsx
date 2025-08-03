import { useState } from "react";
import axios from "axios";

function App() {
  const [Newtodo, setnewto] = useState("");
  const [todos, settodos] = useState([]);

  const Addtodo = async (e) => {
    e.preventDefault();

    if (!Newtodo.trim()) return;

    try {
      const response = await axios.post("/api/todos", { text: Newtodo });
      settodos(...todos, response.data);
      setnewto('')
    }
    catch (err) {
      console.log("Error to adding todo: ", err)
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-200 flex items-center justify-center p-4">
      <div className="shadow-lg p-8 rounded-2xl bg-white w-full max-w-lg">
        <h1 className="p-5 text-4xl font-bold text-gray-700 mb-6">Task Manager</h1>
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
        <div>{todos.length === 0 ? (
          <div></div>
        ) : (
            <div>
              {todos.map((todos)=>
                <div key={todos._id}>{todos.text}</div>
              )}
            </div>
        )}</div>
      </div>

    </div>

  )
}

export default App;
