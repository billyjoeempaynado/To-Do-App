"use client";

export default function TaskButton({ onAdd }) {
  return (
    <nav className="flex justify-between items-center mb-4">
      <div className="flex gap-4">
        <a href="/frontend/AllTasks" className="text-blue-500 hover:underline">
          All Tasks
        </a>
        <a href="/frontend/ByStatus" className="text-blue-500 hover:underline">
          By Status
        </a>
        <a href="/frontend/MyTasks" className="text-blue-500 hover:underline">
          My Tasks
        </a>
      </div>

      <button
        onClick={onAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Add Task
      </button>
    </nav>
  );
}
