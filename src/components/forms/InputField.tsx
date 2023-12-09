"use client";
import React from "react";
import { useController, useFormContext } from "react-hook-form";
import IconifyIcon from "../icon";

interface TextInputProps {
  label: string;
  name: string;
  required?: boolean;
  type?: "text" | "number" | "search" | "tel" | "email" | "password";
  placeholder?: string;
  helpText?: string;
}

const InputField: React.FC<TextInputProps> = ({
  label,
  name,
  required,
  helpText,
  type = "text",
  placeholder,
  ...props
}) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name,
    control,
  });

  // const didFocus = fieldState.isDirty;

  // useEffect(() => {
  //   // console.log(name);
  //   console.log(formState.errors);
  //   console.log(name, fieldState.error);
  //   console.log('formDirty', formState.isDirty);
  // }, [fieldState]);

  // const borderClass = fieldState.isTouched
  //   ? fieldState.error
  //     ? "border-red-500"
  //     : "border-green-500"
  //   : "border-gray-300";

  const borderClass = fieldState.error
    ? "border-red-500"
    : fieldState.isDirty && !fieldState.error
    ? "border-green-500"
    : "border-gray-300";
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-thin text-gray-600">
        {label}
        {required && <span className="text-red-500 pl-1">*</span>}
      </label>
      <input
        {...props}
        {...field}
        placeholder={placeholder}
        type={type}
        className={`p-2 rounded-[5px] text-black border ${borderClass} shadow-sm`}
        // onChange={(e) => field.onChange(e.target.value)}
      />
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
