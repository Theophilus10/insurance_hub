"use client";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import SelectField from "@app/components/forms/SelectField";
import { Button } from "@app/components/ui/button";
import React, { useEffect } from "react";
import * as z from "zod";

const initialValues = {
  excess: "",
  riskClass: "",
  rate: "",
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
  useEffect(()=>{
    if (prevalues){
      
    }
  },[prevalues])

  return (
    <Form
      schema={schema}
      initialValues={prevalues || initialValues}
      className="flex flex-col gap-6 w-full h-full px-2"
    >
      <div className="grid gap-4">
        <SelectField
          name="excess"
          label="Select Excess"
          required
          options={[]}
        />
        <SelectField
          name="riskClass"
          label="Select Risk Class"
          required
          options={[]}
        />
        <InputField name="rate" label="Rate" type="number" />
        {/* dates */}
        <div className="grid grid-cols-2 gap-4">
          {/* start date */}
          <InputField name="startDate" label="Start Date" type="date" />
          {/* end date */}
          <InputField name="endDate" label="End Date" type="date" />
        </div>
      </div>
      <div className="ml-auto flex gap-4">
        <Button label="Submit" variant="primary" />
        <Button label="Reset" variant="outline" />
      </div>
    </Form>
  );
};

export default Editor;
