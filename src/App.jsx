import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid'; // Import uuid

function App() {
  const [inputState, setInputState] = useState("");
  const [task, setTask] = useState([]);
  const [editTask, setEditTask] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputState) return; // Ensure something is entered

    if (editTask) {
      const updateTasks = task.map((item) =>
        item.id === editTask.id ? { ...item, name: inputState } : item
      );
      setTask(updateTasks);
      setEditTask(null);
    } else {
      const newTask = { id: uuidv4(), name: inputState };
      setTask((prevTask) => [...prevTask, newTask]);
    }
    setInputState("")

    if (task.includes(inputState)) {
      setInputState("");
      return;
    }
    setInputState("")
  }
  function handleInput(value) {
    setInputState(value);
  
  }
  function handleEdit(e, id) {
    const taskToEdit = task.find(i => i.id === id); // Use find instead of filter
    setEditTask(taskToEdit); // Store the full task object for editing
    setInputState(taskToEdit.name); // Set only the task name into input
  }
  
  function handleDelete(id) {
    const updatedTasks = task.filter((item) => item.id !== id);
    setTask(updatedTasks);
  }

  return (
    <>
      <div>
        <div>
          <h1 className="bg-blue-400 text-white flex items-center justify-center font-bold text-lg p-2">
            TODO App
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="bg-blue-200 flex flex-col items-center justify-center m-12 p-3">
              <h2 className="font-bold text-lg m-2"> Add TODO </h2>
              <input
                className="border-2 border-white p-1 rounded-md w-full"
                type="text"
                placeholder="Enter Your Todo"
                value={inputState}
                onChange={(e) => { handleInput(e.target.value) }}
              />
              <button
                type="submit"
                className="bg-blue-400 rounded-md font-bold text-white p-2 mt-2"
              >
                Add
              </button>

              <div>
                <h2 className="font-bold text-lg">Your Todos: </h2>
                <ul>
                  {task.length === 0 ? (
                    <li>No task Added</li>
                  ) : (
                    task.map((item) => {
                      return (
                        <li key={item.id} className="flex justify-between items-center p-2 border-b">
                          <span>{item.name}</span>
                          <button
                            className="bg-blue-400 text-white p-1 rounded-md ml-2 font-bold text-lg"
                            onClick={(e) => handleEdit(e, item.id)}
                          >
                            Update
                          </button>
                          <button
                            className="bg-red-500 text-white p-1 rounded-md ml-1 font-bold text-lg"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
