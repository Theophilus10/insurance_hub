"use client";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import SelectField from "@app/components/forms/SelectField";
import { Button } from "@app/components/ui/button";
import { showError, showSuccess } from "@app/lib/utils";
import {
  IInstitution,
  InstitutionDTO,
  create_institution,
  update_institution,
} from "@app/server/services";
import React, { useEffect, useState } from "react";
import * as z from "zod";

const initialValues = {
  institution_type_id: 0,
  name: "",
  email: "",
  contact_person: "",
  position_of_person: "",
  website: "",
  office_location: "",
  contact_phone: "",
};
const schema = z.object({
  institution_type_id: z
    .number({
      required_error: "Institution type is required",
      invalid_type_error: "Institution type is required",
    })
    .refine((value) => value !== 0, {
      message: "Institution type is required",
    }),

  name: z
    .string()
    .min(1, "Institution name is required ")
    .min(3, "Enter a valid name"),
  email: z.string().optional(),
  contact_person: z.string().optional(),
  position_of_person: z.string().optional(),
  website: z.string().optional(),
  office_location: z.string().optional(),
  contact_phone: z
    .string()
    // .refine(
    //   (value) => {
    //     return value === undefined || /^\d{1,15}$/.test(value);
    //   },
    //   {
    //     message:
    //       "Invalid contact phone format. Please provide a valid phone number starting with the country code.",
    //   }
    // )
    .optional(),
});
interface IEditor {
  id?: number;
  institutionTypes: any[];
  isDone?: () => void;
  data?: IInstitution;
  edit?: boolean;
}

const Editor: React.FC<IEditor> = ({
  id = 0,
  institutionTypes = [],
  isDone,
  data,
  edit = false,
}) => {
  const [busy, setBusy] = useState(false);
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    if (data) {
      setFormData({
        institution_type_id: data.institution_type.id!,
        name: data.name,
        email: data.email,
        contact_person: data.contact_person,
        position_of_person: data.position_of_person,
        website: data.website,
        office_location: data.office_location,
        contact_phone: data.contact_phone,
      });
    } else {
      setFormData(initialValues);
    }
  }, [data]);
  const handleSubmit = async (values: Record<string, any>) => {
    try {
      setBusy(true);
      const is_insurance_company = institutionTypes
        .find((x) => x.value === values.institution_type_id)
        ?.label.includes("INSURANCE COMPANY")
        ? true
        : false;

      const d = {
        ...values,
        is_insurance_company: is_insurance_company,
      } as InstitutionDTO;
      const res = edit
        ? await update_institution(id, d)
        : await create_institution(d);
      if (res.success) {
        showSuccess(
          edit
            ? "Successfully updated an institution"
            : "Successfully created an institution"
        );
        isDone && isDone();
      } else {
        showError(res.message || "Failed perform command");
      }
    } catch (err: any) {
      console.log(err);
      showError(err?.message || err);
    } finally {
      setBusy(false);
    }
  };
  return (
    <Form
      schema={schema}
      initialValues={formData}
      className="flex flex-col gap-4 px-2"
      onSubmit={handleSubmit}
    >
      <SelectField
        name="institution_type_id"
        label="Institution Type"
        placeholder="Select institution type"
        options={institutionTypes}
        required
      />
      <InputField
        name="name"
        label="Institution Name"
        type="text"
        required
        placeholder="Enter institution name"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <InputField
          name="contact_person"
          label="Contact Person"
          type="text"
          placeholder="John Doe"
        />
        <InputField
          name="position_of_person"
          label="Position of Person"
          type="text"
          placeholder="Managing Director"
        />

        <InputField
          name="website"
          label="Website"
          type="text"
          placeholder="www.domainname.com"
        />
        <InputField
          name="email"
          label="Email"
          type="text"
          placeholder="johndoe@email.com"
        />
      </div>
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
