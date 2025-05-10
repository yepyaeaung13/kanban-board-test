import { useState, useEffect } from "react";
import { useTaskStore } from "../store/taskStore";
import type { Task, TaskStatus } from "../types/task";

interface Props {
  onClose: () => void;
  existingTask?: Task | null;
}

export function TaskForm({ onClose, existingTask }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const updateTask = useTaskStore((state) => state.updateTask);

  const [dueDate, setDueDate] = useState<string>("");

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description || "");
      setStatus(existingTask.status);
      setDueDate(existingTask.dueDate || "");
    }
  }, [existingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (existingTask) {
      updateTask({ id: existingTask.id, title, description, status, dueDate });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-40 px-3 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 w-full max-w-md space-y-4 shadow"
      >
        <h2 className="text-xl font-bold text-blue-500">Edit Task</h2>

        <div className="">
          <label htmlFor="title" className="font-medium">
            Title
          </label>
          <input
            type="text"
            placeholder="Title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full border border-gray-400 rounded-lg px-2 py-1 outline-none focus:border-blue-500 duration-200"
            required
          />
        </div>

        <div>
          <label htmlFor="desc" className="font-medium">
            Description
          </label>
          <textarea
            placeholder="Description (optional)"
            id="desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full border border-gray-400 resize-none rounded-lg p-2 outline-none focus:border-blue-500 duration-200"
          />
        </div>

        <div className="flex gap-3">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
          className="w-1/2 border border-gray-400 rounded-lg p-2 outline-none cursor-pointer active:border-blue-500 duration-200"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-1/2 border border-gray-400 rounded-lg p-2 cursor-pointer outline-none active:border-blue-500 duration-200"
        />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-xl cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-xl cursor-pointer"
          >
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
}
