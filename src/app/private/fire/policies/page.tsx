"use client";

import * as z from "zod";
import { useState, useEffect } from "react";
import { Card, CardContent, CardTitle } from "@app/components/ui/card";
import { ListTodo } from "lucide-react";
import { Form, FormItem, FormLabel } from "@app/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  InputFormField,
  SelectFormField,
} from "@app/components/forms/ShadcnFormFields";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/components/ui/select";
import { Button } from "@app/components/ui/button";
import { Input } from "@app/components/ui/input";
import {
  convertDataToSelectObject,
  convertDataToSelectObjectWithDescription,
} from "@app/helpers/index";
import {
  read_institutions,
  read_branches,
  read_institution_types,
  read_currencies,
  IBranch,
  IInstitution,
  read_customer,
  read_banks,
  find_customer,
} from "@app/server/services";
import {
  BuildingItemDetailsType,
  ExcessType,
  PerilsType,
} from "@app/types/policyTypes";
import BuildingItemDetails from "@app/components/fire/BuildingItemDetails";
import Perils from "@app/components/fire/Perils";
import Excesses from "@app/components/fire/Excesses";
import InputField from "@app/components/forms/InputField";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { createFirePolicy } from "@app/server/services/policies/fire-policies";
import { read_fire_risk_class } from "@app/server/services/fire-settings/risk-classes";

const tabsList = [
  "Building/Item Details",
  "Perils",
  "Excesses",
  "Document uploads",
];

const addToTable = (value: any, watchValue: string, form: any) =>
  form.setValue(watchValue, [value, ...form.watch(watchValue)]);

const updateTableValue = (value: any, watchValue: string, form: any) => {
  const withoutValue = form
    .watch(watchValue)
    .filter((t: any) => t.id !== value.id);

  form.setValue(watchValue, [value, ...withoutValue]);
};

const deleteTableValue = (id: string, watchValue: any, form: any) => {
  const filteredValues = form.watch(watchValue).filter((t: any) => t.id !== id);
  form.setValue(watchValue, filteredValues);
};

const distribution_channel = [
  { value: "indirect", label: "INDIRECT" },
  { value: "direct", label: "DIRECT" },
];

const formSchema = z.object({
  institution_id: z.number().min(1, { message: "Select an institution" }),
  branch_id: z.number().min(1, { message: "Select a branch" }),
  distribution_channel: z.string().min(1, { message: "Select a channel" }),
  intermediary_type_id: z.number(),
  intermediary_id: z.number(),
  intermediary_branch_id: z.number(),
  customer_details: z.object({
    id: z.number().min(1, { message: "Select a customer" }),
    name: z.string(),
    phone: z.string(),
    identification_number: z.string(),
    email: z.string(),
  }),
  find_customer: z.string(),
  inception_date: z.string().min(1, { message: "Select a date" }),
  expiry_date: z.string().min(1, { message: "Select a date" }),
  currency: z.number().min(1, { message: "Select a currency" }),
  exchange_rate: z.string().min(1, { message: "Enter a valid rate" }),
  fire_risk_class_id: z.number().min(1, { message: "Select a risk class" }),
  insured_interest: z.string().min(1, { message: "Select insured interest" }),
  bank_id: z.number().min(1, { message: "Select a bank" }),
  property_type: z.string().min(1, { message: "Select a property type" }),
  policy_items: z
    .array(
      z.object({
        id: z.string(),
        item_description: z.string(),
        value: z.number(),
        region: z.string(),
        collapse_rate: z.number(),
        fire_rate: z.number(),
        public_liability_rate: z.number(),
        digital_address: z.string(),
        item_location: z.string(),
      })
    )
    .optional(),
  policy_perils: z
    .array(
      z.object({
        id: z.string(),
        peril: z.string(),
        rate: z.number(),
        description: z.string(),
      })
    )
    .optional(),
  policy_excesses: z
    .array(
      z.object({
        id: z.string(),
        excess: z.string(),
        description: z.string(),
        rate: z.number(),
      })
    )
    .optional(),
});

const findCustomer = async (identifier: string) => {
  const customer = await find_customer(identifier);
  if (!customer.success) return false;

  return customer.data;
};

