"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IStaff } from "@/definitions/staff";
import { ICategory } from "@/definitions/category";

import { StaffHeader } from "./header";
import StaffModal from "./modal";
import StaffAddForm from "./add-form";
import { StaffList } from "./list";
import DeleteModal from "./delete-modal";

import { getStaff } from "@/services/staff";
import { deleteStaffAction } from "@/actions/staff";

interface Props {
  initialStaff: IStaff[];
  categories: ICategory[];
}

export function StaffClientPage({ initialStaff, categories }: Props) {
  const [staff, setStaff] = useState<IStaff[]>(initialStaff);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<IStaff | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingStaff, setDeletingStaff] = useState<IStaff | null>(null);

  const handleAdd = () => {
    setEditingStaff(null);
    setIsModalOpen(true);
  };

  const handleEdit = (person: IStaff) => {
    setEditingStaff(person);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (person: IStaff) => {
    setDeletingStaff(person);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingStaff) return;
    const res = await deleteStaffAction(
      deletingStaff.id || "",
      deletingStaff.avatarUrl || ""
    );
    if (res?.success) {
      setStaff((prev) => prev.filter((s) => s.id !== deletingStaff.id));
    }
    setIsDeleteOpen(false);
    setDeletingStaff(null);
  };

  const fetchStaff = async () => {
    const res = await getStaff();
    if (res?.success) setStaff(res.data || []);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <StaffHeader onAdd={handleAdd} />

      <StaffList
        initialStaff={staff}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {/* Add/Edit Modal */}
      <StaffModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <StaffAddForm
          staff={editingStaff}
          onClose={() => {
            setIsModalOpen(false);
            fetchStaff();
          }}
        />
      </StaffModal>

      <DeleteModal
        isOpen={isDeleteOpen}
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={deletingStaff?.name || ""}
      />
    </motion.div>
  );
}
