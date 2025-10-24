"use client";

import { createServiceAction } from "@/actions/service";
import { deleteFileByNameAction, uploadFile } from "@/actions/file";
import {
  useActionState,
  startTransition,
  useRef,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceFormSchema } from "@/validations/service";
import { IService } from "@/definitions/service";
import { motion } from "framer-motion";
import InputValidated from "@/components/ui/input-validated";
import Textarea from "@/components/ui/textarea-validated";
import { getCategories } from "@/services/category";
import { ICategory } from "@/definitions/category";

interface CategoryOption {
  id: string;
  name: string;
}

export default function ServiceAddForm({
  service,
  onClose,
}: {
  service: IService | null;
  onClose: () => void;
}) {
  const serviceId = service?.id || "";
  const formRef = useRef<HTMLFormElement>(null);
  const initialState = { message: "", errors: {} };
  const [categories, setCategories] = useState<CategoryOption[]>([]);

  const createServiceActionWithId = createServiceAction.bind(null, serviceId);
  const [state, formAction, isPending] = useActionState(
    createServiceActionWithId,
    initialState
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      name: service?.name || "",
      description: service?.description || "",
      duration: service?.duration || 0,
      imageUrl: service?.imageUrl || "",
      categoryId: service?.categoryId || "",
      isActive: service?.isActive ?? true,
    },
  });

  // Fetch existing categories
  useEffect(() => {
    async function fetchCategories() {
      const res = await getCategories();
      if (res?.success) {
        setCategories(
          res.data.map((c: ICategory) => ({ id: c.id, name: c.name }))
        );
      }
    }
    fetchCategories();
  }, []);

  const onSubmit = handleSubmit(async () => {
    const formData = new FormData(formRef.current!);

    // File upload
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
      if (service?.imageUrl) await deleteFileByNameAction(service.imageUrl);
      formData.append("imageUrl", filename);
    } else if (service?.imageUrl) {
      formData.append("imageUrl", service.imageUrl);
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
        {serviceId ? "Edit Service" : "Add Service"}
      </h2>

      <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-4">
        <InputValidated
          name="name"
          label="Service Name"
          placeholder="e.g. Haircut"
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

        <InputValidated
          name="duration"
          type="number"
          label="Duration (minutes)"
          placeholder="e.g. 30"
          register={register}
          errors={errors}
          isPending={isPending}
        />

        {/* Category dropdown */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Category
          </label>
          <select
            {...register("categoryId")}
            className="w-full rounded-md border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
            defaultValue={service?.categoryId || ""}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-red-500 text-xs mt-1">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Status</label>
          <select
            {...register("isActive")}
            className="w-full rounded-md border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
            defaultValue={service?.isActive ? "true" : "false"}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Upload Image
          </label>
          {service?.imageUrl && (
            <img
              src={`/api/files/${service.imageUrl}`}
              alt={service.name}
              className="w-20 h-20 rounded border mb-1 object-cover"
            />
          )}
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            className="w-full rounded-md border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition"
        >
          {serviceId ? "Update Service" : "Add Service"}
        </button>
      </form>
    </motion.div>
  );
}
