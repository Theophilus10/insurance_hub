"use client";
import ControlField from "@app/components/forms/ControlField";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import SelectField from "@app/components/forms/SelectField";
import { Button } from "@app/components/ui/button";
import { showError, showSuccess } from "@app/lib/utils";
import {
  ICurrency,
  create_currency,
  update_currency,
} from "@app/server/services";
import React, { useEffect, useState } from "react";
import * as z from "zod";

const initialValues = {
  name: "",
  code: "",
  is_base: false,
};

interface EditorProps {
  id?: number;
  isDone: () => void;
  edit?: boolean;
  data?: ICurrency;
}

const schema = z.object({
  name: z.string().min(1, "Name is required").min(3, "Enter a valid name"),
  code: z.string().min(1, "Code is required"),
  is_base: z.boolean(),
});
const Editor: React.FC<EditorProps> = ({
  id = 0,
  isDone,
  edit = false,
  data,
}) => {
  const [busy, setBusy] = useState(false);
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    if (data) {
      setFormData({ name: data.name, code: data.code, is_base: data.is_base });
    } else {
      setFormData(initialValues);
    }
  }, [data]);

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      setBusy(true);
      const res = edit
        ? await update_currency(id, {
            name: values.name,
            code: values.code,
            is_base: values.is_base,
          })
        : await create_currency({
            name: values.name,
            code: values.code,
            is_base: values.is_base,
          });

      if (res.success) {
        showSuccess(
          edit
            ? "Successfully updated currency"
            : "Successfully created an currency"
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
      <div className="grid gap-4">
        <InputField name="name" label="Currency Name" type="text" required />
        <InputField name="code" label="Currency Code" type="text" required />
        <ControlField
          name="is_base"
          label="Set as base currency"
          type="checkbox"
        />
      </div>
      <div className="ml-auto flex gap-4">
        <Button label="Submit" variant="primary" type="submit" busy={busy} />
        <Button label="Reset" variant="outline" type="reset" />
      </div>
    </Form>
  );
};

export default Editor;
