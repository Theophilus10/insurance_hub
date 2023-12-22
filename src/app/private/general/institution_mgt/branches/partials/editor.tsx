"use client";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import SelectField from "@app/components/forms/SelectField";
import { Button } from "@app/components/ui/button";
import { showError, showSuccess } from "@app/lib/utils";
import {
  BranchDTO,
  IBranch,
  create_branch,
  update_branch,
} from "@app/server/services";
import React, { useEffect, useState } from "react";
import * as z from "zod";

interface IEditor {
  id?: number;
  data?: IBranch;
  edit?: boolean;
  institutions: any[];
  isDone?: () => void;
}

const initialValues = {
  institution_id: 0,
  name: "",
  contact_person: "",
  region: "",
  position_of_person: "",
  contact_phone: "",
  email: "",
  office_location: "",
  // website: "",
};
const schema = z.object({
  institution_id: z
    .number({
      invalid_type_error: "Institution is required",
      required_error: "Institution is required",
    })
    .refine((value) => value !== 0, {
      message: "Institution is required",
    }),

  name: z
    .string()
    .min(1, "Branch name is required")
    .min(3, "Enter a valid name"),
  contact_person: z.string().optional(),
  region: z.string().optional(),
  position_of_person: z.string().optional(),
  contact_phone: z.string().optional(),
  email: z.string().optional(),
  office_location: z.string().optional(),
});

const Editor: React.FC<IEditor> = ({
  id = 0,
  data,
  edit = false,
  institutions,
  isDone,
}) => {
  const [formData, setFormData] = useState(initialValues);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      setBusy(true);
      const d = values as BranchDTO;
      const res = edit ? await update_branch(id, d) : await create_branch(d);
      if (res.success) {
        showSuccess(
          edit ? "Successfully updated branch" : "Successfully created branch"
        );
        isDone && isDone();
      } else {
        showError(res.message || "Failed to perform command");
      }
    } catch (err: any) {
      console.log(err);
      showError(err?.message || err);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (data) {
      // console.log(data)
      setFormData({
        institution_id: data.institution.id,
        name: data.name,
        contact_person: data.contact_person,
        region: data.region,
        position_of_person: data.position_of_person,
        contact_phone: data.contact_phone,
        email: data.email,
        office_location: data.office_location,
      });
    } else {
      setFormData(initialValues);
    }
  }, [data]);
  return (
    <Form
      schema={schema}
      initialValues={formData}
      className="flex flex-col gap-4 w-full h-full px-2"
      onSubmit={handleSubmit}
    >
      <SelectField
        name="institution_id"
        label="Institution Type"
        placeholder="Select institution type"
        options={institutions}
        required
      />
      <InputField
        name="name"
        label="Branch Name"
        type="text"
        required
        placeholder="Enter branch name"
      />

      <InputField
        name="contact_person"
        label="Contact Person"
        type="text"
        placeholder="John Doe"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <InputField
          name="position_of_person"
          label="Position of Person"
          type="text"
          placeholder="Managing Director"
        />

        <InputField
          name="region"
          label="Region"
          type="text"
          placeholder="Enter Region"
        />
        {/* <InputField
          name="website"
          label="Website"
          type="text"
          placeholder="www.domainname.com"
        /> */}
      </div>
      <InputField
        name="email"
        label="Email"
        type="text"
        placeholder="johndoe@email.com"
      />
      <InputField
        name="office_location"
        label="Office Location"
        type="text"
        placeholder="Enter office location"
      />
      <InputField
        name="contact_phone"
        label="Contact Phone"
        type="text"
        placeholder="233501234567"
        helpText={`Start with country code without ("+"). Example 233501234567 for Ghana(233)`}
      />

      <div className="ml-auto flex gap-4 pt-2">
        <Button label="Submit" variant="primary" type="submit" busy={busy} />
        <Button label="Reset" variant="outline" type="reset" />
      </div>
    </Form>
  );
};

export default Editor;
