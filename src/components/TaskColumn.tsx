import { useDroppable } from "@dnd-kit/core";
import type { Task } from "../types/task";
import { TaskCard } from "./TaskCard";
import { useState } from "react";
import { TaskForm } from "./TaskForm";
import { ConfirmDialog } from "./ConfirmDialog";
import { useTaskStore } from "../store/taskStore";
import { clsx } from "clsx";
import IconPlus from "./icons/IconPlus";
import IconCalendar from "./icons/IconCalendar";
import IconClose from "./icons/IconClose";

interface Props {
  title: string;
  status: Task["status"];
  tasks: Task[];
  className: string;
  btnColor: string;
}

export function TaskColumn({
  title,
  status,
  tasks,
  className,
  btnColor,
}: Props) {
  const { setNodeRef } = useDroppable({ id: status });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [filterDue, setFilterDue] = useState<string>(""); // YYYY-MM-DD
  const [showForm, setShowForm] = useState<boolean>(false);
  const {addTask, deleteTask} = useTaskStore((state) => state);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    addTask({ title, description, status, dueDate: "" });
    setShowForm(false);
  }

  return (
    <div className={clsx("w-full md:w-80 inline-flex flex-col")}>
      <div className={clsx("p-4 rounded-xl shadow-xl", className)}>
        <div className="flex justify-between items-center">
          <h2 className={clsx("text-lg font-bold mb-4")}>{title}</h2>
          <div className="flex gap-4 mb-4">
            <label
              htmlFor="due-date"
              className=" bg-white/50 py-1 px-2 rounded-xl flex gap-1.5 cursor-pointer text-sm"
            >
              Filter <IconCalendar />
            </label>
            <input
              type="date"
              id="due-date"
              value={filterDue}
              onChange={(e) => setFilterDue(e.target.value)}
              className="hidden rounded-lg px-3 py-1"
            />
          </div>
        </div>
        <div
          ref={setNodeRef}
          className={clsx(
            "max-h-96 overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-thin pr-2 mb-2"
          )}
        >
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={setEditingTask}
              onDelete={setDeletingTask}
            />
          ))}

          {editingTask && (
            <TaskForm
              existingTask={editingTask}
              onClose={() => setEditingTask(null)}
            />
          )}

          {deletingTask && (
            <ConfirmDialog
              message={`Are you sure you want to delete "${deletingTask.title}"?`}
              onConfirm={() => {
                deleteTask(deletingTask.id);
                setDeletingTask(null);
              }}
              onCancel={() => setDeletingTask(null)}
            />
          )}
        </div>

        {showForm ? (
          <form onSubmit={handleSubmit} className="space-y-2 mt-5">
            <input
              type="text"
              name="title"
              autoFocus
              placeholder="Enter a title"
              className="bg-white w-full rounded-lg px-2 py-1 border border-white/50 outline-none focus:border-blue-500 placeholder:text-sm"
            />
            <textarea
              name="description"
              id=""
              placeholder="Enter a description"
              className="bg-white w-full resize-none rounded-lg px-2 py-1 border border-white/50 outline-none focus:border-blue-500 placeholder:text-sm"
            ></textarea>
            <div className="flex gap-5">
              <button
                className={clsx(
                  "px-4 py-1 rounded-lg cursor-pointer",
                  btnColor
                )}
              >
                Add card
              </button>
              <button  onClick={() => setShowForm(false)} className="cursor-pointer">
                <IconClose />
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className={clsx(
              "w-1/2 p-1.5 rounded-xl flex gap-1.5 items-center cursor-pointer",
              btnColor
            )}
          >
            <IconPlus /> Add a card
          </button>
        )}
      </div>
    </div>
  );
}
