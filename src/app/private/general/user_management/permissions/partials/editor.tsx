"use client";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import { Button } from "@app/components/ui/button";
import { showError, showSuccess } from "@app/lib/utils";
import {
  IPermission,
  create_permission,
  update_permission,
} from "@app/server/services";
import React, { useEffect, useState } from "react";
import * as z from "zod";

interface EditorProps {
  id?: number;
  isDone: () => void;
  edit?: boolean;
  data?: IPermission;
}

const initialValues = {
  name: "",
};
const schema = z.object({
  name: z.string().min(1, "Name is required").min(3, "Name is too short"),
});

const Editor: React.FC<EditorProps> = ({ data, id = 0, edit, isDone }) => {
  const [busy, setBusy] = useState(false);
  const [formData, setFormData] = useState(initialValues);

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
      const res = edit
        ? await update_permission(id, { name: values.name })
        : await create_permission({ name: values.name });

      if (res.success) {
        showSuccess(
          edit
            ? "Successfully updated a permission"
            : "Successfully created a permission"
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
  return (
    <Form
      schema={schema}
      initialValues={formData}
      className="flex flex-col gap-6 w-full h-full px-2"
      onSubmit={handleSubmit}
    >
      <InputField
        name="name"
        label="Permission Name"
        required
        placeholder="Enter permission name"
      />
      <div className="ml-auto flex gap-4">
        <Button label="Submit" variant="primary" type="submit" busy={busy} />
        <Button label="Reset" variant="outline" type="reset" />
      </div>
    </Form>
  );
};

export default Editor;
