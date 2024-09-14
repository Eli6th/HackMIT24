'use client';

import { createBrowserSupabaseClient } from "@/lib/client-utils";
import { useEffect, useState } from "react";

// Define types for our todos
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function Agenda() {

  const supabase = createBrowserSupabaseClient();


  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  // Fetch tasks from Supabase
  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase.from<Todo>("todos").select("*").order("id", { ascending: true });
      if (error) {
        console.error("Error fetching todos:", error.message);
      } else {
        setTodos(data || []);
      }
    };

    // Initial fetch
    fetchTodos();

    // Set up interval to fetch every 10 seconds
    const intervalId = setInterval(() => {
      fetchTodos();
    }, 10000); // 10 seconds in milliseconds

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Add new task to Supabase
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === "") return;

    const { data, error } = await supabase
      .from("todos")
      .insert([{ title: newTask, completed: false }]);

    if (error) {
      console.error("Error adding task:", error.message);
    } else {
      setTodos([...todos, ...(data ?? [])]);  // Update the list locally after insert
      setNewTask("");  // Clear the input field
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-lg bg-white p-4 shadow-lg">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">My Agenda</h1>

      {/* Add Task Form */}
      <form onSubmit={addTask} className="mb-4 flex">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full rounded-lg border p-2 mr-2"
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Add
        </button>
      </form>

      {/* Task List */}
      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between rounded-lg border p-3 ${
              todo.completed ? "border-green-400 bg-green-100" : "border-gray-400 bg-gray-100"
            }`}
          >
            <span className={`${todo.completed ? "text-gray-500 line-through" : "text-gray-800"}`}>
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
