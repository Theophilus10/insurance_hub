"use client";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import SelectField from "@app/components/forms/SelectField";
import { Button } from "@app/components/ui/button";
import { showError, showSuccess } from "@app/lib/utils";
import {
  IBranch,
  IInstitution,
  IUser,
  UsersData,
  create_user,
  register_user,
  update_user,
} from "@app/server/services";
import React, { useEffect, useState } from "react";
import * as z from "zod";

const regions = [
  { label: "AHAFO", value: "AHAFO" },
  { label: "ASHANTI", value: "ASHANTI" },
  { label: "BONO EAST", value: "BONO EAST" },
  { label: "BRONG AHAFO", value: "BRONG AHAFO" },
  { label: "CENTRAL", value: "CENTRAL" },
  { label: "EASTERN", value: "EASTERN" },
  { label: "GREATER ACCRA", value: "GREATER ACCRA" },
  { label: "NORTH EAST", value: "NORTH EAST" },
  { label: "NORTHERN", value: "NORTHERN" },
  { label: "OTI", value: "OTI" },
  { label: "SAVANNAH", value: "SAVANNAH" },
  { label: "UPPER EAST", value: "UPPER EAST" },
  { label: "UPPER WEST", value: "UPPER WEST" },
  { label: "VOLTA", value: "VOLTA" },
  { label: "WESTERN", value: "WESTERN" },
  { label: "WESTERN NORTH", value: "WESTERN NORTH" },
];
interface EditorProps {
  id?: number;
  isDone: () => void;
  edit?: boolean;
  data?: IUser;
  institutionType: any[];
  institution: IInstitution[];
  branch: IBranch[];
  role: any[];
}

const initialValues = {
  institution_type_id: 0,
  institution_id: 0,
  branch_id: 0,
  name: "",
  email: "",
  phone: "",
  region: "",
  role: "",
};
const schema = z.object({
  institution_type_id: z.number(),
  institution_id: z.number(),
  branch_id: z.number(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Provide a valid email address.",
  }),
  phone: z.string().min(2, {
    message: "Phone must be at least 2 characters.",
  }),
  role: z.string(),
  region: z.string(),
});

const Editor: React.FC<EditorProps> = ({
  id = 0,
  isDone,
  edit = false,
  data,
  institution = [],
  institutionType = [],
  branch = [],
  role = [],
}) => {
  const [busy, setBusy] = useState(false);
  const [formData, setFormData] = useState(initialValues);
  const [instituitonsList, setInstitutionList] = useState([]);
  const [branchList, setBranchList] = useState([]);

  useEffect(() => {
    if (data) {
      // setFormData({ name: data.name });
    } else {
      setFormData(initialValues);
    }
  }, [data]);

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setBusy(true);
      const res = edit
        ? await update_user(id, { name: values.name })
        : await register_user(values);

      if (res.success) {
        showSuccess(
          edit
            ? "Successfully updated institution type"
            : "Successfully created an institution type"
        );
        isDone();
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

  const handleInstitutionTypeChange = (e: any) => {
    // setInstitutionList([]);
    // setBranchList([]);
    // setFormData({ ...formData, branch: 0, institution: 0 });
    const x = institution.filter((m) => m.institution_type.id === e.value);
    const d = x ? x.map((a) => ({ value: a?.id, label: a?.name })) : [];
    setInstitutionList(d);
  };

  const handleInstitutionChange = (e: any) => {
    setBranchList([]);
    // setFormData({ ...formData, branch: 0 });

    const x = branch?.filter((m) => m?.institution?.id === e?.value);
    const d = x ? x?.map((a) => ({ value: a?.id, label: a?.name })) : [];
    setBranchList(d);
  };
  return (
    <Form
      schema={schema}
      initialValues={formData}
      className="flex flex-col gap-4 w-full h-full px-2"
      onSubmit={handleSubmit}
    >
      <SelectField
        name="institution_type_id"
        label="Institution Type"
        placeholder="Select institution type"
        options={institutionType}
        onChange={handleInstitutionTypeChange}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SelectField
          name="institution_id"
          label="Institution"
          placeholder="Select institution"
          options={instituitonsList}
          onChange={handleInstitutionChange}
        />
        <SelectField
          name="branch_id"
          label="Branch"
          placeholder="Select branch"
          options={branchList}
        />
      </div>
      <InputField name="name" label="Name" required placeholder="John" />
      <InputField name="email" label="Email" placeholder="johndoe@email.com" />
      <InputField
        name="phone"
        label="Contact Phone"
        placeholder="233501234567"
        helpText={`Start with country code without ("+"). Example: 233501234567 for Ghana(233)`}
      />
      <SelectField
        name="region"
        label="Select Region"
        required={true}
        options={regions.map((region) => ({
          label: region.label,
          value: region.value,
        }))}
      />
      <SelectField
        name="role"
        label="Role"
        required
        placeholder="Select role"
        options={role}
      />
      <div className="ml-auto flex gap-4 pt-4 pb-20">
        <Button label="Submit" variant="primary" type="submit" busy={busy} />
        <Button label="Reset" variant="outline" type="reset" />
      </div>
    </Form>
  );
};

export default Editor;
