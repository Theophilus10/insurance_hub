"use client";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import { Button } from "@app/components/ui/button";
import { showError, showSuccess } from "@app/lib/utils";
import {
  IOccupation,
  create_occupation,
  update_occupation,
} from "@app/server/services";
import React, { useEffect, useState } from "react";
import * as z from "zod";

interface IEditor {
  id?: number;
  edit?: boolean;
  isDone?: () => void;
  data?: IOccupation;
}
const initialValues = {
  name: "",
  code: "",
};
const schema = z.object({
  name: z.string().min(1, "Name is required").min(3, "Enter a valid name"),
  code: z.string().min(1, "Code is required"),
});

const Editor: React.FC<IEditor> = ({ id = 0, edit = false, isDone, data }) => {
  const [formData, setFormData] = useState(initialValues);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({ name: data.name, code: data.code });
    } else {
      setFormData(initialValues);
    }
  }, [data]);

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      setBusy(true);
      const d = { code: values.code, name: values.name };
      const res = edit
        ? await update_occupation(id, d)
        : await create_occupation(d);
      if (res.success) {
        showSuccess(
          edit
            ? "Successfully updated occupation"
            : "Successfully created occupation"
        );
        isDone && isDone();
      } else {
        showError(res.message || "Failed to perform command");
      }
    } catch (err: any) {
      showError(err?.message || err);
      console.log(err);
    } finally {
      setBusy(false);
    }
  };
  return (
    <Form
      schema={schema}
      initialValues={formData}
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full h-full px-2"
    >
      <InputField
        name="code"
        label="Code"
        type="text"
        required
        placeholder="Enter occupation code"
      />
      <InputField
        name="name"
        label="Occupation Name"
        type="text"
        placeholder="Enter occupation name"
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
