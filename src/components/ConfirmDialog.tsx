interface Props {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  }
  
  export function ConfirmDialog({ message, onConfirm, onCancel }: Props) {
    return (
      <div className="fixed inset-0 bg-black/30 bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-sm space-y-4 shadow">
          <p className="text-center text-gray-700">{message}</p>
          <div className="flex justify-center gap-4 mt-5">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
  