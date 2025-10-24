"use client";

import { createCategoryAction } from "@/actions/category";
import { deleteFileByNameAction, uploadFile } from "@/actions/file";
import { SubmitButton } from "@/components/ui/buttons";
import InputValidated from "@/components/ui/input-validated";
import Textarea from "@/components/ui/textarea-validated";
import { CategoryForm, categoryFormSchema } from "@/validations/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, startTransition, useRef } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CategoryAddForm({
  category,
  onClose,
}: {
  category: any;
  onClose: () => void;
}) {
  const initialState = { message: "", errors: {} };
  const categoryId = category?.id || "";

  const createCategoryActionWithId = createCategoryAction.bind(
    null,
    categoryId
  );
  const [state, formAction, isPending] = useActionState(
    createCategoryActionWithId,
    initialState
  );

  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
      imageUrl: category?.imageUrl || "",
      isPublished: category?.status || "active",
    },
  });

  const onSubmit = handleSubmit(async () => {
    const formData = new FormData(formRef.current!);

    // Handle file upload
    const fileInput = document.querySelector<HTMLInputElement>(
      'input[name="imageFile"]'
    );
    let filename = "";

    if (fileInput?.files?.[0]) {
      const uploadData = new FormData();
      uploadData.append("file", fileInput.files[0]);
      const res = await uploadFile(uploadData);
      if (res.success) filename = res.filename || "";
    }

    if (filename) {
      if (category && category.imageUrl)
        await deleteFileByNameAction(category.imageUrl);
      formData.append("imageUrl", filename);
    } else if (category.imageUrl) {
      formData.append("imageUrl", category.imageUrl);
    }

    startTransition(() => {
      formAction(formData);
      onClose();
    });
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 80 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl w-full sm:w-[420px] p-6 shadow-lg"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {categoryId ? "Edit Category" : "Add Category"}
      </h2>

      <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-4">
        <InputValidated
          name="name"
          label="Category Name"
          placeholder="e.g. Haircuts"
          register={register}
          errors={errors}
          isPending={isPending}
          stateError={state?.errors}
        />

        <Textarea
          label="Description"
          name="description"
          register={register}
          errors={errors}
        />

        {/* STATUS SELECT */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Status</label>
          <select
            {...register("isPublished")}
            className="w-full rounded-md border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Upload Image
          </label>
          {category && category.imageUrl && (
            <Image
              src={`/api/files/${category.imageUrl}`}
              alt={category.name}
              width={60}
              height={60}
              className="rounded border border-gray-300 mb-1"
            />
          )}
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            className="w-full rounded-md border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
          />
        </div>

        <SubmitButton
          name={categoryId ? "Update Category" : "Add Category"}
          isPending={isPending}
        />
      </form>
    </motion.div>
  );
}
