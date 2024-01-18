"use client";
import { useRouter } from "next/navigation";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import Divider from "@app/components/ui/Divider";
import { ArrowBigLeftDash, Send, Search } from "lucide-react";

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

const registerClaim = () => {
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
        <CardTitle className="py-5">Register Claim</CardTitle>
        <Divider />
        <CardHeader>Registration Details</CardHeader>
        <CardContent>
          <Form>
            <div className="py-3">
              <div>
                <InputField
                  label="Vehicle Registration Number"
                  name="vehicle_registration"
                />
              </div>

              <div className="flex flex-col w-full bg-gray-100 p-4 rounded-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-3">
                  <InputField
                    label="Policy Number"
                    name="policy_number"
                    value="4553322"
                    disabled={true}
                    className="bg-gray-300 p-2 rounded-md mb-2"
                  />
                  <InputField
                    label="Make"
                    name="make"
                    disabled={true}
                    className="bg-gray-300 p-2 rounded-md mb-2"
                  />
                  <InputField
                    label="Model"
                    name="model"
                    disabled={true}
                    className="bg-gray-300 p-2 rounded-md mb-2"
                  />
                  <InputField
                    label="Seating"
                    name="seating"
                    disabled={true}
                    className="bg-gray-300 p-2 rounded-md mb-2"
                  />
                  <InputField
                    label="Cubic/Tonnage"
                    name="cubic_tonnage"
                    disabled={true}
                    className="bg-gray-300 p-2 rounded-md mb-2"
                  />
                  <InputField
                    label="Sum Insured"
                    name="sum_insured"
                    disabled={true}
                    className="bg-gray-300 p-2 rounded-md mb-2"
                  />
                  <InputField
                    label="Premium"
                    name="premium"
                    disabled={true}
                    className="bg-gray-300 p-2 rounded-md"
                  />
                  <InputField
                    label="Inception Date"
                    name="inception"
                    disabled={true}
                    className="bg-gray-300 p-2 rounded-md mb-2"
                  />
                  <InputField
                    label="Expiry Date"
                    name="make"
                    disabled={true}
                    className="bg-gray-300 p-2 rounded-md mb-2"
                  />
                </div>
              </div>
              {/* <div className="flex py-5 gap-10 ">
                <Button
                  label="Search"
                  leadingIcon={<Search />}
                  className="font-bold text-lg"
                />
              </div> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-3">
                <InputField
                  label="Report Date"
                  name="report_date"
                  type="date"
                />
                <InputField label="Loss Date" name="loss_date" type="date" />
              </div>

              <CardHeader>Claim Details</CardHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-3">
                <InputField
                  label="Location of Accident"
                  name="location_accident"
                  type="text"
                />
                <InputField label="Salvage" name="salvage" type="text" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-3">
                <Textarea label="Subrogation" name="subrogation" />
                <Textarea
                  label="Circumstance/Cause of Loss"
                  name="circumstance"
                />
                <Textarea label="Assesment/Consideration" name="assesment" />
                <Textarea
                  label="Police of Fire Service Investigation"
                  name="police_fire_service"
                />
                <Textarea
                  label="Reinstatement Cover"
                  name="reinstatement_cover"
                />
                <Textarea
                  label="Injury/Extent of Damage or Loss"
                  name="extent_of_damage"
                />
                <Textarea label="Subrogation" name="subrogation" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-3">
                <InputField
                  label="About Driver(Name)"
                  name="driver_name"
                  type="text"
                />
                <InputField
                  label="About Driver(Licence Number)"
                  name="licence_number"
                  type="text"
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

export default registerClaim;
