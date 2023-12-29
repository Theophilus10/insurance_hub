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

const newNoClaim = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="py-5">Add Tariff</CardTitle>
        <Divider />
        <CardContent>
          <Form>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-4">
              <SelectField
                label="Schedule"
                name="schedule"
                options={[]}
                required
              />
              <SelectField
                label="Computation Type"
                name="computation_type"
                options={[]}
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-4">
              <InputField label="Start Date" name="start_date" type="date" />
              <InputField label="End Date" name="end_date" type="date" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-4">
              <InputField
                label="Basic Premium"
                name="basic_premium"
                type="number"
              />
              <InputField label="Description" name="discription" type="text" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-4">
              <InputField
                label="Additional Peril Charge"
                name="additional_peril_charge"
                type="number"
              />
              <InputField
                label="Extra Seats Charge"
                name="extra_seats_charge"
                type="number"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-4">
              <InputField
                label="Ecowas Peril Charge"
                name="ecowas_peril_charge"
                type="number"
              />
              <InputField
                label="Personal Accident Charge"
                name="personal_accident_charge"
                type="number"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-4">
              <InputField label="Nhis" name="nhis" type="number" />
              <InputField
                label="Sticker Fee"
                name="sticker_fee"
                type="number"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-4">
              <InputField
                label="Ecowas Levy"
                name="ecowas_levy"
                type="number"
              />
              <InputField
                label="Other Charges"
                name="other_charges"
                type="number"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-4">
              <InputField
                label="Excess Amount"
                name="excess_amount"
                type="number"
              />
              <InputField
                label="Excess Rate"
                name="excess_rate"
                type="number"
              />
            </div>
            <div className="py-3">
              <InputField
                label="Office Premium"
                name="office_premium"
                type="number"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-4">
              <InputField
                label="Comprehensive Minimum Rate"
                name="comprehensive_minimum_rate"
                type="number"
              />

              <InputField
                label="Comprehensive Maximum Rate"
                name="comprehensive_maximum_rate"
                type="number"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-4">
              <InputField label="Death" name="death" type="number" />
              <InputField
                label="Bodily Injury"
                name="bodily_injury"
                type="number"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-4">
              <InputField label="Tppd Rate" name="tppd_rate" type="number" />
              <InputField
                label="Tppd Amount"
                name="tppd_amount"
                type="number"
              />
              <InputField
                label="Third Party Premium"
                name="third_party_premium"
                type="number"
              />
              <InputField
                label="Third Party Excess"
                name="third_party_excess"
                type="number"
              />
              <InputField
                label="Brown Card Fee"
                name="brown_card_fee"
                type="number"
              />
              <InputField
                label="Fire and Theft Minimum Rate"
                name="fire_and_theft_minimum_rate"
                type="number"
              />
              <InputField
                label="Fire and Theft Maximum Rate"
                name="fire_and_theft_maximum_rate"
                type="number"
              />
              <InputField
                label="Premium Floor"
                name="premium_floor"
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
