"use client";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { fetchStatuses, fetchPriorities, fetchTaskTypes } from "../services/taskService"; 


export default function SidebarForm({ isOpen, onClose, columns, onSubmit }) {
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [taskTypes, setTaskTypes] = useState([]);

  // Fetch dropdown values from backend on mount
  useEffect(() => {
    fetchStatuses().then(setStatuses);
    fetchPriorities().then(setPriorities);
    fetchTaskTypes().then(setTaskTypes);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    onSubmit(values);
    onClose();
  };

  const renderField = (col) => {
    if (col.accessor === "description") {
      return <textarea name={col.accessor} className="border p-2 rounded" placeholder={`Enter ${col.header}`} required />;
    }

    if (col.accessor === "dueDate") {
      return <input type="date" name={col.accessor} className="border p-2 rounded" required />;
    }

    if (col.accessor === "status") {
      return (
        <select name={col.accessor} className="border p-2 rounded" required>
          <option value="">Select status</option>
          {statuses.map((s) => (
            <option key={s.id} value={s.name}>{s.name}</option>
          ))}
        </select>
      );
    }

    if (col.accessor === "priority") {
      return (
        <select name={col.accessor} className="border p-2 rounded" required>
          <option value="">Select priority</option>
          {priorities.map((p) => (
            <option key={p.id} value={p.name}>{p.name}</option>
          ))}
        </select>
      );
    }

    if (col.accessor === "taskType") {
      return (
        <select name={col.accessor} className="border p-2 rounded" required>
          <option value="">Select type</option>
          {taskTypes.map((t) => (
            <option key={t.id} value={t.name}>{t.name}</option>
          ))}
        </select>
      );
    }

    // default = text input
    return <input type="text" name={col.accessor} className="border p-2 rounded" placeholder={`Enter ${col.header}`} required />;
  };

  return (
    <Sidebar isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Add Task</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {columns.map((col) => (
          <div key={col.accessor} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">{col.header}</label>
            {renderField(col)}
          </div>
        ))}

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save
          </button>
        </div>
      </form>
    </Sidebar>
  );
}
