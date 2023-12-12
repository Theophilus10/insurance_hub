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
import { useEffect } from "react";
import { Textarea } from "@app/components/ui/textarea";

const newEndorsement = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();

    const month = today.getMonth() + 1;
    const day = today.getDate();

    const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;

    return formattedDate;
  };

  const today = getTodayDate();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="py-5">New Endorsement</CardTitle>
        <Divider />
        <CardContent>
          <Form>
            <div className="py-3">
              <InputField label="Date" name="date" value={today} />
            </div>
            <div className="py-3">
              <InputField
                label="Vehicle Registration Number"
                name="vehicle_registration"
              />
            </div>

            <div className="py-3">
              <SelectField
                label="Endorsement Type"
                name="endorsement_type"
                options={[]}
                required
              />
            </div>
            <div className="py-3">
              <Textarea label="Comment" name="comment" />
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

export default newEndorsement;
