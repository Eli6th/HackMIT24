import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

// Define types for our todos
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Initialize Supabase
const supabaseUrl = "https://xyzcompany.supabase.co"; // Replace with your Supabase URL
const supabaseKey = "public-anon-key"; // Replace with your Supabase key
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

const Agenda: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Fetch and subscribe to changes in the todos table
  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase.from<Todo>("todos").select("*").order("id", { ascending: true });

      if (error) console.error(error);
      else setTodos(data || []);
    };

    // Subscribe to changes
    const subscription = supabase
      .from("todos")
      .on("*", (payload) => {
        fetchTodos();
      })
      .subscribe();

    fetchTodos();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  return (
    <div className="mx-auto max-w-lg rounded-lg bg-white p-4 shadow-lg">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">My Agenda</h1>
      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between rounded-lg border p-3 ${
              todo.completed ? "border-green-400 bg-green-100" : "border-gray-400 bg-gray-100"
            }`}
          >
            <span className={`${todo.completed ? "text-gray-500 line-through" : "text-gray-800"}`}>{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Agenda;
