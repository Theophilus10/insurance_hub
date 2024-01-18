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

const newUnitPrice = () => {
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
        <CardTitle className="py-5">New Unit Price</CardTitle>
        <Divider />
        <CardContent>
          <Form>
            <div className="py-3 space-y-4">
              <InputField
                label="Unit Price Motor Vechicle"
                name="unit_price_vechicle"
              />
              <InputField
                label="Unit Price Motor Cycle"
                name="unit_price_cycle"
              />
            </div>

            <div className="py-3 space-y-4">
              <InputField label="Start Date" name="start_date" value={today} />
              <InputField label="End Date" name="end_date" />
            </div>

            {/* <div className="py-3">
              <SelectField
                label="Endorsement Type"
                name="endorsement_type"
                options={[]}
                required
              />
            </div> */}
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
                variant="primary"
                className="font-bold  ml-4 text-lg"
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

export default newUnitPrice;
