"use client";
import React, { ChangeEvent } from "react";
import { useController, useFormContext } from "react-hook-form";
import IconifyIcon from "../icon";

interface TextInputProps {
  label: string;
  name: string;
  required?: boolean;
  type?:
    | "text"
    | "number"
    | "search"
    | "tel"
    | "email"
    | "password"
    | "date"
    | "file";
  placeholder?: string;
  helpText?: string;
  disabled?: boolean;
  value?: any;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<TextInputProps> = ({
  label,
  name,
  required,
  helpText,
  type = "text",
  placeholder,
  disabled = false,
  value = "",
  className,

  ...props
}) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name,
    control,
  });

  const borderClass = fieldState.error
    ? "border-red-500"
    : fieldState.isDirty && !fieldState.error
    ? "border-green-500"
    : "border-gray-300";

  const inputFieldValue =
    type === "number" ? parseFloat(field.value || value) : field.value || value;
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-light ">
        {label}
        {required && <span className="text-red-500 pl-1">*</span>}
      </label>
      <input
        {...props}
        {...field}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        value={inputFieldValue}
        className={`h-[38px] px-2 rounded-[5px] text-black border ${borderClass} shadow-sm ${className}`}
      />
      {helpText && <span className="text-sm text-gray-500">{helpText}</span>}
      {fieldState.error && (
        <label className="text-red-500 flex items-center gap-1 text-sm pt-1">
          <IconifyIcon icon="solar:danger-circle-bold-duotone" fontSize={15} />
          {fieldState.error.message?.toString()}
        </label>
      )}
    </div>
  );
};

export default InputField;
