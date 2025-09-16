"use client";
import Sidebar from "./Sidebar"; // your Sidebar wrapper

export default function SidebarForm({ isOpen, onClose, columns, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    onSubmit(values);
    onClose();
  };

  const renderField = (col) => {
    if (col.accessor === "description") {
      return (
        <textarea
          name={col.accessor}
          className="border p-2 rounded"
          placeholder={`Enter ${col.header}`}
          required
        />
      );
    }

    if (col.accessor === "dueDate") {
      return (
        <input
          type="date"
          name={col.accessor}
          className="border p-2 rounded"
          required
        />
      );
    }

    if (col.accessor === "status") {
      return (
        <select
          name={col.accessor}
          className="border p-2 rounded"
          required
        >
          <option value="">Select status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      );
    }

    if (col.accessor === "priority") {
      return (
        <select
          name={col.accessor}
          className="border p-2 rounded"
          required
        >
          <option value="">Select priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      );
    }

    if (col.accessor === "taskType") {
      return (
        <select
          name={col.accessor}
          className="border p-2 rounded"
          required
        >
          <option value="">Select type</option>
          <option value="UI/UX">UI/UX</option>
          <option value="Backend">Backend</option>
          <option value="Frontend">Frontend</option>
        </select>
      );
    }

    // default = text input
    return (
      <input
        type="text"
        name={col.accessor}
        className="border p-2 rounded"
        placeholder={`Enter ${col.header}`}
        required
      />
    );
  };

  return (
    <Sidebar isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Add Task</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {columns.map((col) => (
          <div key={col.accessor} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              {col.header}
            </label>
            {renderField(col)}
          </div>
        ))}

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </Sidebar>
  );
}
