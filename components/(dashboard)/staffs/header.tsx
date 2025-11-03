"use client";

interface Props {
  onAdd: () => void;
}

export function StaffHeader({ onAdd }: Props) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-xl font-semibold text-gray-800">Staff</h1>
      <button
        onClick={onAdd}
        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
      >
        + Add Staff
      </button>
    </div>
  );
}
