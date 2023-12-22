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
  create_user,
  update_user,
} from "@app/server/services";
import React, { useEffect, useState } from "react";
import * as z from "zod";
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
  institution_type: 0,
  institution: 0,
  branch: 0,
  first_name: "",
  last_name: "",
  email: "",
  contact_phone: "",
  role: 0,
};
const schema = z.object({
  name: z.string().min(1, "Name is required").min(3, "Name is too short"),
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

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      setBusy(true);
      const res = edit
        ? await update_user(id, { name: values.name })
        : await create_user({ name: values.name });

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
    const d = x ? x.map((a) => ({ value: a.id, label: a.name })) : [];
    setInstitutionList(d);
  };

  const handleInstitutionChange = (e: any) => {
    setBranchList([]);
    // setFormData({ ...formData, branch: 0 });

    const x = branch.filter((m) => m.institution.id === e.value);
    const d = x ? x.map((a) => ({ value: a.id, label: a.name })) : [];
    setBranchList(d);
  };
  return (
    <Form
      schema={schema}
      initialValues={formData}
      className="flex flex-col gap-4 w-full h-full px-2"
    >
      <SelectField
        name="institution_type"
        label="Institution Type"
        placeholder="Select institution type"
        options={institutionType}
        onChange={handleInstitutionTypeChange}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SelectField
          name="institution"
          label="Institution"
          placeholder="Select institution"
          options={instituitonsList}
          onChange={handleInstitutionChange}
        />
        <SelectField
          name="branch"
          label="Branch"
          placeholder="Select branch"
          options={branchList}
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
