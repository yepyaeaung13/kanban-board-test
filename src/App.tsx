import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { TaskColumn } from "./components/TaskColumn";
import { useTaskStore } from "./store/taskStore";
import type { TaskStatus } from "./types/task";
import { TaskForm } from "./components/TaskForm";
import { useState } from "react";

function App() {
  const tasks = useTaskStore((state) => state.tasks);
  const moveTask = useTaskStore((state) => state.moveTask);
  const [showForm, setShowForm] = useState(false);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      moveTask(active.id as string, over.id as TaskStatus); // over.id is the new status
    }
  };

  return (
    <div className="max-h-screen max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-10 text-center space-x-2">
        📝 <i className="text-blue-400">Kanban</i>
        <i className="text-blue-500">Task</i>
        <i className="text-green-400">Board</i>
      </h1>
      <DndContext onDragEnd={onDragEnd}>
        {showForm && <TaskForm onClose={() => setShowForm(false)} />}

        <div className="flex flex-col md:flex-row gap-5 justify-center">
          <TaskColumn
            title="To Do"
            status="todo"
            tasks={tasks.filter((t) => t.status === "todo")}
            className={"bg-blue-200"}
            btnColor="bg-blue-300"
          />
          <TaskColumn
            title="In Progress"
            status="in-progress"
            tasks={tasks.filter((t) => t.status === "in-progress")}
            className="bg-blue-300"
            btnColor="bg-blue-400"
          />
          <TaskColumn
            title="Done"
            status="done"
            tasks={tasks.filter((t) => t.status === "done")}
            className="bg-green-200"
            btnColor="bg-green-300"
          />
        </div>
      </DndContext>
    </div>
  );
}

export default App;
