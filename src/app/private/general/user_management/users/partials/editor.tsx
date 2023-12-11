"use client";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import SelectField from "@app/components/forms/SelectField";
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
      className="flex flex-col gap-4 w-full h-full px-2"
    >
      <SelectField
        name="institution_type"
        label="Institution Type"
        placeholder="Select institution type"
        options={[]}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SelectField
          name="institution"
          label="Institution"
          placeholder="Select institution"
          options={[]}
        />
        <SelectField
          name="branch"
          label="Branch"
          placeholder="Select branch"
          options={[]}
        />
        <InputField
          name="first_name"
          label="First Name"
          required
          placeholder="John"
        />
        <InputField
          name="last_name"
          label="Last Name"
          required
          placeholder="Doe"
        />
      </div>
      <InputField name="email" label="Email" placeholder="johndoe@email.com" />
      <InputField
        name="contact_phone"
        label="Contact Phone"
        placeholder="233501234567"
        helpText={`Start with country code without ("+"). Example: 233501234567 for Ghana(233)`}
      />
      <SelectField
        name="role"
        label="Role"
        required
        placeholder="Select role"
        options={[]}
      />
      <div className="ml-auto flex gap-4 pt-2">
        <Button label="Submit" variant="primary" type="submit" />
        <Button label="Reset" variant="outline" type="button" />
      </div>
    </Form>
  );
};

export default editor;
