"use client";
import InputField from "@app/components/forms/InputField";
import { Button } from "@app/components/ui/button";
import React, { useEffect, useState } from "react";
import { FormSchema } from "../page";
import {
  createOpenCoverPolicy,
  createSingleTransitPolicy,
  find_customer,
  patchSingleTransitPolicy,
  showSingleTransitPolicy,
} from "@app/server/services";
import { ICustomer } from "../../../settings/shipping_types/partials/columns";
import toast from "react-hot-toast";
import {
  StepperComponent,
  StepperComponentParam,
} from "@app/components/stepper/stepperTypeDef";
import z from "zod";
import { UseFormReturn } from "react-hook-form";
import StepperButton from "@app/components/stepper/ui/StepperButton";
import { useRouter, useSearchParams } from "next/navigation";
import {
  STEP_QUERY_PARAM_KEY,
  updateOrAppendUrlQueryParam,
} from "@app/components/stepper/StepperComponents";
import { useSession } from "next-auth/react";
import { patchOpenCoverPolicy } from "@app/server/services/policies/marine/open_cover";

const findCustomer = async (identifier: string) => {
  const customer = await find_customer(identifier);
  if (!customer.success) return false;

  return customer.data;
};

interface CustomerStepProps extends STPolicySchema {
  params?: {
    policy_id: string;
  };
}

export type STPolicySchema = StepperComponentParam<
  UseFormReturn<z.infer<typeof FormSchema>>
>;

export const CustomerDetailStep: React.FC<CustomerStepProps> = ({
  form,
  params,
  ...rest
}) => {
  const { onNextStep, ...withOutOnNextStep } = rest;
  const router = useRouter();
  const [customerIdFromUrl, setCustomerIdFromUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const policyIdParam = searchParams.get("policy_id");
  const policyId = policyIdParam ? parseInt(policyIdParam) : 0;

  useEffect(() => {
    const customerId = searchParams.get("customer_id");
    if (customerId) {
      setCustomerIdFromUrl(customerId);
      fetchCustomerDetails(customerId);
    }
  }, [searchParams]);

  const fetchCustomerDetails = async (customerId: string) => {
    try {
      const customer = await findCustomer(customerId);
      if (customer) {
        populateCustomerDetails(customer);
        toast.success("Customer Found Successfully");
      } else {
        throw new Error("Customer not found");
      }
    } catch (error) {
      clearCustomerDetails();
      toast.error("Customer not found. Please provide valid customer details.");
    }
  };

  useEffect(() => {
    const customerId = searchParams.get("customer_id");
    if (customerId) {
      setCustomerIdFromUrl(customerId);
      fetchCustomerDetails(customerId);
    }
  }, [searchParams]);

  const populateCustomerDetails = (customer: ICustomer) => {
    form.setValue("customer_details.id", customer.id);
    form.setValue("customer_details.name", customer.name);
    form.setValue("customer_details.phone", customer.phone);
    form.setValue("customer_details.email", customer.email);
    form.setValue(
      "customer_details.identification_number",
      customer.identification_number
    );
  };

  const clearCustomerDetails = () => {
    form.setValue("customer_details.id", 0);
    form.setValue("customer_details.name", "");
    form.setValue("customer_details.phone", "");
    form.setValue("customer_details.email", "");
    form.setValue("customer_details.identification_number", "");
    form.setValue("find_customer", ""); // Reset the search input field
  };

  const handleFindCustomerClick = async () => {
    const searchValue = form.watch("find_customer");

    if (searchValue) {
      setLoading(true);
      try {
        await fetchCustomerDetails(searchValue);
      } catch (error) {
        console.error("Error fetching customer details:", error);
        // Handle error as needed
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please enter a customer ID to search.");
    }
  };
  const getCurrentUrl = window.location.href;
  const isURLForOpenCoverPolicy = getCurrentUrl.includes("open_cover_policies");
  console.log(isURLForOpenCoverPolicy, "url");
  const isURLForSingleTranstPolicy = getCurrentUrl.includes(
    "single_transit_policies"
  );

  const handleOnNextStep = async () => {
    // Check Validation of current step

    const isValid = await form.trigger(["customer_details"], {
      shouldFocus: true,
    });

    if (!isValid) {
      return;
    }

    const formData: any = {
      customer_id: form.getValues("customer_details.id"),
      current_step_index: 1,
    };

    try {
      let response: any;

      switch (true) {
        case Boolean(policyId) && isURLForSingleTranstPolicy:
          // If policyId exists and the URL is for Single Transit Policy, update the policy
          response = await patchSingleTransitPolicy(policyId, formData);
          break;

        case Boolean(policyId) && isURLForOpenCoverPolicy:
          // If policyId exists and the URL is for Open Cover Policy, update the policy
          response = await patchOpenCoverPolicy(policyId, formData);
          break;

        case !Boolean(policyId) && isURLForOpenCoverPolicy:
          // If policyId does not exist and the URL is for Open Cover Policy, create the policy
          response = await createOpenCoverPolicy(formData);
          break;

        default:
          // If none of the above cases match, assume it's a creation of Single Transit Policy
          response = await createSingleTransitPolicy(formData);
          break;
      }

      const id = response?.data?.policy?.id;
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
      toast.error(error?.message);
    }
  };

  // useEffect(() => {
  //   const fetchDefaultValues = async () => {
  //     if (!policyId) return;

  //     try {
  //       const response = await showSingleTransitPolicy(policyId);
  //       if (response?.data) {
  //         form.setValue("customer_details", response?.data.customer);
  //       } else {
  //         console.error("Unexpected response format", response);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching policy data", error);
  //     }
  //   };
  //   fetchDefaultValues();
  // }, [form.reset, policyId, showSingleTransitPolicy]);

  return (
    <div>
      <div className="md:p-10">
        <div className="text-lg md:text-xl font-extrabold">Customer Info</div>

        <div className="flex flex-col md:flex-row md:space-x-20">
          <div className="md:w-1/2">
            {!customerIdFromUrl && (
              <div>
                <h3 className="font-semibold py-5">Policy To:</h3>
                <div>
                  <InputField
                    label="Full Name, ID, or Email"
                    name="find_customer"
                    type="search"
                    className="border mb-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="flex gap-6">
                  <Button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-600"
                    onClick={handleFindCustomerClick}
                    disabled={loading}
                  >
                    {loading ? "Finding..." : "Find"}
                  </Button>
                  <Button>Add New Customer</Button>
                </div>
              </div>
            )}
          </div>

          <div className="w-full bg-gray-100 p-4 rounded-md mt-6 md:mt-0 md:w-1/2 lg:max-w-[300px] xl:max-w-[400px]">
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <p className="bg-gray-300 p-2 rounded-md h-10 mb-2">
                {form.watch("customer_details.name")}
              </p>
            </div>
            <div>
              <label className="block font-medium mb-1">Phone</label>
              <p className="bg-gray-300 p-2 rounded-md h-10 mb-2">
                {form.watch("customer_details.phone")}
              </p>
            </div>
            <div>
              <label className="block font-medium mb-1">Email</label>
              <p className="bg-gray-300 p-2 rounded-md h-10 mb-2">
                {form.watch("customer_details.email")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <StepperButton onNextStep={handleOnNextStep} {...withOutOnNextStep} />
    </div>
  );
};

export default CustomerDetailStep;
