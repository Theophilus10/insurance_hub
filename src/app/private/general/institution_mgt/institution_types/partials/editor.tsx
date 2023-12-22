"use client";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import { Button } from "@app/components/ui/button";
import { showError, showSuccess } from "@app/lib/utils";
import {
  IInstitutionType,
  create_institution_type,
  update_institution_type,
} from "@app/server/services";
import React, { useEffect, useState } from "react";
import * as z from "zod";

interface EditorProps {
  id?: number;
  isDone?: () => void;
  edit?: boolean;
  data?: IInstitutionType;
}

const schema = z.object({
  name: z.string().min(1, "Name is required").min(3, "Name is too short"),
});

const Editor: React.FC<EditorProps> = ({
  id = 0,
  isDone,
  edit = false,
  data,
}) => {
  const [busy, setBusy] = useState(false);
  const [formData, setFormData] = useState({ name: "" });

  useEffect(() => {
    if (data) {
      setFormData({ name: data.name });
    } else {
      setFormData({ name: "" });
    }
  }, [data]);

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      setBusy(true);
      const res = edit
        ? await update_institution_type(id, { name: values.name })
        : await create_institution_type({ name: values.name });

      if (res.success) {
        showSuccess(
          edit
            ? "Successfully updated institution type"
            : "Successfully created an institution type"
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
        label="Institution Type Name"
        type="text"
        placeholder="Enter institution type name"
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
