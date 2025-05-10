import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { TaskColumn } from "./components/TaskColumn";
import { useTaskStore } from "./store/taskStore";
import type { Task, TaskStatus } from "./types/task";
import { useState } from "react";
import { TaskCard } from "./components/TaskCard";

function App() {
  const tasks = useTaskStore((state) => state.tasks);
  const moveTask = useTaskStore((state) => state.moveTask);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const onDragStart = (event: DragStartEvent) => {
    const taskId = event.active.id as string;
    const task = tasks.find((t) => t.id === taskId);
    if (task) setActiveTask(task);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null); // clear overlay

    if (!over || !active?.data?.current) return;

    const fromColumn = active.data.current.fromColumn as TaskStatus;
    const toColumn = over.id as TaskStatus;

    if (fromColumn !== toColumn) {
      moveTask(active.id as string, toColumn);
    }
  };

  return (
    <div className="max-h-screen max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-10 text-center space-x-2">
        📝 <i className="text-blue-400">Kanban</i>
        <i className="text-blue-500">Task</i>
        <i className="text-green-400">Board</i>
      </h1>
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
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
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default App;
