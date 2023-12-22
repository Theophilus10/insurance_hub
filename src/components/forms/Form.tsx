"use client";
import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnyZodObject } from "zod";

type FormValues = Record<string, any>;

interface FormProps {
  initialValues?: FormValues;
  children?: React.ReactNode;
  onSubmit?: (values: FormValues) => void;
  onChange?: (values: FormValues, isValid: boolean) => void;
  schema: AnyZodObject;
  className?: string;
}

const Form: React.FC<FormProps> = ({
  initialValues,
  children,
  onSubmit,
  onChange,
  className,
  schema,
}) => {
  const methods = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
  });

  const { handleSubmit, formState, watch, reset } = methods;

  const onSubmitHandler = (data: FormValues) => {
    if (onSubmit) onSubmit(data);
  };

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);
  const handleChange = () => {
    const values = watch();
    if (onChange) onChange(values, formState.isValid);
  };

  // React.useEffect(() => {
  //   handleChange(); // Trigger initial handleChange to reflect form state
  // }, [handleChange]);

  const childArray = React.Children.toArray(children);

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={handleSubmit(onSubmitHandler)}
        onChange={handleChange}
        onReset={reset}
      >
        {Array.isArray(childArray) ? (
          childArray.map((child, index) => (
            <React.Fragment key={index}>{child}</React.Fragment>
          ))
        ) : (
          <React.Fragment>{childArray}</React.Fragment>
        )}
      </form>
    </FormProvider>
  );
};

export default Form;
