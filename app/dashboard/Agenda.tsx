'use client';

import { createBrowserSupabaseClient } from "@/lib/client-utils";
import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // Animation Library
import { PlusIcon, TrashIcon, MicrophoneIcon, StopIcon } from "@heroicons/react/outline"; // Example icon imports
import { ArrowLeftIcon } from "lucide-react";
import Dictaphone from "./Microphone";
// Define types for our todos and agendas
interface Todo {
  id: number;
  name: string;
  completed: boolean;
  agenda_id: number; 
  created_at: string;
  reason: string;
}

interface Agenda {
  id: number;
  name: string;
  user_id: string;
  is_template: boolean;
  created_at: string;
}

export default function AgendaManager() {
  const supabase = createBrowserSupabaseClient();

  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [selectedAgenda, setSelectedAgenda] = useState<Agenda | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [newAgendaName, setNewAgendaName] = useState<string>("");
  const [recording, setRecording] = useState<boolean>(false);

  useEffect(() => {
    if (recording) {
      console.log("Recording audio...");
    } else {
      console.log("Stopped recording audio.");
    }
  }, [recording])

  // Fetch agendas from Supabase
  useEffect(() => {
    const fetchAgendas = async () => {
      const { data, error } = await supabase
        .from<Agenda>("agenda")
        .select("*")
        .order("id", { ascending: true });
      if (error) {
        console.error("Error fetching agendas:", error.message);
      } else {
        setAgendas(data || []);
      }
    };

    fetchAgendas();
  }, []);

  // Fetch todos for the selected agenda
  useEffect(() => {
    if (selectedAgenda) {
      const fetchTodos = async () => {
        const { data, error } = await supabase
          .from<Todo>("todo")
          .select("*")
          .eq("agenda_id", selectedAgenda.id)
          .order("id", { ascending: true });

        if (error) {
          console.error("Error fetching todos:", error.message);
        } else {
          setTodos(data || []);
        }
      };

      fetchTodos();
    }
  }, [selectedAgenda]);
  
  <Dictaphone />
  // Add new task to the selected agenda
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === "" || !selectedAgenda) return;

    const todo = { 
      name: newTask, 
      completed: false, 
      agenda_id: selectedAgenda.id,
      created_at: new Date().toISOString(),
      reason: "",
      id: Math.floor(Math.random() * 1000)
    };

    const { error } = await supabase.from("todo").insert([todo]);

    if (error) {
      console.error("Error adding task:", error.message);
    } else {
      setTodos([...todos, ...([todo] ?? [])]);
      setNewTask(""); 
    }
  };

  // Delete task
  const deleteTask = async (id: number) => {
    const { error } = await supabase.from("todo").delete().eq("id", id);

    if (error) {
      console.error("Error deleting task:", error.message);
    } else {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  // Add a new agenda
  const addAgenda = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newAgendaName.trim() === "") return;

    const agenda = { 
      name: newAgendaName,
      user_id: (await supabase.auth.getUser()).data.user?.id,
      id: Math.floor(Math.random() * 1000), 
      created_at: new Date().toISOString(),
      is_template: false
    };

    const { error } = await supabase.from("agenda").insert([agenda]);

    if (error) {
      console.error("Error adding agenda:", error.message);
    } else {
      setAgendas([...agendas, ...([agenda] ?? [])]);
      setNewAgendaName(""); 
    }
  };

  // Delete agenda
  const deleteAgenda = async (id: number) => {
    // confirm deletion
    if (!window.confirm("Are you sure you want to delete this agenda?")) return;

    // first delete all todos associated with this agenda
    const { error: todoError } = await supabase.from("todo").delete().eq("agenda_id", id);
    const { error } = await supabase.from("agenda").delete().eq("id", id);

    if (todoError) {
      console.error("Error deleting todos:", todoError.message);
    } else if (error) {
      console.error("Error deleting agenda:", error.message);
    } else {
      setAgendas(agendas.filter((agenda) => agenda.id !== id));
      setSelectedAgenda(null);
    }
  };

  // Handle task completion toggle
  const toggleComplete = async (todo: Todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    const { error } = await supabase
      .from("todo")
      .update({ completed: updatedTodo.completed })
      .eq("id", updatedTodo.id);

    if (error) {
      console.error("Error updating task:", error.message);
    } else {
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
      );
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800 dark:text-gray-300">
      <h1 className="mb-6 text-3xl font-semibold text-gray-900 dark:text-gray-100">
        {!selectedAgenda ? "Agendas" : null}
      </h1>

      {selectedAgenda ? (
        <div>
          {/* <button
            onClick={() => {
              setTodos([]);
              setSelectedAgenda(null)
            }}
            className="mb-4 text-blue-600 hover:underline dark:text-blue-300"
          >
            Back to Agendas
          </button> */}

          <ArrowLeftIcon
            onClick={() => {
              setTodos([]);
              setSelectedAgenda(null)
            }}
            className="h-5 w-5 mb-5 text-blue-600 hover:text-blue-800 cursor-pointer"
          />

            <h2 className="mb-4 text-2xl font-semibold text-black flex items-center justify-between">
              {selectedAgenda.name}
                <button
                onClick={() => deleteAgenda(selectedAgenda.id)}
                className="flex items-center bg-red-600 text-white rounded-lg px-3 py-2 hover:bg-red-800 cursor-pointer"
                >
                <TrashIcon className="h-5 w-5 mr-2" />
                <span
                className="text-sm"
                >Delete Agenda</span>
                </button>
            </h2>

          <form onSubmit={addTask} className="mb-4 flex">
            <input
              type="text"
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="w-full rounded-lg border p-2 mr-2 bg-gray-100 text-black"
            />
            <button
              type="submit"
              className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          </form>

          <TransitionGroup component="ul" className="space-y-3">
            {todos.map((todo) => (
              <CSSTransition key={todo.id} timeout={500} classNames="slide">
                <li
                  className={`flex items-center justify-between rounded-lg border p-3 transition-all ${
                    todo.completed
                      ? "border-green-400 bg-green-100 line-through dark:bg-green-900"
                      : "border-gray-400 bg-gray-100 dark:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo)}
                    className="h-5 w-5 rounded border-gray-300 bg-white text-green-600 focus:ring-green-400"
                  />

                    <span className={todo.completed ? "text-gray-500" : "text-gray-800"}>
                      {todo.name}
                    </span>
                  </div>
                  <TrashIcon
                    onClick={() => deleteTask(todo.id)}
                    className="h-5 w-5 text-red-600 hover:text-red-800 cursor-pointer"
                  />
                </li>
              </CSSTransition>
            ))}
          </TransitionGroup>

          {/* a big red record button */}

          <div
            className="flex justify-center mt-4"
          >
           <Dictaphone/> 
          </div>
        </div>
      ) : (
        <div>
          <form onSubmit={addAgenda} className="mb-4 flex">
            <input
              type="text"
              placeholder="Add a new agenda"
              value={newAgendaName}
              onChange={(e) => setNewAgendaName(e.target.value)}
              className="w-full rounded-lg border p-2 mr-2  bg-gray-100"
            />
            <button
              type="submit"
              className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          </form>

          <ul className="space-y-3">
            {agendas.map((agenda) => (
              <li
                key={agenda.id}
                onClick={() => setSelectedAgenda(agenda)}
                className="text-black cursor-pointer rounded-lg border border-gray-400 bg-gray-100 p-3 transition-all hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                {agenda.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
