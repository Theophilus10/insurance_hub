"use client";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import TextAreaField from "@app/components/forms/TextAreaField";
import SelectField from "@app/components/forms/SelectField";
import { Button } from "@app/components/ui/button";
import React, { useEffect } from "react";
import * as z from "zod";

const initialValues = {
  code: "",
  description: "",
  minAmount: "",
  maxAmount: "",
  fireRate: "",
  collapseRate: "",
  publicLiabilityRate: "",
  startDate: "",
  endDate: "",
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

const Editor = ({ prevalues }: any) => {
  // useEffect(()=>{
  //   if (prevalues)
  // })

  return (
    <Form
      schema={schema}
      initialValues={prevalues || initialValues}
      className="flex flex-col gap-6 w-full h-full px-2"
    >
      <div className="grid grid-cols-2 gap-4">
        <span className="col-span-2">
          <TextAreaField
            name="description"
            label="Description"
            rows={2}
            className=""
          />
        </span>
        <InputField name="minAmount" label="Minimum Amount" type="number" />
        <InputField name="maxAmount" label="maximum Amount" type="number" />
        <span className="col-span-2">
          <InputField
            name="fireRate"
            label="Fire Rate"
            type="number"
            className=""
          />
        </span>
        <InputField name="publicLiabilityRate" label="Public Liability Rate" type="number" />
        <InputField name="collapseRate" label="Collapse Rate" type="number" />
        <InputField name="startDate" label="Start Date" type="date" />
        <InputField name="endDate" label="End Date" type="date" />
      </div>
      <div className="ml-auto flex gap-4">
        <Button label="Submit" variant="primary" />
        <Button label="Reset" variant="outline" />
      </div>
    </Form>
  );
};

export default Editor;
