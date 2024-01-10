"use client";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import SelectField from "@app/components/forms/SelectField";
import { Button } from "@app/components/ui/button";
import { showError, showSuccess } from "@app/lib/utils";
import {
  IIdentificationType,
  create_identification_type,
  update_identification_type,
} from "@app/server/services";
import React, { useEffect, useState } from "react";
import * as z from "zod";

const initialValues = {
  name: "",
};
const schema = z.object({
  name: z.string().min(1, "Name is required").min(3, "Name is too short"),
});

interface IEditor {
  id?: number;
  data?: IIdentificationType;
  edit?: boolean;
  isDone: () => void;
}
const Editor: React.FC<IEditor> = ({ id = 0, edit = false, data, isDone }) => {
  const [formData, setFormData] = useState(initialValues);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (data) {
      setFormData({ name: data.name });
    } else {
      setFormData(initialValues);
    }
  }, [data]);

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      setBusy(true);
      const d = { name: values.name };
      const res = edit
        ? await update_identification_type(id, d)
        : await create_identification_type(d);
      if (res.success) {
        showSuccess(
          edit
            ? "Successfully updated institution type"
            : "Successfully created institution type"
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
  return (
    <Form
      schema={schema}
      initialValues={formData}
      className="flex flex-col gap-6 w-full h-full px-2"
      onSubmit={handleSubmit}
    >
      <InputField
        name="name"
        label="Identification Type Name"
        type="text"
        placeholder="Enter identification type name"
        required
      />

      <div className="ml-auto flex gap-4">
        <Button label="Submit" variant="primary" type="submit" busy={busy} />
        <Button label="Reset" variant="outline" type="reset" />
      </div>
    </Form>
  );
};

export default Editor;
