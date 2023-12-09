import React from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import { Icon } from "@iconify/react";
import { nanoid } from "nanoid";
import { convertParam } from "@app/lib/utils";
import { useController, useFormContext } from "react-hook-form";
import IconifyIcon from "../icon";

interface DateInputProps {
  label: string;
  name: string;
  required?: boolean;
  helpText?: string;
  enableTime?: boolean;
  placeholder?: string;
  noCalendar?: boolean;
  dateFormat?: string;
  altFormat?: string;
  altInput?: boolean;
  minDate?: string;
  maxDate?: string;
  inline?: boolean;
  weekNumbers?: boolean;
  readonly?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  required,
  placeholder,
  name,
  enableTime = false,
  noCalendar = false,
  dateFormat = enableTime ? "d-m-Y H:i" : "d-m-Y",
  altFormat = enableTime ? "d-m-Y H:i" : "d-m-Y",
  altInput = true,
  weekNumbers = false,
  minDate = "",
  maxDate = "",
  inline = false,
  readonly = true,
  ...props
}) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name,
    control,
  });
  const pickerId = nanoid();
  const fullPickerId = `#${pickerId}`;

  const borderClass = fieldState.error
    ? "border-red-500"
    : fieldState.isDirty && !fieldState.error
    ? "border-green-500"
    : "border-gray-300";

  const flatpickrOptions = {
    // onChange: handleChange,
    minDate,
    enableTime,
    noCalendar,
    dateFormat,
    altFormat,
    weekNumbers,
    maxDate,
    inline,
    element: fullPickerId,
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-gray-800 font-light">
        {label}
        {required && <span className="text-red-500 pl-1">*</span>}
      </label>
      <Flatpickr
        placeholder={placeholder || "Date..."}
        name={name}
        value={field.value}
        options={flatpickrOptions}
        onChange={(selectedDates: Date[], event: any) =>
          field.onChange(convertParam(event, selectedDates, name))
        }
        // onChange={(e: Date[]) => console.log(e)}
        className={`p-2 rounded-[5px] text-black border ${borderClass} shadow-sm`}
        {...props}
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

export default DateInput;
