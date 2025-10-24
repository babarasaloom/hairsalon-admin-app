"use client";

import { UseFormRegister } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  register: UseFormRegister<any>;
  errors?: Record<string, any>;
  isPending?: boolean;
  stateError?: Record<string, any>;
}

export default function InputValidated({
  name,
  label,
  placeholder,
  type = "text",
  register,
  errors,
  isPending,
  stateError,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name} className="font-medium text-gray-800">
        {label}
      </label>
      <input
        id={name}
        type={type}
        disabled={isPending}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full rounded-md border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 transition
          ${isPending ? "bg-gray-100" : "bg-white"}`}
      />
      {(errors?.[name] || stateError?.[name]) && (
        <p className="text-sm text-red-500">
          {errors?.[name]?.message || stateError?.[name]}
        </p>
      )}
    </div>
  );
}
