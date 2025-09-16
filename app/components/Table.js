"use client";
import { useState } from "react";

export default function Table({ columns, data, onUpdate }) {
  const [editingCell, setEditingCell] = useState(null); // {rowIndex, accessor}
  const [editValue, setEditValue] = useState("");

  const handleDoubleClick = (rowIndex, accessor, currentValue) => {
    setEditingCell({ rowIndex, accessor });
    setEditValue(currentValue);
  };

  const handleBlur = () => {
    if (editingCell) {
      onUpdate(editingCell.rowIndex, editingCell.accessor, editValue);
      setEditingCell(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      setEditingCell(null);
    }
  };

    // render special inputs based on column type
  const renderInput = (col, value) => {
    const safeValue = editValue ?? ""; // always fallback to empty string

    if (col.accessor === "status") {
      return (
        <select
          value={safeValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          className="w-full border rounded px-2 py-1 text-sm focus:outline-none"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      );
    }

    if (col.accessor === "priority") {
      return (
        <select
          value={safeValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          className="w-full border rounded px-2 py-1 text-sm focus:outline-none"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      );
    }

    if (col.accessor === "dueDate") {
      return (
        <input
          type="date"
          value={safeValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          className="w-full border rounded px-2 py-1 text-sm focus:outline-none"
        />
      );
    }

    if (col.accessor === "description") {
      return (
        <textarea
          value={safeValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          className="w-full border rounded px-2 py-1 text-sm focus:outline-none resize-none"
          rows={2}
        />
      );
    }

    // default = text input
    return (
      <input
        type="text"
        value={safeValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
        className="w-full border rounded px-2 py-1 text-sm focus:outline-none"
      />
    );
  };


  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 divide-y divide-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => {
                  const isEditing =
                    editingCell?.rowIndex === rowIndex &&
                    editingCell?.accessor === col.accessor;

                  return (
                    <td
                      key={colIndex}
                      className="border border-gray-300 px-4 py-2 text-sm text-gray-800"
                      onDoubleClick={() =>
                        handleDoubleClick(
                          rowIndex,
                          col.accessor,
                          row[col.accessor]
                        )
                      }
                    >
                      {isEditing
                        ? renderInput(col, row[col.accessor])
                        : row[col.accessor]}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
