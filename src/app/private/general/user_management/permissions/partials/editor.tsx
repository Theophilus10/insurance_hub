"use client";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import { Button } from "@app/components/ui/button";
import React from "react";
import * as z from "zod";

const initialValues = {
  name: "",
};
const schema = z.object({
  name: z.string().min(1, "Name is required").min(3, "Name is too short"),
});

const editor = () => {
  return (
    <Form
      schema={schema}
      initialValues={initialValues}
      className="flex flex-col gap-6 w-full h-full px-2"
    >
      <InputField
        name="name"
        label="Permission Name"
        required
        placeholder="Enter permission name"
      />
      <div className="ml-auto flex gap-4">
        <Button label="Submit" variant="primary" type="submit"/>
        <Button label="Reset" variant="outline" type="button"/>
      </div>
    </Form>
  );
};

export default editor;
