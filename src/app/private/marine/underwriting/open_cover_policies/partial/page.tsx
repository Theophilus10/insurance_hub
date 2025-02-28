"use client";

import { useState, useEffect } from "react";
import * as z from "zod";
import { Card, CardContent, CardTitle } from "@app/components/ui/card";
import { ListTodo } from "lucide-react";
import { Form, FormItem, FormLabel } from "@app/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  InputFormField,
  SelectFormField,
  SelectFormFieldWithOnChange,
  TextareaFormField,
} from "@app/components/forms/ShadcnFormFields";
import { Button } from "@app/components/ui/button";
import { Input } from "@app/components/ui/input";
import { convertDataToSelectObject } from "@app/helpers/index";
import {
  read_institutions,
  read_branches,
  read_institution_types,
  IBranch,
  IInstitution,
  find_customer,
  createOpenCoverPolicy,
} from "@app/server/services";
import InputField from "@app/components/forms/InputField";
import IconButton from "@app/components/ui/IconButton";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import OpenCoverDetailOne from "../ocp-steps/OpenCoverDetailOne";
import OpenCoverDetailTwo from "../ocp-steps/OpenCoverDetailTwo";
import {
  CustomerDetailStep,
  InsuranceCompanyOrIntermediaryStep,
} from "../../single_transit_policies/stp-steps";
import { Step } from "@app/components/stepper/stepperTypeDef";
import { FormStepper } from "@app/components/stepper/StepperComponents";
import { showOpenCoverPolicy } from "@app/server/services/policies/marine/open_cover";
import { useSearchParams } from "next/navigation";
import FullPageLoader from "@app/components/layout/fullPageLoader";

export const STPolicySteps: Array<Step> = [
  {
    component: InsuranceCompanyOrIntermediaryStep,
    label: "Insurance Company & Intermidiary Detail",
  },
  {
    component: CustomerDetailStep,
    label: "Customer Information",
  },
  {
    component: OpenCoverDetailOne,
    label: "Policy Details",
  },
  {
    component: OpenCoverDetailTwo,
    label: "Policy Details Second",
  },
];

const distributionChannel = [
  { value: "indirect", label: "INDIRECT" },
  { value: "direct", label: "DIRECT" },
];

export const defaultValues: any = {
  institution_id: null,
  branch_id: null,
  customer_details: {
    name: "",
    email: "",
    identification_number: "",
    phone: "",
    id: 0,
  },
  distribution_channel: "",
  intermediary_branch_id: null,
  intermediary_type_id: null,
  intermediary_id: null,
  inception_date: "",

  expiry_date: "",
  limit_per_shipment: "",
  estimated_annual_shipment_value: "",
  declaration: "",
  contracting_clause: "",
  cancellation_clause: "",
  conveyance: "",
  voyages: "",
  conditions: "",
  policies_of_cover: "",
  interest: "",
  basis_of_valuation: "",
  rates: "",
  deductible: "",
};

export const OpenCoverFormSchema = z.object({
  institution_id: z.number().min(1, { message: "Select an institution" }),
  branch_id: z.number().min(1, { message: "Select a branch" }),
  distribution_channel: z.string().min(1, { message: "Select a channel" }),
  intermediary_branch_id: z.any(),
  intermediary_type_id: z.any(),
  intermediary_id: z.any(),
  customer_details: z.object({
    name: z.string(),
    identification_number: z.string(),
    phone: z.string(),
    email: z.string(),
    id: z.number(),
  }),
  find_customer: z.string(),
  inception_date: z.string().min(1, { message: "Select a date" }),
  expiry_date: z.string().min(1, { message: "Select a date" }),
  limit_per_shipment: z.string(),
  estimated_annual_shipment_value: z.string(),
  declaration: z.string(),
  contracting_clause: z.string(),
  cancellation_clause: z.string(),
  conveyance: z.string(),
  voyages: z.string(),
  conditions: z.string(),
  policies_of_cover: z.string(),
  interest: z.string(),
  basis_of_valuation: z.string(),
  rates: z.string(),
  deductible: z.string(),
});

const findCustomer = async (identifier: string) => {
  const customer = await find_customer(identifier);
  if (!customer.success) return false;

  return customer.data;
};

interface ParamProps {
  params?: {
    policy_id: string;
  };
}

