"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  itemName: string;
}

export default function DeleteModal({
  isOpen,
  onCancel,
  onConfirm,
  itemName,
}: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <h3 className="text-lg font-semibold mb-2">Delete Staff</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete <b>{itemName}</b>?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
