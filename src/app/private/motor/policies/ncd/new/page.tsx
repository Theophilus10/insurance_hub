"use client";
import { useRouter } from "next/navigation";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import Divider from "@app/components/ui/Divider";
import { ArrowBigLeftDash, Send } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@app/components/ui/card";
import SelectField from "@app/components/forms/SelectField";
import { Button } from "@app/components/ui/button";

const newNoClaim = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="py-5">Add NCD Confirmation</CardTitle>
        <Divider />
        <CardContent>
          <Form>
            <div className="py-3">
              <InputField
                label="Vehicle Registration Number"
                name="vehicle_registration"
              />
            </div>
            <div className="py-3">
              <InputField
                label="Customer Name"
                name="customer_name"
                disabled={true}
                value="Yaw Frimpong"
              />
            </div>
            <div className="py-3">
              <SelectField
                label="ID Type"
                name="id_type"
                options={[]}
                required
              />
            </div>
            <div className="py-3">
              <InputField label="ID Number" name="id_number" type="text" />
            </div>
            <div className="py-3">
              <InputField label="ID Image" name="id_image" type="file" />
            </div>
            <div className="py-3">
              <InputField
                label="Supporting Document"
                name="supporting_doc"
                type="file"
              />
            </div>
            <div className="py-3">
              <InputField
                label="Current Rate"
                name="current_rate"
                type="number"
              />
            </div>
            <div className="flex justify-end py-5">
              <Button
                label="Submit"
                leadingIcon={<Send />}
                className="font-bold text-lg"
              />
              <Button
                className="bg-blue-500 font-bold  ml-4 text-lg"
                label="Back"
                onClick={handleGoBack}
                leadingIcon={<ArrowBigLeftDash />}
              />
            </div>
          </Form>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default newNoClaim;