const Create: React.FC<ParamProps> = () => {
  const searchParams = useSearchParams();
  const policyIdParam = searchParams.get("policy_id");
  const policyId = policyIdParam ? parseInt(policyIdParam) : 0;
  const [branches, setBranches] = useState([]);
  const [intermediaryNames, setIntermediaryNames] = useState([]);
  const [intermediaryBranches, setIntermediaryBranches] = useState([]);
  const [intermediaryErrors, setIntermediaryErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { items, isLoading } = read_institutions();
  const { items: institutionTypes } = read_institution_types();
  const { items: branchesItems, isLoading: branchesLoading } = read_branches();

  const form = useForm<z.infer<typeof OpenCoverFormSchema>>({
    resolver: zodResolver(OpenCoverFormSchema),
    defaultValues,
  });
  useEffect(() => {
    if (branchesItems && !branchesLoading) {
      const newBranches = branchesItems.filter(
        (x: IBranch) => x.institution.id === form.watch("institution_id")
      );
      setBranches(newBranches);
    }
  }, [form.watch("institution_id")]);

  useEffect(() => {
    if (branchesItems && !branchesLoading) {
      const newBranches = branchesItems.filter(
        (x: IBranch) => x.institution.id === form.watch("intermediary_id")
      );
      setIntermediaryBranches(newBranches);
    }
  }, [form.watch("intermediary_id")]);

  useEffect(() => {
    if (items && !isLoading) {
      const intermediaryNamesValues = items.filter(
        (x: IInstitution) =>
          x["institution_type"]?.id === form.watch("intermediary_type_id")
      );
      setIntermediaryNames(intermediaryNamesValues);
    }
  }, [form.watch("intermediary_type_id")]);

  useEffect(() => {
    if (form.watch("distribution_channel") === "direct") {
      form.resetField("intermediary_type_id");
      // form.resetField("intermediaryName");
      form.resetField("intermediary_branch_id");
    }
  }, [form.watch("distribution_channel")]);

  useEffect(() => {
    const fetchDefaultValues = async () => {
      setLoading(true);

      if (!policyId) {
        setLoading(false);
        return; // Exit early if there's no policyId
      }

      try {
        const response: any = await showOpenCoverPolicy(policyId);

        if (response?.data) {
          form.reset(response.data);
          form.setValue("customer_details", response.data.customer);
        } else {
          console.error("Unexpected response format", response);
        }
      } catch (error) {
        console.error("Error fetching policy data", error);
      } finally {
        setLoading(false); // Ensure loading state is updated after the operation
      }
    };

    fetchDefaultValues();
  }, [form.reset, policyId, showOpenCoverPolicy]);

  const onSubmit = async (values: any) => {
    setIntermediaryErrors({});
    if (values.distribution_channel !== "direct") {
      if (values.intermediary_type_id === 0) {
        setIntermediaryErrors((prev) => {
          return {
            ...prev,
            intermediary_type_id: "Select an intermediary type",
          };
        });
      }
      if (values.intermediary_id === 0) {
        setIntermediaryErrors((prev) => {
          return {
            ...prev,
            intermediary_id: "Select an intermediary name",
          };
        });
      }
      if (values.intermediary_branch_id === 0) {
        setIntermediaryErrors((prev) => {
          return {
            ...prev,
            intermediary_branch_id: "Select an intermediary branch",
          };
        });
      }
    }
    if (
      values.distribution_channel !== "direct" &&
      (values.intermediary_type_id === 0 ||
        values.intermediary_id === 0 ||
        values.intermediary_branch_id === 0)
    ) {
      return intermediaryErrors;
    }

    const formData: any = {
      customer_id: values.customer_details?.id,
      institution_id: values.institution_id,
      branch_id: values.branch_id,
      distribution_channel: values.distribution_channel,
      intermediary_branch_id: values.intermediary_branch_id,
      intermediary_id: values.intermediary_id,
      intermediary_type_id: values.intermediary_type_id,
      expiry_date: values.expiry_date,
      limit_per_shippment: values?.limit_per_shippment,
      estimated_annual_shipment_value: values.estimated_annual_shipment_value,
      declaration: values.declaration,
      contracting_clause: values.contracting_clause,
      cancellation_clause: values.cancellation_clause,
      conveyance: values.conveyance,
      voyages: values.voyages,
      conditions: values.conditions,
      policies_of_cover: values.policies_of_cover,
      interest: values.interest,
      basis_of_valuation: values.basis_of_valuation,
      rates: values.rates,
      deductible: values.deductible,
      limit_per_shipment: values.limit_per_shippment,
    };

    const response = await createOpenCoverPolicy(formData);
    // console.log(response);
  };

  const setCustomerValues = async () => {
    const searchValue = form.watch("find_customer");

    const customer = await findCustomer(searchValue);

    if (customer) {
      console.log(customer, "customer info");
      toast.success("Customer Found Successfully");
      form.setValue("customer_details.id", customer.id);
      form.setValue("customer_details.name", customer.name);
      form.setValue("customer_details.phone", customer.phone);
      form.setValue("customer_details.email", customer.email);
      form.setValue(
        "customer_details.identification_number",
        customer.identification_number
      );
    } else {
      form.setValue("customer_details.id", 0);
      form.setValue("customer_details.name", "");
      form.setValue("customer_details.phone", "");
      form.setValue("customer_details.email", "");
      form.setValue("customer_details.identification_number", "");
      form.setValue("find_customer", ""); // Reset the search input field

      toast.error("Customer not found. Please provide valid customer details.");
    }
  };

  const { data: session } = useSession();
  console.log(session, "eiii");

  useEffect(() => {
    if (session?.user?.user?.institution_type?.name == "Insurance Company") {
      const institutionOption = {
        label: session?.user?.user?.institution?.name,
        value: session?.user?.user?.institution?.id,
      };
      const branchOption = {
        label: session?.user?.user?.branch?.name,
        value: session?.user?.user?.branch?.id,
      };
      console.log(institutionOption, "option");
      form.setValue("institution_id", institutionOption.value);
      form.setValue("branch_id", branchOption.value);
    }
  }, [session, form]);

  // console.log(form.watch(), "values");
  // console.log(form.formState.errors, "errros");

  const filteredInstitution = items?.filter(
    (item: any) => item?.institution_type?.name === "Insurance Company"
  );

  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <div>
      <Card>
        <CardTitle className="flex  items-center gap-2 font-thin border-b-[1px] p-5">
          <ListTodo />
          Open Cover Policy
        </CardTitle>
        <CardContent className="px-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* <div className="border-b-[5px]">
                <div className="p-10 border-b-[1px] grid grid-cols-1 md:grid-cols-2 gap-8   ">
                  <SelectFormFieldWithOnChange
                    form={form}
                    name="institution_id"
                    label="Insurance Company"
                    options={convertDataToSelectObject(
                      filteredInstitution,
                      "name",
                      "id"
                    )}
                    disabled={
                      session?.user?.user?.institution_type?.name ===
                      "Insurance Company"
                    }
                  />
                  <SelectFormFieldWithOnChange
                    form={form}
                    name="branch_id"
                    label="Branch Office"
                    options={convertDataToSelectObject(branches, "name", "id")}
                    disabled={
                      session?.user?.user?.institution_type?.name ===
                      "Insurance Company"
                    }
                  />
                </div>
                <div className="p-10 border-b-[1px] grid grid-cols-1 md:grid-cols-2 gap-8 ">
                  <SelectFormField
                    form={form}
                    name="distribution_channel"
                    label="Distribution Channel"
                    options={distributionChannel}
                    showWatchValue={false}
                  />
                  <SelectFormField
                    form={form}
                    name="intermediary_type_id"
                    label="Intermediary Type:"
                    options={convertDataToSelectObject(
                      institutionTypes,
                      "name",
                      "id"
                    )}
                    disabled={form.watch("distribution_channel") === "direct"}
                    placeholder="Select an intermediary type"
                  />
                  <SelectFormField
                    form={form}
                    name="intermediary_id"
                    label="Intermediary Name:"
                    options={convertDataToSelectObject(
                      intermediaryNames,
                      "name",
                      "id"
                    )}
                    disabled={form.watch("distribution_channel") === "direct"}
                    placeholder="Select an intermediary name"
                  />
                  <SelectFormField
                    form={form}
                    name="intermediary_branch_id"
                    label="Branch Office of Intermediary:"
                    options={convertDataToSelectObject(
                      intermediaryBranches,
                      "name",
                      "id"
                    )}
                    disabled={form.watch("distribution_channel") === "direct"}
                    placeholder="Select a branch office"
                  />
                </div>
                <div className="md:p-10">
                  <div className="text-lg md:text-xl font-extrabold">
                    Customer Info
                  </div>
                  <div className="flex flex-col md:flex-row md:space-x-20">
                    <div className="md:w-1/2">
                      <div>
                        <h3 className="font-semibold py-5">Policy To:</h3>
                        <InputField
                          label="Full Name, ID, or Email"
                          name="find_customer"
                          type="search"
                          className="border m-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                      </div>
                      <div className="flex gap-6">
                        <IconButton
                          icon="mdi:search"
                          color="primary"
                          onClick={setCustomerValues}
                        />
                        <Button>Add New Customer</Button>
                      </div>
                    </div>

                    <div className="w-full bg-gray-100 p-4 rounded-md mt-6 md:mt-0 md:w-1/2 lg:max-w-[300px] xl:max-w-[400px]">
                      <div>
                        <label className="block font-medium mb-1">
                          Full Name
                        </label>
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
              </div> */}

              <FormStepper
                steps={STPolicySteps}
                form={form}
                onStepCompleted={onSubmit}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Create;
