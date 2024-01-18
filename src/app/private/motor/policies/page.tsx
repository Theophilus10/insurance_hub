"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@app/components/ui/card";
import React, { useState } from "react";

import ScrollSection from "@app/components/ui/scrollSection";

import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import SelectField from "@app/components/forms/SelectField";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@app/components/ui/button";
import IconButton from "@app/components/ui/IconButton";
import Divider from "@app/components/ui/Divider";
import Loadings, { LoadingType } from "@app/components/motor/partials/loadinds";
import { useForm } from "react-hook-form";
import Discounts, {
  DiscountType,
} from "@app/components/motor/partials/discount";
import Modal from "@app/components/ui/modal";
import FleetUpload from "../fleet_upload/page";

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
const schema = z.object({
  insurance_company: z
    .string()
    .min(1, { message: "Select an Insurance Company" }),
  branch: z.string().min(1, { message: "Select a Branch" }),
  distribution_channel: z
    .string()
    .min(1, { message: "Is it DIRECT or INDIRECT" }),
  intermediary_type: z
    .string()
    .min(1, { message: "Select an Intermediary type" }),
  intermediary_name: z
    .string()
    .min(1, { message: "Select an Intermediary name" }),
  intermediary_branch_ofice: z
    .string()
    .min(1, { message: "Select Branch of an Intermediary" }),
  find_customer: z.string(),
  registration_number: z.string(),
  make: z.string(),
  model: z.string(),
  color: z.string(),
  chasis_number: z.string(),
  year_manufacture: z.string(),
  engine_capacity: z.string(),
  mileage: z.string(),
  body_type: z.string(),
  seats: z.string(),
  loading: z.array(
    z.object({
      loadings: z.string(),
      loading_rate: z.number(),
    })
  ),
  discount: z.array(
    z.object({
      discounts: z.string(),
      discount_rate: z.number(),
    })
  ),
});
// const findCustomer = (emailPhoneId: string) => {
//   return customers.find(
//     customer.email === emailPhoneId ||
//       customer.identification_number === emailPhoneId ||
//       customer.phone === emailPhoneId
//   );
// };

const tabsList = [
  "Loadings",
  "Discounts",
  "Premium Computation",
  "Premium Payable Summary",
];
const TabsComponent = () => {
  const [selectedTab, setSelectedTab] = useState("Loadings");
  const [isChecked, setChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      insurance_company: "",
      branch: "",
      distribution_channel: "",
      intermediary_type: "",
      intermediary_name: "",
      intermediary_branch_ofice: "",
      find_customer: "",
      registration_number: "",
      make: "",
      model: "",
      color: "",
      chasis_number: "",
      year_manufacture: "",
      engine_capacity: "",
      mileage: "",
      body_type: "",
      seats: "",
      loading: [],
      discount: [],
    },
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values);
  }

  return (
    <ScrollSection className="container mx-auto px-4 lg:px-8 py-6 w-full">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl py-5 font-extrabold">
            MOTOR INSURANCE PROPOSAL
          </CardTitle>
          <Divider />

          <CardContent>
            <Form schema={schema}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-5">
                  <SelectField
                    label="Insurance Company"
                    name="insurance_company"
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
                <CardTitle className="text-lg md:text-xl font-extrabold py-3">
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
                <CardTitle className="text-lg md:text-xl font-extrabold py-3">
                  Vehicle Info
                </CardTitle>
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
                <Divider className="border-b-4 border-black-500" />
                <CardTitle className="text-lg md:text-xl font-extrabold py-3">
                  Policy Info
                </CardTitle>
                <div className="space-x-7">
                  <div className="flex space-x-5">
                    <p>Fleet</p>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => setChecked(!isChecked)}
                    />
                    <div
                      style={{ visibility: isChecked ? "visible" : "hidden" }}
                    >
                      <Button type="button" onClick={openModal}>
                        Upload Fleet
                      </Button>
                    </div>
                  </div>

                  <Modal
                    open={isModalOpen}
                    size="xl"
                    title="Fleet Upload"
                    closeModal={closeModal}
                  >
                    <p>
                      <FleetUpload closeModal={closeModal} />
                    </p>
                  </Modal>
                </div>
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

                <Divider className="border-b-8 border-black-500" />

                <div className="border-b-[1px] p-5">
                  <div className="flex items-center  gap-1  ">
                    {tabsList.map((tab) => (
                      <button
                        type="button"
                        className={`${
                          tab.toLowerCase() === selectedTab.toLowerCase() &&
                          "bg-blue-900 font-medium text-white"
                        } px-4 py-2 rounded-md text-center`}
                        key={tab}
                        onClick={() => setSelectedTab(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  {selectedTab === "Loadings" && (
                    <div className="p-5">
                      <Loadings
                        loadings={form.watch("loading")}
                        addLoadings={(loads: LoadingType) =>
                          form.setValue("loading", [
                            loads,
                            ...form.watch("loading"),
                          ])
                        }
                      />
                    </div>
                  )}
                </div>
                {selectedTab === "Discounts" && (
                  <div className="p-5">
                    <Discounts
                      discounts={form.watch("discount")}
                      addDiscounts={(disc: DiscountType) =>
                        form.setValue("discount", [
                          disc,
                          ...form.watch("discount"),
                        ])
                      }
                    />
                  </div>
                )}
                {selectedTab === "Premium Computation" && (
                  <div className="p-5">Content for Tab 1 goes here</div>
                )}
                {selectedTab === "Premium Payable Summary" && (
                  <div className="p-5">Content for Tab 1 goes here</div>
                )}
              </form>
              <div className="flex justify-end mx-12 my-5">
                <Button type="submit">Submit</Button>
              </div>
            </Form>
          </CardContent>
        </CardHeader>
      </Card>
    </ScrollSection>
  );
};

export default TabsComponent;
