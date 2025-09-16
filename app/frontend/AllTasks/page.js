"use client";

import { useEffect, useState } from "react";
import TaskButton from "@/app/components/Taskbuttons";
import { fetchTasks, addTask, updateTask } from "../../services/taskService";
import Table from "../../components/Table";
import SidebarForm from "../../components/SidebarForm";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // ✅ sidebar open state

  const columns = [
    { header: "Task Name", accessor: "taskName" },
    { header: "Status", accessor: "status" },
    { header: "Assignee", accessor: "assignee" },
    { header: "Due Date", accessor: "dueDate" },
    { header: "Priority", accessor: "priority" },
    { header: "Task Type", accessor: "taskType" },
    { header: "Description", accessor: "description" },
  ];

  // Load tasks (simulating backend call)
  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const handleAddTask = async (task) => {
    const newTask = await addTask(task);
    setTasks((prev) => [...prev, newTask]);
    setIsOpen(false); // ✅ close sidebar after adding
  };

  const handleUpdateTask = async (id, updates) => {
    const updated = await updateTask(id, updates);
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updated } : task))
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tasks Tracker</h1>

      {/* ✅ pass onAdd handler */}
      <TaskButton onAdd={() => setIsOpen(true)} />

      {/* Table */}
      <Table columns={columns} data={tasks} onUpdate={handleUpdateTask} />

      {/* Sidebar Form */}
      <SidebarForm
        isOpen={isOpen}            // ✅ controlled open state
        onClose={() => setIsOpen(false)} // ✅ close handler
        columns={columns}
        onSubmit={handleAddTask}
      />
    </div>
  );
}
