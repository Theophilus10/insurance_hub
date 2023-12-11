"use client";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import { Button } from "@app/components/ui/button";
import React from "react";
import * as z from "zod";

const initialValues = {
  name: "",
  code: "",
};
const schema = z.object({
  name: z.string().min(1, "Name is required").min(3, "Enter a valid name"),
  code: z.string().min(1, "Code is required"),
});

const editor = () => {
  return (
    <Form
      schema={schema}
      initialValues={initialValues}
      className="flex flex-col gap-6 w-full h-full px-2"
    >
      <InputField
        name="code"
        label="Code"
        type="text"
        placeholder="Enter occupation code"
      />
      <InputField
        name="name"
        label="Occupation Name"
        type="text"
        placeholder="Enter occupation name"
      />
      <div className="ml-auto flex gap-4">
        <Button label="Submit" variant="primary" />
        <Button label="Reset" variant="outline" />
      </div>
    </Form>
  );
};

export default editor;
