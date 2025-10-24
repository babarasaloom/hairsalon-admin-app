"use client";

import { Loader2 } from "lucide-react";

export function SubmitButton({
  name,
  isPending,
}: {
  name: string;
  isPending: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className={`w-full flex justify-center items-center gap-2 rounded-md px-4 py-2 font-semibold text-white transition
        ${
          isPending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gray-800 hover:bg-gray-900"
        }`}
    >
      {isPending && <Loader2 size={18} className="animate-spin" />}
      {isPending ? "Processing..." : name}
    </button>
  );
}