const Page = () => {
  const [selectedTab, setSelectedTab] = useState("building/item details");
  const [branches, setBranches] = useState([]);
  const [intermediaryNames, setIntermediaryNames] = useState([]);
  const [intermediaryBranches, setIntermediaryBranches] = useState([]);
  const [customerError, setCustomerError] = useState("");
  const [intermediaryErrors, setIntermediaryErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [customerIdFromUrl, setCustomerIdFromUrl] = useState<string>("");
  const { items, isLoading } = read_institutions();
  const { items: institutionTypes } = read_institution_types();
  const { items: branchesItems, isLoading: branchesLoading } = read_branches();
  const { items: currencies } = read_currencies();
  const { items: banks } = read_banks();
  const { items: fireRiskClasses } = read_fire_risk_class();

  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      institution_id: 0,
      branch_id: 0,
      distribution_channel: "",
      intermediary_id: 0,
      intermediary_type_id: 0,
      intermediary_branch_id: 0,
      insured_interest: "",
      property_type: "",
      customer_details: {
        name: "",
        email: "",
        identification_number: "",
        phone: "",
        id: 0,
      },
      inception_date: "",
      expiry_date: "",
      currency: 0,
      exchange_rate: "",
      bank_id: 0,
      policy_items: [],
      policy_perils: [],
      policy_excesses: [],
    },
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
      const intermediaryNameValues = items.filter(
        (x: IInstitution) =>
          x["institution_type"]?.id === form.watch("intermediary_type_id")
      );
      setIntermediaryNames(intermediaryNameValues);
    }
  }, [form.watch("intermediary_type_id")]);

  useEffect(() => {
    if (form.watch("distribution_channel") === "direct") {
      form.resetField("intermediary_type_id");
      form.resetField("intermediary_id");
      form.resetField("intermediary_branch_id");
    }
  }, [form.watch("distribution_channel")]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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

    const formData = {
      exchange_rate: +values.exchange_rate,
      customer_id: values.customer_details?.id,
      institution_id: values.institution_id,
      branch_id: values.branch_id,
      distribution_channel: values.distribution_channel,
      inception_date: values.inception_date,
      expiry_date: values.expiry_date,
      fire_risk_class_id: values.fire_risk_class_id,
      insured_interest: values.insured_interest,
      premium_amount: "1000",

      property_type: values.property_type,
      policy_items: values.policy_items,
      policy_perils: values.policy_perils,
      policy_excesses: values.policy_excesses,

      currency_id: values.currency,

      intermediary_branch_id: values.intermediary_branch_id,
      intermediary_id: values.intermediary_id,
      intermediary_type_id: values.intermediary_type_id,
      bank_id: values.bank_id,
      // Adjust if there's a corresponding field
    };

    const response = await createFirePolicy(formData);
  };

  console.log(form.watch(), "values");
  console.log(form.formState.errors, "errros");

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
  return (
    <div>
      <Card>
        <CardTitle className="flex  items-center gap-2 font-thin border-b-[1px] p-5">
          <ListTodo />
          Fire Policy
        </CardTitle>
        <CardContent className="px-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="border-b-[5px]">
                <div className="p-10 border-b-[1px] grid grid-cols-1 md:grid-cols-2 gap-8   ">
                  <SelectFormField
                    form={form}
                    name="institution_id"
                    label="Insurance Company"
                    options={convertDataToSelectObject(items)}
                    isLoading={isLoading}
                    placeholder="Select an insurance company"
                  />
                  <SelectFormField
                    form={form}
                    name="branch_id"
                    label="Branch Office"
                    options={convertDataToSelectObject(branches)}
                    placeholder="Select a branch office"
                  />
                </div>
                <div className="p-10 border-b-[1px] grid grid-cols-1 md:grid-cols-2 gap-8 ">
                  <SelectFormField
                    form={form}
                    name="distribution_channel"
                    label="Distribution Channel"
                    options={distribution_channel}
                    placeholder="Select a distribution channel"
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
              </div>
              <div className="border-b-[5px]">
                <div className="p-10 grid lg:grid-cols-2 gap-8">
                  <div className="flex lg:col-span-2 items-center gap-10 md:gap-0 flex-wrap justify-between lg:justify-around">
                    <InputFormField
                      form={form}
                      className="flex flex-col lg:flex-row items-start lg:items-center lg:w-[40%] "
                      labelStyle=" lg:w-[40%] 2xl:w-[30%]"
                      name="inception_date"
                      label="Inception Date:"
                      type="date"
                    />
                    <InputFormField
                      form={form}
                      className="flex flex-col lg:flex-row items-start lg:items-center lg:w-[40%] "
                      labelStyle=" lg:w-[40%] 2xl:w-[30%] "
                      name="expiry_date"
                      label="Expiry Date:"
                      type="date"
                    />
                  </div>
                  <SelectFormField
                    form={form}
                    name="currency"
                    label="Currency"
                    options={convertDataToSelectObject(currencies)}
                  />
                  <InputFormField
                    form={form}
                    name="exchange_rate"
                    label="Exchange Rate"
                    type="number"
                  />
                  <SelectFormField
                    form={form}
                    name="bank_id"
                    label="Letter Of Credit"
                    options={convertDataToSelectObject(banks)}
                  />
                  <SelectFormField
                    options={
                      fireRiskClasses?.length
                        ? fireRiskClasses.map((riskClass: any) => ({
                            label: riskClass?.description,
                            value: riskClass?.id,
                          }))
                        : []
                    }
                    form={form}
                    name="fire_risk_class_id"
                    label="Risk Class"
                  />
                  <SelectFormField
                    options={[
                      { label: "Owner", value: "Owner" },
                      { label: "Occupier", value: "Occupier" },
                      {
                        label: "Both Owner & Occupier",
                        value: "Both Owner & Occupier",
                      },
                    ]}
                    form={form}
                    name="insured_interest"
                    label="Insured interest"
                  />
                  <SelectFormField
                    options={[
                      { label: "Commercial", value: "Commercial" },
                      { label: "Home", value: "Home" },
                    ]}
                    form={form}
                    name="property_type"
                    label="Property Type"
                  />
                </div>
              </div>
              <div className="border-b-[1px] p-10">
                <div className="lg:flex items-center hidden  gap-1  ">
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
                <Select onValueChange={(e) => setSelectedTab(e)}>
                  <SelectTrigger className="w-[180px] lg:hidden">
                    <SelectValue placeholder="Select a tab" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {tabsList.map((tab) => (
                        <SelectItem key={tab} value={tab}>
                          {tab}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {selectedTab.toLowerCase() === "building/item details" && (
                  <BuildingItemDetails
                    items={form.watch("policy_items") || []}
                    addItem={(item: BuildingItemDetailsType) =>
                      addToTable(item, "policy_items", form)
                    }
                    deleteItem={(id: string) =>
                      deleteTableValue(id, "policy_items", form)
                    }
                    updateItem={(item: BuildingItemDetailsType) =>
                      updateTableValue(item, "policy_items", form)
                    }
                  />
                )}
                {selectedTab.toLowerCase() === "perils" && (
                  <Perils
                    items={form.watch("policy_perils") || []}
                    addItem={(item: PerilsType) =>
                      addToTable(item, "policy_perils", form)
                    }
                    deleteItem={(id: string) =>
                      deleteTableValue(id, "policy_perils", form)
                    }
                    updateItem={(item: PerilsType) =>
                      updateTableValue(item, "policy_perils", form)
                    }
                  />
                )}
                {selectedTab.toLowerCase() === "excesses" && (
                  <Excesses
                    items={form.watch("policy_excesses") || []}
                    addItem={(item: ExcessType) =>
                      addToTable(item, "policy_excesses", form)
                    }
                    deleteItem={(id: string) =>
                      deleteTableValue(id, "policy_excesses", form)
                    }
                    updateItem={(item: ExcessType) =>
                      updateTableValue(item, "policy_excesses", form)
                    }
                  />
                )}
              </div>
              <div className="flex items-end justify-end p-5">
                <Button variant="primary">Submit Proposal</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
