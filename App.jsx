import { useEffect, useState } from 'react'
import './App.css'
import Todo from './Todo'

function App() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8000/todos", {
      method : "GET",
    }).then((response) =>  {
      return response.json();
    }).then((data) => {
      // console.log(data);
      setTodos(data);
    }).catch((err) => {
      console.log(err);
    })
  }, [title, description, count]);

  const handleAddBtn = () => {
    fetch("http://localhost:8000/todo", {
      method : "POST",
      headers : {
        "Accept" : "application/json",
        "Content-Type" : "application/json"
    },
      body : JSON.stringify({
        "title" : title,
        "description" : description 
      })
    }).then((response) => {
      return response.json();
    }).then((data) => {
      // console.log(data);
      setCount(count+1);
    }).catch((err) => {
      console.log(err);
    })
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <div className="main h-screen w-screen flex flex-col items-center justify-center gap-10">
        <div className="header w-1/3 h-48 shadow-xl flex flex-col items-center justify-center gap-2">
          <input type="text" className="border h-10 w-4/5 p-4 rounded-sm" placeholder='title' value={title} onChange={(e) => {setTitle(e.target.value)}}/>
          <input type="text" className="border h-10 w-4/5 p-4 rounded-sm" placeholder='description' value={description} onChange={(e) => {setDescription(e.target.value)}}/>
          <button className="h-10 w-4/5 bg-blue-600 text-white rounded-sm hover:bg-blue-500" onClick={handleAddBtn}>Add</button>
        </div>
        <div className="todos w-10/12 h-60 grid grid-cols-3 gap-2">
          {
            todos.map((todo, index) =>
              <Todo title={todo.title} description={todo.description} count={{countVar : count, countFn : setCount}} key={index}/>
            )
          }
          </div>
      </div>
    </>
  )
}

export default App