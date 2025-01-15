"use client";
import {
  InputFormField,
  SelectFormField,
  SelectFormFieldWithOnChange,
} from "@app/components/forms/ShadcnFormFields";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@app/components/ui/form";
import { Input } from "@app/components/ui/input";
import {
  convertDataToSelectObject,
  convertDataToSelectObjectNameAsValue,
} from "@app/helpers";
import React, { useState } from "react";
import { STPolicySchema } from "./CustomerDetailStep";
import {
  createSingleTransitPolicy,
  IPort,
  patchSingleTransitPolicy,
} from "@app/server/services";
import {
  read_countries,
  read_institutions,
  read_branches,
  read_institution_types,
  read_shipping_types,
  read_banks,
  read_ports,
  read_carriers,
  read_currencies,
  IBranch,
  IInstitution,
  read_customer,
  find_customer,
  CustomerParams,
  CustomerDTO,
  ICustomer,
  BranchDTO,
} from "@app/server/services";
import StepperButton from "@app/components/stepper/ui/StepperButton";
import {
  STEP_QUERY_PARAM_KEY,
  updateOrAppendUrlQueryParam,
} from "@app/components/stepper/StepperComponents";
import { useRouter, useSearchParams } from "next/navigation";

interface PolicyDetailStepProps extends STPolicySchema {
  params?: {
    policy_id: string;
  };
}

