"use client";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import SelectField from "@app/components/forms/SelectField";
import { Button } from "@app/components/ui/button";
import { showError, showSuccess } from "@app/lib/utils";
import {
  IPort,
  create_excess,
  create_port,
  update_excess,
  update_port,
} from "@app/server/services";
import React, { useEffect, useState } from "react";
import * as z from "zod";

const initialValues = {
  name: "",
  code: "",
};

interface EditorProps {
  id?: number;
  isDone: () => void;
  edit?: boolean;
  data?: IPort;
}

const schema = z.object({
  name: z.string().min(1, "Name is required").min(3, "Enter a valid name"),
  code: z.string().min(1, "Code is required"),
});

const Editor: React.FC<EditorProps> = ({
  id = 0,
  edit = false,
  isDone,
  data,
}) => {
  const [busy, setBusy] = useState(false);
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        code: data.code,
      });
    } else {
      setFormData(initialValues);
    }
  }, [data]);

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      setBusy(true);
      const res = edit
        ? await update_excess(id, {
            name: values.name,
            code: values.code,
          })
        : await create_excess({
            name: values.name,
            code: values.code,
          });

      if (res.success) {
        showSuccess(
          edit ? "Successfully updated excess" : "Successfully created excess"
        );
        isDone();
      } else {
        showError(res.message || "Failed to perform command");
      }
    } catch (err: any) {
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
      <div className="grid gap-6">
        <InputField name="code" label="Code" type="text" required />
        <InputField name="name" label="Name" type="text" required />
      </div>
      <div className="ml-auto flex gap-4">
        <Button label="Submit" variant="primary" type="submit" busy={busy} />
        <Button label="Reset" variant="outline" type="reset" />
      </div>
    </Form>
  );
};

export default Editor;
