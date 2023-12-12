// import { Button } from "@app/components/ui/button";
// import InputField from "@app/components/forms/InputField";
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
import PremiumComputation from "@app/app/views/underwriting/motor/PremiumComputation";
import PremiumPayable from "@app/app/views/underwriting/motor/PremiumPayable";
import CustomerInfo from "@app/app/views/underwriting/motor/CustomerInfo";
import VehicleInfo from "@app/app/views/underwriting/motor/VehicleInfo";
import PolicyInfo from "@app/app/views/underwriting/motor/PolicyInfo";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import SelectField from "@app/components/forms/SelectField";
import { object, string } from "zod";
import { Button } from "@app/components/ui/button";
import IconButton from "@app/components/ui/IconButton";
import Divider from "@app/components/ui/Divider";
import { Input } from "@app/components/ui/input";

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
      <Tabs defaultValue="insurance-company" className="w-full">
        <TabsList className="flex sm:flex-row overflow-y-auto my-10 gap-1 lg:gap-4">
          <TabsTrigger
            value="insurance-company"
            className="cursor-pointer text-[10px] md:text-sm lg:text-base py-2 px-4 border border-transparent hover:border-blue-800 hover:bg-gray-100 rounded transition duration-300 font-extrabold"
          >
            Insurance Company
          </TabsTrigger>
          <TabsTrigger
            value="customer-info"
            className="cursor-pointer text-[10px] md:text-sm lg:text-base py-2 px-4 border border-transparent hover:border-blue-800 hover:bg-gray-100 rounded transition duration-300 font-extrabold"
          >
            Customer Information
          </TabsTrigger>
          <TabsTrigger
            value="vehicle-info"
            className="cursor-pointer text-[10px] md:text-sm lg:text-base py-2 px-4 border border-transparent hover:border-blue-800 hover:bg-gray-100 rounded transition duration-300 font-extrabold"
          >
            Vehicle Information
          </TabsTrigger>
          <TabsTrigger
            value="policy-info"
            className="cursor-pointer text-[10px] md:text-sm lg:text-base py-2 px-4 border border-transparent hover:border-blue-800 hover:bg-gray-100 rounded transition duration-300 font-extrabold"
          >
            Policy Information
          </TabsTrigger>
        </TabsList>

        <Form schema={schema}>
          <TabsContent value="insurance-company" className="py-4 w-full">
            <Card className="max-w-full lg:max-w-screen w-full">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  Insurance Company
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Make changes to your account here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <SelectField
                    label="Select Company"
                    name="company"
                    required
                    options={options}
                  />
                  <InputField
                    label="code"
                    name="code"
                    disabled={true}
                    className="bg-gray-300"
                  />
                  <InputField
                    label="Phone"
                    name="phone"
                    disabled={true}
                    className="bg-gray-300"
                  />
                  <InputField
                    label="Email"
                    name="email"
                    disabled={true}
                    className="bg-gray-300"
                  />
                  <InputField
                    label="Address"
                    name="adress"
                    disabled={true}
                    className="bg-gray-300"
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customer-info" className="py-4 w-full">
            <Card className="max-w-full lg:max-w-screen w-full">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Policy To:</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Search for a customer. If not add a new customer
                </CardDescription>
                <CardContent>
                  <InputField
                    label="fullname or ID or Email "
                    name="find_customer"
                  />
                  <div className="flex py-5 gap-6 ">
                    <IconButton icon="mdi:search" color="primary" />
                    <Button>Add New Customer</Button>
                  </div>

                  <InputField
                    label="First Name"
                    name="first_name"
                    value="yes"
                    disabled={true}
                    className="bg-gray-300"
                  />
                  <InputField
                    label="Last Name"
                    name="last_name"
                    disabled={true}
                    className="bg-gray-300"
                  />
                  <InputField
                    label="Other Name"
                    name="other_name"
                    disabled={true}
                    className="bg-gray-300"
                  />
                  <InputField
                    label="Phone"
                    name="phone"
                    disabled={true}
                    className="bg-gray-300"
                  />
                </CardContent>
              </CardHeader>
            </Card>
          </TabsContent>
          <TabsContent value="vehicle-info" className="py-4">
            <Card className="max-w-full lg:max-w-screen w-full">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  About Vehicle
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Enter Your Vehicle information here
                </CardDescription>
                <CardContent>
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
                </CardContent>
              </CardHeader>
            </Card>
          </TabsContent>
          <TabsContent value="policy-info" className="py-4">
            <Card className="max-w-full lg:max-w-screen w-full">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Policy</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Policy information goes here
                </CardDescription>
                <CardContent>
                  <div className="flex gap-8 py-4">
                    <div className="flex-1">
                      <SelectField
                        label="Currency"
                        name="currency"
                        required
                        options={currencyOptions}
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
                  <div className="flex gap-8 py-4">
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
                  <div className="flex gap-8 py-4">
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
                  <div className="flex gap-8 py-4">
                    <div className="flex-1">
                      <InputField
                        label="Sum Insured"
                        name="sum_insured"
                        type="number"
                      />
                    </div>
                    <div className="flex-1">
                      <InputField label="Rate" name="rate" disabled={true} />
                    </div>
                  </div>
                  <SelectField
                    label="Excess"
                    name="excess"
                    required
                    options={excessTypeOptions}
                  />
                  <div className="flex gap-8 py-4">
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
                  <div className="flex gap-8 py-4">
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
                  <div className="flex gap-8 py-4">
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
                </CardContent>
              </CardHeader>
            </Card>
          </TabsContent>
        </Form>
      </Tabs>
      {/* <div className="md:flex gap-[20px]">
          <PremiumComputation />
          <PremiumPayable />
        </div> */}
    </ScrollSection>
  );
};

export default TabsComponent;
