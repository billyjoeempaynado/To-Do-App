
export async function fetchTasks() {
  return [
    { id: 1, taskName: "Design Homepage", status: "In Progress", assignee: "John Doe" },
    { id: 2, taskName: "API Setup", status: "Pending", assignee: "Jane Smith" }
  ];
}

export async function addTask(task) {
  return { ...task, id: Date.now() }; // later → POST request
}

export async function updateTask(id, updates) {
  return { id, ...updates }; // later → PATCH request
}

export async function deleteTask(id) {
  return true; // later → DELETE request
}
