"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@app/components/ui/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@app/components/ui/card";

import ScrollSection from "@app/components/ui/scrollSection";

import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import SelectField from "@app/components/forms/SelectField";
import { object, string } from "zod";
import { Button } from "@app/components/ui/button";
import IconButton from "@app/components/ui/IconButton";
import Divider from "@app/components/ui/Divider";

const options = [
  { value: "Glico General Insurance Company Limited", label: "Glico" },
  { value: "Ghana Union Assurance", label: "GUA" },
];

const currencyOptions = [
  { value: "Ghana Cedis", label: "Ghana Cedis" },
  { value: "Euro", label: "Euro" },
];

const durationOptions = [
  { value: "One year", label: "One year" },
  { value: "Short Period", label: "Short Period" },
  { value: "Prorata", label: "Prorata" },
];

const CoverTypeOptions = [
  { value: "Comprehensive", label: "Comprehensive" },
  { value: "Third Party Fire and Theft", label: "Third Party Fire and Theft" },
  { value: "Third Party", label: "Third Party" },
];

const scheduleTypeOptions = [
  { value: "PRIVATE INDIVIDUAL", label: "PRIVATE INDIVIDUAL" },
  { value: "HIRING CAR", label: "HIRING CAR" },
];
const excessTypeOptions = [
  { value: "Excess is Applicable", label: "Excess is Applicable" },
  { value: "Excess is Bought", label: "Excess is Bought" },
  { value: "Voluntary Excess is Taken", label: "Voluntary Excess is Taken" },
];
const coInsurerOptions = [
  {
    value: "Activa International Insurance",
    label: "Activa International Insurance",
  },
];
const schema = object({
  username: string(),
  password: string().min(8),
});
const TabsComponent = () => {
  return (
    <ScrollSection className="container mx-auto px-4 lg:px-8 py-6 w-full">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl py-5">
            MOTOR INSURANCE PROPOSAL
          </CardTitle>
          <Divider />

          <CardContent>
            <Form schema={schema}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-5">
                <SelectField
                  label="Insurance Company"
                  name="company"
                  required
                  options={options}
                />
                <SelectField
                  label="Select Branch"
                  name="branch"
                  required
                  options={options}
                />
              </div>
              <Divider />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-5">
                <SelectField
                  label="Distribution Channel"
                  name="distribution_channel"
                  required
                  options={options}
                />
                <SelectField
                  label="Intermediary Type"
                  name="intermediary_type"
                  required
                  options={options}
                />
                <SelectField
                  label="Intermediary Name"
                  name="intermediary_name"
                  required
                  options={options}
                />
                <SelectField
                  label="Branch Office of Intermediary"
                  name="intermediary_branch_ofice"
                  required
                  options={options}
                />
              </div>
              <Divider />
              <CardTitle className="text-lg md:text-xl">
                Customer Info
              </CardTitle>
              <div className="flex flex-col sm:max-w-[150px] lg:max-w-[300px] xl:max-w-[400px] py-7">
                <div>
                  <h3 className="font-semibold py-5">Policy To:</h3>
                  <InputField
                    label="Full Name, ID, or Email"
                    name="find_customer"
                    type="search"
                    className="border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>

                <div className="flex flex-col w-full bg-gray-100 p-4 rounded-md">
                  <InputField
                    label="First Name"
                    name="first_name"
                    value="yes"
                    disabled={true}
                    className="bg-gray-300 p-2 rounded-md mb-2"
                  />
                  <InputField
                    label="Last Name"
                    name="last_name"
                    disabled={true}
                    className="bg-gray-300 p-2 rounded-md mb-2"
                  />
                  <InputField
                    label="Other Name"
                    name="other_name"
                    disabled={true}
                    className="bg-gray-300 p-2 rounded-md mb-2"
                  />
                  <InputField
                    label="Phone"
                    name="phone"
                    disabled={true}
                    className="bg-gray-300 p-2 rounded-md"
                  />
                </div>
              </div>

              <div className="flex py-5 gap-6 ">
                <IconButton icon="mdi:search" color="primary" />
                <Button>Add New Customer</Button>
              </div>
              <Divider className="border-b-4 border-black-500" />
              <CardTitle className="text-lg md:text-xl">Policy Info</CardTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2  gap-8 py-4">
                <div className="flex-1">
                  <SelectField
                    label="Currency"
                    name="currency"
                    required
                    options={options}
                  />
                </div>
                <div className="flex-1">
                  <InputField
                    label="Exchange Rate"
                    name="exchange_rate"
                    disabled={true}
                    className="bg-gray-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2  gap-8 py-4">
                <div className="flex-1">
                  <SelectField
                    label="Duration"
                    name="duration"
                    required
                    options={durationOptions}
                  />
                </div>
                <div className="flex-1">
                  <InputField
                    label="Days"
                    name="exchange_rate"
                    disabled={true}
                    className="bg-gray-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2  gap-8 py-4">
                <div className="flex-1">
                  <InputField
                    label="Inception Date"
                    name="inception_date"
                    type="date"
                  />
                </div>
                <div className="flex-1">
                  <InputField
                    label="Expiry Date"
                    name="expiry_date"
                    disabled={true}
                    className="bg-gray-300"
                  />
                </div>
              </div>
              <SelectField
                label="Cover Type"
                name="cover_type"
                required
                options={CoverTypeOptions}
              />
              <SelectField
                label="Scedule Type"
                name="scedule_type"
                required
                options={scheduleTypeOptions}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2  gap-8 py-4">
                <div className="flex-1">
                  <InputField
                    label="Sum Insured"
                    name="sum_insured"
                    type="number"
                  />
                </div>
                <div className="flex-1">
                  <InputField
                    label="Rate"
                    name="rate"
                    disabled={true}
                    className="bg-gray-300"
                  />
                </div>
              </div>
              <SelectField
                label="Excess"
                name="excess"
                required
                options={excessTypeOptions}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2  gap-8 py-4">
                <div className="flex-1">
                  <InputField
                    label="Excess Rate"
                    name="excess_rate"
                    type="number"
                  />
                </div>
                <div className="flex-1">
                  <InputField
                    label="Excess Amount "
                    name="rate"
                    type="number"
                    disabled={true}
                    className="bg-gray-300"
                  />
                </div>
              </div>
              <SelectField
                label="Co-Insurer"
                name="co_insurer"
                required
                options={coInsurerOptions}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2  gap-8 py-4">
                <div className="flex-1">
                  <InputField
                    label="Co-Insure Rate (%)"
                    name="co__nsure_rate"
                    type="number"
                  />
                </div>
                <div className="flex-1">
                  <InputField
                    label="Co Insure Amount"
                    name="co_insure_amount"
                    type="number"
                    disabled={true}
                    className="bg-gray-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2  gap-8 py-4">
                <div className="flex-1">
                  <InputField
                    label="TPPD Limit"
                    name="tppd_limit"
                    type="number"
                  />
                </div>
                <div className="flex-1">
                  <InputField
                    label="TPPD Rate"
                    name="tppd_rate"
                    type="number"
                  />
                </div>
              </div>
              <Divider className="border-b-4 border-black-500" />
              <CardTitle className="text-lg md:text-xl">Vehicle Info</CardTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-4">
                <InputField
                  label="Reg. Number"
                  name="registration_number"
                  placeholder="GZ 419 23"
                  required
                />

                <InputField
                  label="Make"
                  name="make"
                  placeholder="Make"
                  required
                />
                <InputField
                  label="Model"
                  name="model"
                  type="text"
                  placeholder="Model"
                  required
                />
                <InputField
                  label="Color"
                  name="color"
                  type="text"
                  placeholder="Color"
                  required
                />
                <InputField
                  label="Chasis Number"
                  name="chasis_number"
                  type="text"
                  placeholder="Chasis Number"
                  required
                />
                <InputField
                  label="Year of Mfg"
                  name="year_manufacture"
                  type="text"
                  placeholder="Year of Manufacture"
                  required
                />
                <InputField
                  label="Engine Capacity(CC/HP)"
                  name="engine_capacity"
                  type="text"
                  placeholder="Engine Capacity"
                  required
                />
                <InputField
                  label="Mileage"
                  name="mileage"
                  type="number"
                  placeholder="Mileage"
                  required
                />

                <SelectField
                  label="Body Type"
                  name="body_type"
                  options={options}
                  required
                />

                <InputField
                  label="Seats Including Driver"
                  name="seats"
                  type="number"
                  placeholder="Seating Capacity"
                  required
                />
              </div>
              <Divider className="border-b-8 border-black-500" />
              <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-4">
                  <TabsTrigger
                    value="premium_computation"
                    className="tab-trigger bg-white text-black active:bg-blue-900 active:text-white"
                  >
                    Premium Computation
                  </TabsTrigger>
                  <TabsTrigger
                    value="premium_payable"
                    className="tab-trigger bg-white text-black active:bg-blue-900 active:text-white"
                  >
                    Premium Payable Summary
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="premium_computation"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2 "
                >
                  <InputField
                    label="Basic Premium"
                    name="basic_premium"
                    type="number"
                    disabled={true}
                    className="bg-gray-300"
                  />
                  <InputField
                    label="Adjusted Premium"
                    name="adjusted_premium"
                    type="number"
                    disabled={true}
                    className="bg-gray-300"
                  />
                  <InputField
                    label="Sticker Fee"
                    name="sticker_Fee"
                    type="number"
                    disabled={true}
                    className="bg-gray-300"
                  />
                  <InputField
                    label="Brown Card Fee"
                    name="Brown_cardfee"
                    type="number"
                    disabled={true}
                    className="bg-gray-300"
                  />
                  <InputField
                    label="Personal Acident"
                    name="personal_acident"
                    type="number"
                    disabled={true}
                    className="bg-gray-300"
                  />
                  <InputField
                    label="Extra Seats"
                    name="extra_seats"
                    type="number"
                    disabled={true}
                    className="bg-gray-300"
                  />
                  <InputField
                    label="Extra TPPD"
                    name="extra_tppd"
                    type="number"
                    disabled={true}
                    className="bg-gray-300"
                  />
                  <InputField
                    label="Ecowas Peril"
                    name="ecowas_peril"
                    type="number"
                    disabled={true}
                    className="bg-gray-300"
                  />
                  <InputField
                    label="Additional Perils"
                    name="additional_perils"
                    type="number"
                    disabled={true}
                    className="bg-gray-300"
                  />
                </TabsContent>
                <TabsContent
                  value="premium_payable"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                >
                  <InputField
                    label="Applicable Rate(%)"
                    name="appl_rate"
                    type="text"
                    disabled={true}
                    className="bg-gray-300"
                  />
                  <InputField
                    label="Sub Total"
                    name="sub_total"
                    type="text"
                    disabled={true}
                    className="bg-gray-300"
                  />
                  <InputField
                    label="Total Loadings"
                    name="total_loadings"
                    type="text"
                    disabled={true}
                    className="bg-gray-300"
                  />
                  <InputField
                    label="Total Discount"
                    name="total_discount"
                    type="text"
                    disabled={true}
                    className="bg-gray-300"
                  />
                  <InputField
                    label="Total Premium Payable"
                    name="total_premium_payable"
                    type="text"
                    disabled={true}
                    className="bg-gray-300"
                  />
                </TabsContent>
              </Tabs>
            </Form>
          </CardContent>
        </CardHeader>
      </Card>
    </ScrollSection>
  );
};

export default TabsComponent;
