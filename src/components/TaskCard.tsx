import { useDraggable } from "@dnd-kit/core";
import type { Task } from "../types/task";
import IconEdit from "./icons/IconEdit";
import IconDelete from "./icons/IconDelete";

interface Props {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
}

export function TaskCard({ task, onEdit, onDelete }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className="bg-white shadow-lg p-3 rounded-lg mb-2 border border-gray-200 relative"
    >
      <div
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
        title="Drag"
      >
        <h4 className="font-semibold">{task.title}</h4>
        {task.description && (
          <p className="text-sm text-gray-600">{task.description}</p>
        )}
        {task.dueDate && (
          <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
        )}
      </div>

      <div className="absolute top-3 right-3 flex gap-4">
        <button
          onClick={() => onEdit?.(task)}
          className="text-xs text-blue-500 hover:underline cursor-pointer"
        >
          <IconEdit />
        </button>
        <button
          onClick={() => {
            onDelete?.(task);
          }}
          className="z-50 text-xs text-red-500 active:scale-90 duration-200 cursor-pointer"
        >
          <IconDelete />
        </button>
      </div>
    </div>
  );
}
