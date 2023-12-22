"use client";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import { Button } from "@app/components/ui/button";
import { showError, showSuccess } from "@app/lib/utils";
import {
  ICustomerType,
  create_customer_type,
  update_customer_type,
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
  data?: ICustomerType;
  edit?: boolean;
  isDone: () => void;
}

const Editor: React.FC<IEditor> = ({ id = 0, edit = false, isDone, data }) => {
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
        ? await update_customer_type(id, d)
        : await create_customer_type(d);
      if (res.success) {
        showSuccess(
          edit
            ? "Successfully updated customer type"
            : "Successfully created customer type"
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
        label="Customer Type Name"
        required
        placeholder="Enter customer type name"
      />
      <div className="ml-auto flex gap-4">
        <Button label="Submit" variant="primary" type="submit" busy={busy} />
        <Button label="Reset" variant="outline" type="reset" />
      </div>
    </Form>
  );
};

export default Editor;
