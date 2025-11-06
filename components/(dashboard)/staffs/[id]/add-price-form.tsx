"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useActionState, startTransition, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { artistPriceFormSchema } from "@/validations/artist-price";
import { IService } from "@/definitions/service";
import { IArtistPrice } from "@/definitions/artist-price";
import { saveArtistPriceAction } from "@/actions/artist-price";
import InputValidated from "@/components/ui/input-validated";
import { addPriceInputFormData } from "@/constants/staff";
import { useRouter } from "next/navigation";

interface Props {
  service: IService;
  artistPrice?: Partial<IArtistPrice>;
  onClose: () => void;
}

export default function AddArtistPriceForm({
  service,
  artistPrice = {},
  onClose,
}: Props) {
  // Determine if editing or creating
  const isEditing = !!artistPrice?.id;

  const formRef = useRef<HTMLFormElement>(null);
  const initialState = { message: "", errors: {} };
  const router = useRouter();

  const saveAction = saveArtistPriceAction.bind(
    null,
    service.id!,
    artistPrice.staffId!,
    artistPrice.id || "" // pass null if creating
  );

  const [state, formAction, isPending] = useActionState(
    saveAction,
    initialState
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(artistPriceFormSchema),
    defaultValues: { price: artistPrice.price || "" },
  });

  const onSubmit = handleSubmit(async () => {
    const formData = new FormData(formRef.current!);

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
      className="relative bg-white rounded-t-2xl sm:rounded-2xl pb-2 md:pb-0 w-full sm:w-[440px] max-h-[95vh] overflow-y-auto shadow-lg"
    >
      {/* Service Preview */}
      <div className="relative h-142 md:h-132 w-full rounded-t-2xl overflow-hidden">
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
        <div className="absolute bottom-5 left-4 text-white">
          <h1 className="text-xl font-bold">{service?.name}</h1>
          {service?.duration && (
            <p className="text-sm text-yellow-300">
              Duration: {service.duration} mins
            </p>
          )}
        </div>
      </div>

      {/* Form Section */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {isEditing ? "Edit Price" : "Add Price"}
          </h2>
          <button
            onClick={onClose}
            type="button"
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-4">
          {addPriceInputFormData.map((input) => (
            <InputValidated
              key={input.name}
              {...input}
              register={register}
              errors={errors}
              isPending={isPending}
              stateError={state?.errors}
            />
          ))}

          <div className="flex justify-end gap-2 pt-2 border-t mt-2">
            <button
              type="submit"
              disabled={isPending}
              className={`px-4 py-2 rounded-lg text-white w-full ${
                isPending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-900 hover:bg-gray-800"
              }`}
            >
              {isPending
                ? "Saving..."
                : isEditing
                ? "Update Price"
                : "Add Price"}
            </button>
          </div>

          {state?.message && (
            <p className="text-center text-gray-600 text-sm mt-2">
              {state.message}
            </p>
          )}
        </form>
      </div>
    </motion.div>
  );
}
