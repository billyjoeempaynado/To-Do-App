"use client";
import { useState, useRef, useEffect } from "react";

export default function Table({ columns, data, onUpdate }) {
  const [editingCell, setEditingCell] = useState(null); // {rowIndex, accessor}
  const [editValue, setEditValue] = useState("");

  const handleClick = (rowIndex, accessor, currentValue) => {
    setEditingCell({ rowIndex, accessor });
    setEditValue(currentValue ?? "");
  };

  const handleBlur = () => {
    if (editingCell) {
      const { rowIndex, accessor } = editingCell;
      onUpdate(rowIndex, accessor, editValue);
      setEditingCell(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleBlur();
    else if (e.key === "Escape") setEditingCell(null);
  };

  const renderInput = (col) => {
    const safeValue = editValue ?? "";
    const baseClasses =
      "w-full px-1 py-0.5 text-sm border border-blue-400 rounded focus:outline-none";

    if (col.accessor === "status") {
      return (
        <select
          value={safeValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          className={baseClasses}
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
          className={baseClasses}
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
          className={baseClasses}
        />
      );
    }

    if (col.accessor === "description") {
      const textareaRef = useRef(null);

      useEffect(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
          textareaRef.current.style.height =
            textareaRef.current.scrollHeight + "px";
        }
      }, [editValue]);

      return (
        <textarea
          ref={textareaRef}
          value={safeValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          className={`${baseClasses} resize-none overflow-hidden`}
          rows={1}
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
        className={baseClasses}
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
                      className="border border-gray-300 px-4 py-2 text-sm text-gray-800 relative group"
                      onClick={() =>
                        handleClick(rowIndex, col.accessor, row[col.accessor])
                      }
                    >
                      <span
                        className={`block ${
                          !isEditing
                            ? "group-hover:bg-gray-100 cursor-pointer"
                            : ""
                        }`}
                      >
                        {row[col.accessor]}
                      </span>

                      {isEditing && (
                        <div className="absolute inset-0 z-10 flex items-center px-1 bg-white">
                          {renderInput(col)}
                        </div>
                      )}
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
