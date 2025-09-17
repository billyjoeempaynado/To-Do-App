// services/taskService.js
import * as api from "../utils/api";

// Tasks CRUD
export function fetchTasks() {
  return api.get("tasks");
}

export function addTask(task) {
  return api.post("tasks", task);
}

export function updateTask(id, updates) {
  return api.patch(`tasks/${id}`, updates);
}

export function deleteTask(id) {
  return api.del(`tasks/${id}`);
}

// Dropdowns
export function fetchStatuses() {
  return api.get("statuses");
}

export function fetchPriorities() {
  return api.get("priorities");
}

export function fetchTaskTypes() {
  return api.get("task-types");
}
