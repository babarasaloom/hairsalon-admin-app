"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useActionState, startTransition, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, ArrowLeft, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

import { createServiceAction } from "@/actions/service";
import { deleteFileByNameAction, uploadFile } from "@/actions/file";
import { serviceFormSchema } from "@/validations/service";
import { IService } from "@/definitions/service";
import InputValidated from "@/components/ui/input-validated";
import Textarea from "@/components/ui/textarea-validated";
import SelectValidated from "@/components/ui/select-validated";
import { serviceInputFormData } from "@/constants/service";

export default function ServiceAddForm({
  categories,
  service,
  onClose,
}: {
  categories: { id: string; name: string }[];
  service: IService | null;
  onClose: () => void;
}) {
  const router = useRouter();
  const serviceId = service?.id || "";
  const formRef = useRef<HTMLFormElement>(null);
  const initialState = { message: "", errors: {} };

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
    <div className="fixed inset-0 bg-black/40 flex justify-center items-end sm:items-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 80 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:w-[440px] max-h-[95vh] overflow-y-auto shadow-lg"
      >
        {/* --- Hero Section --- */}
        <div className="relative h-52 w-full rounded-t-2xl overflow-hidden">
          <Image
            src={
              service?.imageUrl
                ? `/api/files/${service.imageUrl}`
                : "/placeholder.jpg"
            }
            alt={service?.name || "Service Image"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Info Overlay */}
          <div className="absolute bottom-5 left-4 text-white">
            <h1 className="text-xl font-bold">
              {service?.name || "New Service"}
            </h1>
            {service?.duration && (
              <p className="text-sm text-yellow-300">
                Duration: {service.duration} mins
              </p>
            )}
          </div>

          {/* Hero Buttons */}
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 bg-white/80 backdrop-blur-md p-2 rounded-full shadow"
          >
            <ArrowLeft className="w-5 h-5 text-gray-800" />
          </button>
          <button className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow">
            <Heart className="w-5 h-5 text-red-500" />
          </button>
        </div>

        {/* --- Form Section --- */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {serviceId ? "Edit Service" : "Add Service"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="flex flex-col gap-4"
          >
            {serviceInputFormData.map((i) => (
              <InputValidated
                key={i.name}
                {...i}
                register={register}
                errors={errors}
                isPending={isPending}
                stateError={state?.errors}
              />
            ))}

            <Textarea
              label="Description"
              name="description"
              register={register}
              errors={errors}
            />

            {/* Category dropdown */}
            <SelectValidated
              label="Category"
              name="categoryId"
              register={register}
              errors={errors}
              options={categories.map((cat) => ({
                _id: cat.id!,
                name: cat.name,
              }))}
            />

            {/* Status */}
            <SelectValidated
              label="Status"
              name="isActive"
              register={register}
              errors={errors}
              options={[
                { _id: "true", name: "Active" },
                { _id: "false", name: "Inactive" },
              ]}
            />

            {/* Image upload */}
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

            <div className="flex justify-end gap-2 pt-2 border-t mt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className={`px-4 py-2 rounded-lg text-white ${
                  isPending
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-900 hover:bg-gray-800"
                }`}
              >
                {isPending ? "Saving..." : serviceId ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
