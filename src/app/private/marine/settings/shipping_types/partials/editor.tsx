"use client";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import { Button } from "@app/components/ui/button";
import { showError, showSuccess } from "@app/lib/utils";
import {
  IShippingType,
  create_shipping_type,
  update_shipping_type,
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
  data?: IShippingType;
}

const schema = z.object({
  name: z.string().min(1, "Name is required").min(3, "Enter a valid name"),
  code: z.string().min(1, "Code is required"),
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
      setFormData({ name: data.name, code: data.code });
    } else {
      setFormData(initialValues);
    }
  }, [data]);

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      setBusy(true);
      const res = edit
        ? await update_shipping_type(id, {
            name: values.name,
            code: values.code,
          })
        : await create_shipping_type({
            name: values.name,
            code: values.code,
          });

      if (res.success) {
        showSuccess(
          edit
            ? "Successfully updated cover type"
            : "Successfully created a cover type"
        );
        isDone();
      } else {
        showError(res.message || "Failed to perform command");
      }
    } catch (err: any) {
      console.log("here", err);
      showError(err?.message || err);
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
      <div className="grid gap-6">
        <InputField name="code" label="Code" type="text" required />
        <InputField
          name="name"
          label="Name of Shipping type"
          type="text"
          required
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
