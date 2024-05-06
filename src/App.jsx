import { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdSave } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [finish, setFinish] = useState(false);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);


  const saveTls = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveTls();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveTls();
  };

  const handleCheck = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveTls();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveTls();
  };

  const handleFinsh = () => {
    setFinish(!finish);
  };

  return (
    <>
      <div className="w-[100vw] h-[100vh] bg-red-400 flex justify-center ">
        <div className="bg-white w-[80%] md:w-1/3 h-fit mt-20 shadow-lg rounded-lg p-4 px-5">
          <h1 className=" font-semibold text-2xl">Todo Task</h1>
         
            <div className="flex justify-end gap-6 items-center 
            ">
              <input
                className=" border-2 border-slate-500 focus:outline-none focus:border-2 focus:border-red-700 my-4 w-3/4 rounded-xl p-2 pl-5"
                type="text"
                name="task"
                value={todo}
                onChange={handleChange}
                id=""
                placeholder="Enter the task..."
              />
             <button
                disabled={todo.length < 1}
                onClick={handleAdd}
                className=" text-center border-2 border-slate-600 hover:border-blue-400  text-lg p-2 rounded-lg  disabled:hover:text-red-500 disabled:hover:border-red-500 cursor-pointer"
              >
                Save
              </button>
              </div>
            <div>
              {todos.length !== 0 && (
                <button
                  onClick={handleFinsh}
                  className="border-2 border-slate-700 rounded-md px-3 py-1 ml-4 active:bg-slate-300 active:text-slate-700"
                >
                  {finish ? (
                    <span>Hide Completed</span>
                  ) : (
                    <span>Show Completed</span>
                  )}
                </button>
              )}
            </div>
          
          <div className="mt-5">
            {todos.map((item) => {
              return (
                (finish || !item.isCompleted) && (
                  <div key={item.id} className="flex my-3 items-center">
                    <input
                      name={item.id}
                      onChange={handleCheck}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=""
                    />
                    <h2
                      className={`ml-5 w-[70%] ${
                        item.isCompleted ? "line-through" : ""
                      }`}
                    >
                      {item.todo}
                    </h2>
                    <div className="flex flex-row">
                      <button
                        onClick={(e) => {
                          handleEdit(e, item.id);
                        }}
                        className=" text-3xl ml-1 px-3 active:bg-slate-300 active:text-slate-700 h-10"
                      >
                        <CiEdit />
                      </button>
                      <button
                        onClick={(e) => {
                          handleDelete(e, item.id);
                        }}
                        className=" text-3xl text-red-500 px-3 ml-2 active:bg-slate-300 h-10"
                      >
                        <MdOutlineDeleteOutline />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
