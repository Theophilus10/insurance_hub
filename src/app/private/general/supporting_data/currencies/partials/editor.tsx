"use client";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import SelectField from "@app/components/forms/SelectField";
import { Button } from "@app/components/ui/button";
import React, { useEffect } from "react";
import * as z from "zod";

const initialValues = {
  country: "",
  code: "",
};
const schema = z.object({
  // name: z
  //   .string()
  //   .min(1, "Name is ")
  //   .min(3, "Enter a valid name")
  //   .max(7, "Name too long"),
  // email: z.string().min(1, "Email is ").email(),
  // gender: z.string().min(1, "Gender is "),
  // dob: z.string().min(1, "Date of Birth is "),
});

const Editor = ({ prevalues }:any) => {

  // useEffect(()=>{
  //   if (prevalues)
  // })

  return (
    <Form
      schema={schema}
      initialValues={prevalues ||  initialValues}
      className="flex flex-col gap-6 w-full h-full px-2"
    >
      <div className="grid grid-cols-2 gap-4">
        <InputField name="currency" label="Currency Name" type="text" />
        <InputField name="code" label="Country Code" type="text" />
        <InputField name="symbol" label="Currency Symbol" type="text" />
        <InputField name="exchangeRate" label="Exchange Rate" type="number" />
      </div>
      <div className="ml-auto flex gap-4">
        <Button label="Submit" variant="primary" />
        <Button label="Reset" variant="outline" />
      </div>
    </Form>
  );
};

export default Editor;