export const PolicyDetailStep: React.FC<PolicyDetailStepProps> = ({
  form,
  params,
  ...rest
}) => {
  const { onNextStep, ...withOutOnNextStep } = rest;
  const router = useRouter();

  const searchParams = useSearchParams();
  const policyIdParam = searchParams.get("policy_id");
  const policyId = policyIdParam ? parseInt(policyIdParam) : 0;
  const { items: shippingTypes } = read_shipping_types();
  const { items: countries } = read_countries();
  const { items: banks } = read_banks();
  const { items: ports } = read_ports();
  const { items: carriers } = read_carriers();
  const { items: currencies } = read_currencies();

  const getCountriesPorts = (name: any, ports: []) => {
    const filteredPorts = ports?.filter(
      (port: IPort) => port.country.name === name
    );
    return convertDataToSelectObjectNameAsValue(filteredPorts);
  };

  const handleOnNextStep = async () => {
    const isValid = await form.trigger([
      "issue_date",
      "no_known_loss",
      "shipping_type_id",
      "currency_id",
      "exchange_rate",
      "commercial_invoice_number",
      "bill_of_laden_number",
      "bank_id",
      "carrier_id",
      "flight_vessel_name",
      "flight_vessel_number",
      "vessel_flag",
      "country_of_importation",
      "country_of_destination",
      "port_of_loading",
      "port_of_destination",
      "sailing_date",
      "estimated_arrival_date",
    ]);

    if (!isValid) {
      return;
    }

    const formData: any = {
      issue_date: form.getValues("issue_date"),
      no_known_loss: form.getValues("no_known_loss"),
      shipping_type_id: form.getValues("shipping_type_id"),
      currency_id: form.getValues("currency_id"),
      exchange_rate: form.getValues("exchange_rate"),
      commercial_invoice_number: form.getValues("commercial_invoice_number"),
      bill_of_laden_number: form.getValues("bill_of_laden_number"),
      bank_id: form.getValues("bank_id"),
      carrier_id: form.getValues("carrier_id"),
      flight_vessel_name: form.getValues("flight_vessel_name"),
      flight_vessel_number: form.getValues("flight_vessel_number"),
      vessel_flag: form.getValues("vessel_flag"),
      country_of_importation: form.getValues("country_of_importation"),
      country_of_destination: form.getValues("country_of_destination"),
      port_of_loading: form.getValues("port_of_loading"),
      port_of_destination: form.getValues("port_of_destination"),
      sailing_date: form.getValues("sailing_date"),
      estimated_arrival_date: form.getValues("estimated_arrival_date"),
      policy_excess: form.getValues("policy_excess"),
      current_step_index: 2,
    };

    try {
      const response: any = policyId
        ? await patchSingleTransitPolicy(policyId, formData)
        : await createSingleTransitPolicy(formData);

      console.log(response, "sending request");

      const id = response?.data?.policy?.id;
      //   const status = response?.status;

      // Check if the request was successful
      if (response?.success) {
        // Move to the next step
        onNextStep();

        if (id) {
          // Update URL with policy ID and next step query parameter
          const urlWithId = updateOrAppendUrlQueryParam(
            window.location.href,
            "policy_id",
            id
          );

          const urlWithNextStep = updateOrAppendUrlQueryParam(
            urlWithId,
            STEP_QUERY_PARAM_KEY,
            "Customer Information"
          );

          // Redirect to the updated URL
          router.push(urlWithNextStep);
        }
      }
    } catch (error: any) {
      console.error(
        error?.message || "An error occurred while processing the request."
      );
    }
  };
  return (
    <div>
      <div className="border-b-[5px]">
        <div className="p-10 border-b-[1px] md:grid space-y-4 md:space-y-0  md:grid-cols-2 md:gap-8">
          <FormField
            control={form.control}
            name="issue_date"
            render={({ field }) => (
              <FormItem className="flex flex-col md:flex-row md:items-center gap-4 md:col-span-2 ">
                <FormLabel>Issue Date:</FormLabel>
                <FormControl>
                  <Input {...field} className=" md:w-80" type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <InputFormField
            name="no_known_loss"
            form={form}
            label="No Known Loss"
          />
          <SelectFormField
            form={form}
            name="shipping_type_id"
            label="Shipping Type:"
            options={convertDataToSelectObject(shippingTypes, "name", "id")}
          />
          <SelectFormFieldWithOnChange
            form={form}
            name="currency_id"
            label="Currency"
            options={convertDataToSelectObject(currencies, "name", "id")}
          />

          <InputFormField
            form={form}
            name="exchange_rate"
            label="Exchange Rate"
            type="number"
          />
          <InputFormField
            form={form}
            name="commercial_invoice_number"
            label="Commercial Invoice"
          />
          <InputFormField
            form={form}
            name="bill_of_laden_number"
            label="Bill Of Laden Number"
          />
          <SelectFormField
            form={form}
            name="bank_id"
            label="Letter Of Credit"
            options={convertDataToSelectObject(banks)}
          />
          <SelectFormField
            form={form}
            name="carrier_id"
            label="Carrier"
            options={convertDataToSelectObject(carriers)}
          />
          <InputFormField
            form={form}
            name="flight_vessel_name"
            label="Vessel/Flight Name"
          />
          <InputFormField
            form={form}
            name="flight_vessel_number"
            label="Vessel/Flight Number"
          />
          <div className="md:col-span-2">
            <InputFormField
              form={form}
              name="vessel_flag"
              label="Vessel Flag"
            />
          </div>
          <SelectFormField
            form={form}
            name="country_of_importation"
            label="Country of Importation/Exportation"
            options={convertDataToSelectObjectNameAsValue(countries)}
          />
          <SelectFormField
            form={form}
            name="country_of_destination"
            label="Country of Destination"
            options={convertDataToSelectObjectNameAsValue(countries)}
          />
          <SelectFormField
            form={form}
            name="port_of_loading"
            label="Port of Loading"
            options={getCountriesPorts(
              form.watch("country_of_importation"),
              ports
            )}
          />
          <SelectFormField
            form={form}
            name="port_of_destination"
            label="Port of Destination"
            options={getCountriesPorts(
              form.watch("country_of_destination"),
              ports
            )}
          />
          <FormField
            control={form.control}
            name="sailing_date"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4 px-5">
                <FormLabel>Sailing Date:</FormLabel>
                <FormControl>
                  <Input {...field} className="w-80" type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="estimated_arrival_date"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4 px-5">
                <FormLabel>Estimated Arrival Date:</FormLabel>
                <FormControl>
                  <Input {...field} className="w-80" type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:col-span-2">
            <InputFormField
              form={form}
              name="policy_excess"
              label="Policy Excess"
            />
          </div>
        </div>
        <StepperButton onNextStep={handleOnNextStep} {...withOutOnNextStep} />
      </div>
    </div>
  );
};

export default PolicyDetailStep;
