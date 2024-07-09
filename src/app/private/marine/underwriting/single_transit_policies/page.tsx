"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@app/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardTitle, CardContent } from "@app/components/ui/card";
import { ListTodo } from "lucide-react";
import { Input } from "@app/components/ui/input";
import React, { useEffect, useState } from "react";
import { Button } from "@app/components/ui/button";
import {
  InputFormField,
  SelectFormField,
  SelectFormFieldWithOnChange,
} from "@app/components/forms/ShadcnFormFields";
import Transhipment, {
  TranshipmentType,
} from "@app/components/single_transit_policy/partials/transhipment";
import Transits, {
  TransitType,
} from "@app/components/single_transit_policy/partials/transits";
import InterestItems, {
  InterestType,
} from "@app/components/single_transit_policy/partials/interests_items";
import PolicyExtenxions, {
  PolicyExtenxionsType,
} from "@app/components/single_transit_policy/partials/policy_extensions";
import PolicyExcess from "@app/components/single_transit_policy/partials/policy_excess";
import {
  convertDataToSelectObject,
  convertDataToSelectObjectNameAsValue,
} from "@app/helpers/index";
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
  IPort,
  IBranch,
  IInstitution,
  read_customer,
  read_customer_by_email,
  find_customer,
  CustomerParams,
  CustomerDTO,
  ICustomer,
} from "@app/server/services";
import { createSingleTransitPolicy } from "@app/server/services/policies/marine/index";
import DocumentUploads from "@app/components/single_transit_policy/partials/document_uploads";
import InputField from "@app/components/forms/InputField";
import IconButton from "@app/components/ui/IconButton";
import toast from "react-hot-toast";
import { DatePickerWithRange } from "@app/components/dateRange/dateRangePicker";
import { Value } from "@radix-ui/react-select";
import { useSearchParams } from "next/navigation";
import { ICustomer } from "../../settings/shipping_types/partials/columns";

const stylesPolicySummaryItemStyles =
  "flex items-center justify-between text-sm";

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

const distributionChannel = [
  { value: "indirect", label: "INDIRECT" },
  { value: "direct", label: "DIRECT" },
];

const tabsList = [
  "Transhipment",
  "Transit",
  "Interests / Items",
  "Policy Extension",
  "Policy Excess",
  "Document uploads",
];

const getCountriesPorts = (name: any, ports: []) => {
  const filteredPorts = ports?.filter(
    (port: IPort) => port.country.name === name
  );
  return convertDataToSelectObjectNameAsValue(filteredPorts);
};

const defaultValues = {
  institution_id: 0,
  branch_id: 0,
  distribution_channel: "",
  intermediary_branch_id: 0,
  intermediary_type_id: 0,
  intermediary_id: 0,
  customer_details: {
    name: "",
    email: "",
    identification_number: 0,
    phone: "",
    id: 0,
  },
  issue_date: "",
  no_known_loss: "",
  shipping_type_id: 0,
  bank_id: 0,
  carrier_id: 0,
  currency: 0,
  exchange_rate: "",
  commercial_invoice_number: "",
  bill_of_laden_number: "",
  flight_vessel_name: "",
  flight_vessel_number: "",
  vessel_flag: "",
  country_of_importation: "",
  country_destination: "",
  port_of_loading: "",
  port_of_destination: "",
  sailing_date: "",
  estimated_arrival_date: "",
  transhipment: [],
  transits: [],
  interests: [],
  policy_extensions: [],
  policy_excess: "",
};

const formSchema = z.object({
  institution_id: z.number().min(1, { message: "Select an institution" }),
  branch_id: z.number().min(1, { message: "Select a branch" }),
  distribution_channel: z.string().min(1, { message: "Select a channel" }),
  intermediary_id: z.number(),
  intermediary_branch_id: z.number(),
  intermediary_type_id: z.number(),
  customer_details: z.object({
    id: z.number().min(1, { message: "Select a customer" }),
    name: z.string(),
    identification_number: z.string(),
    phone: z.string(),
    email: z.string(),
  }),
  find_customer: z.string(),
  issue_date: z.string().min(1, { message: "Select a date" }),
  no_known_loss: z.string(),
  shipping_type_id: z.number().min(1, { message: "Select a type" }),
  bank_id: z.number().min(1, { message: "Select a bank" }),
  carrier_id: z.number().min(1, { message: "Select a carrier" }),
  currency: z.number(),
  exchange_rate: z.string().min(1, { message: "Enter a valid rate" }),
  commercial_invoice_number: z
    .string()
    .min(1, { message: "Enter invoice number" }),
  bill_of_laden_number: z
    .string()
    .min(1, { message: "Enter bill of laden number" }),

  flight_vessel_name: z
    .string()
    .min(1, { message: "Enter a flight or vessel name" }),
  flight_vessel_number: z
    .string()
    .min(1, { message: "Enter a flight or vessel number" }),
  vessel_flag: z.string().min(1, { message: "Enter vessel flag" }),
  country_of_importation: z
    .string()
    .min(1, { message: "Enter country of importation" }),
  country_of_destination: z
    .string()
    .min(1, { message: "Enter country of destination" }),
  port_of_loading: z.string().min(1, { message: "Enter port of loading" }),
  port_of_destination: z
    .string()
    .min(1, { message: "Enter port of destination" }),
  sailing_date: z.string().min(1, { message: "Enter a sailing date" }),
  estimated_arrival_date: z
    .string()
    .min(1, { message: "Enter an estimated arrival date" }),
  transhipment: z
    .array(
      z.object({
        id: z.string(),
        origin_country: z.string(),
        destination_country: z.string(),
        rate: z.number(),
        description: z.string(),
      })
    )
    .min(1, { message: "Add transhipments" }),
  transits: z
    .array(
      z.object({
        transit_from: z.string(),
        transit_to: z.string(),
        transit_description: z.string(),
        rate: z.number(),
        id: z.string(),
      })
    )
    .optional(),
  interests: z
    .array(
      z.object({
        cover_type: z.string(),
        interest: z.string(),
        package_type: z.string(),
        rate: z.number(),
        cost: z.number(),
        freight: z.number(),
        markup_rate: z.number(),
        duty_rate: z.number(),
        sum_insured: z.number(),
        markup: z.any(),
        duty_amount: z.number(),
        basic_premium: z.number(),
        item_description: z.string(),
        id: z.string(),
      })
    )
    .min(1, { message: "Add interest items" }),
  policy_extensions: z
    .array(
      z.object({
        extension: z.string(),
        rate: z.number(),
        id: z.string(),
      })
    )
    .min(1, { message: "Add policy extension" }),
  policy_excess: z.string(),
});

const findCustomer = async (identifier: string) => {
  const customer = await find_customer(identifier);
  if (!customer.success) return false;

  return customer.data;
};

const Page = () => {
  const [selectedTab, setSelectedTab] = useState("transhipment");
  const [branches, setBranches] = useState([]);
  const [intermediaryNames, setIntermediaryNames] = useState([]);
  const [intermediaryBranches, setIntermediaryBranches] = useState([]);
  const [customerError, setCustomerError] = useState("");
  const [intermediaryErrors, setIntermediaryErrors] = useState({});
  const [totals, setTotals] = useState({
    markupAmount: 0,
    dutyAmount: 0,
    sumInsured: 0,
    basicPremium: 0,
  });
  // const [transhipmentLoading, setTranshipmentlLoading] = useState<number>(0);
  // const [transitLoading, setTransitLoading] = useState<number>(0);
  // const [extensionLoading, setExtensionLoading] = useState<number>(0);
  const [totalLoading, setTotalLoading] = useState<number>(0);
  const [loadingAmount, setLoadingAmount] = useState<number>(0);
  const [premiumPayable, setPremiumPayable] = useState<number>(0);
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [customerIdFromUrl, setCustomerIdFromUrl] = useState<string>(null);

  console.log(selectedCurrencyCode, "currency code");

  const { items, isLoading } = read_institutions();
  const { items: institutionTypes } = read_institution_types();
  const { items: branchesItems, isLoading: branchesLoading } = read_branches();
  const { items: shippingTypes } = read_shipping_types();
  const { items: countries } = read_countries();
  const { items: banks } = read_banks();
  const { items: ports } = read_ports();
  const { items: carriers } = read_carriers();
  const { items: currencies } = read_currencies();

  const searchParams = useSearchParams();
  // const customerId = searchParams.get("customer_id");
  // console.log(customerId, "customerid");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const interests = form.watch("interests");
  const transhipmentValues = form.watch("transhipment");
  const transitValues = form.watch("transits");
  const extensionValues = form.watch("policy_extensions");

  useEffect(() => {
    const calculatedTotals = interests.reduce(
      (acc: any, interest: any) => {
        const { cost, freight, markup_rate, duty_rate, rate } = interest;
        const markupAmount = (markup_rate / 100) * (cost + freight);
        const dutyAmount = (duty_rate / 100) * (cost + freight);
        const sumInsured = cost + freight + markupAmount + dutyAmount;
        const basicPremium = sumInsured * (rate / 100);

        return {
          markupAmount: acc.markupAmount + markupAmount,
          dutyAmount: acc.dutyAmount + dutyAmount,
          sumInsured: acc.sumInsured + sumInsured,
          basicPremium: acc.basicPremium + basicPremium,
        };
      },
      {
        markupAmount: 0,
        dutyAmount: 0,
        sumInsured: 0,
        basicPremium: 0,
      }
    );

    setTotals(calculatedTotals);
  }, [interests]);

  useEffect(() => {
    const totalTranshipmentRates = transhipmentValues.reduce(
      (acc, transhipment) => acc + transhipment.rate,
      0
    );

    const totalTransitRates = transitValues.reduce(
      (acc, transit) => acc + transit.rate,
      0
    );

    const totalExtensionRates = extensionValues.reduce(
      (acc, extension) => acc + extension.rate,
      0
    );

    const totalLoading =
      totalTranshipmentRates + totalTransitRates + totalExtensionRates;

    setTotalLoading(totalLoading);
    setLoadingAmount((totalLoading / 100) * (totals?.sumInsured || 0));
    setPremiumPayable(loadingAmount + totals.basicPremium);
  }, [
    transhipmentValues,
    transitValues,
    extensionValues,
    totals.sumInsured,
    loadingAmount,
  ]);

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
      vessel_flag: values.vessel_flag,
      flight_vessel_number: values.flight_vessel_number,
      flight_vessel_name: values.flight_vessel_name,
      bill_of_laden_number: values.bill_of_laden_number,
      commercial_invoice_number: values.commercial_invoice_number,
      no_known_loss: values.no_known_loss,
      exchange_rate: +values.exchange_rate,
      customer_id: values.customer_details.id,
      institution_id: values.institution_id,
      branch_id: values.branch_id,
      distribution_channel: values.distribution_channel,
      issue_date: values.issue_date,
      policy_excess: values.policy_excess,
      currency_id: values.currency,
      shipping_type_id: values.shipping_type_id,
      carrier_id: values.carrier_id,
      country_of_importation: values.country_of_importation,
      country_of_destination: values.country_of_destination,
      port_of_loading: values.port_of_loading,
      port_of_destination: values.port_of_destination,
      sailing_date: values.sailing_date,
      estimated_arrival_date: values.estimated_arrival_date,
      policy_extensions: values.policy_extensions,
      interests: values.interests,
      transhipments: values.transhipment,
      transits: values.transits,
      premium_amount: premiumPayable,
      intermediary_branch_id: values.intermediary_branch_id,
      intermediary_id: values.intermediary_id,
      intermediary_type_id: values.intermediary_type_id,
      bank_id: values.bank_id,
      open_cover_policy_id: values.open_cover_policy_id, // Adjust if there's a corresponding field
    };

    const response = await createSingleTransitPolicy(formData);
    // console.log(response);
  };

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
      // form.resetField("intermediary");
      form.resetField("intermediary_branch_id");
    }
  }, [form.watch("distribution_channel")]);

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

  console.log(form.watch(), "values");
  console.log(form.formState.errors, "errros");

  return (
    <Card className="container mx-auto">
      <CardTitle className="flex  items-center gap-2 font-thin border-b-[1px] p-5">
        <ListTodo />
        Single Transit Policy Details
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
                  options={distributionChannel}
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
                  options={convertDataToSelectObject(
                    shippingTypes,
                    "name",
                    "id"
                  )}
                />
                <SelectFormFieldWithOnChange
                  form={form}
                  name="currency"
                  label="Currency"
                  options={
                    currencies?.length
                      ? currencies.map((currency: any) => ({
                          label: currency?.name,
                          value: currency?.id,
                        }))
                      : []
                  }
                  onChange={(value) => {
                    const selectedCurrency = currencies.find(
                      (c: any) => c.id === value
                    );
                    setSelectedCurrencyCode(selectedCurrency?.code);
                  }}
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
              {selectedTab.toLowerCase() === "transhipment" && (
                <Transhipment
                  transhipments={form.watch("transhipment")}
                  addTranshipments={(transhipment: TranshipmentType) =>
                    addToTable(transhipment, "transhipment", form)
                  }
                  updateTranshipment={(transhipment: TranshipmentType) =>
                    updateTableValue(transhipment, "transhipment", form)
                  }
                  deleteTranshipment={(id: string) =>
                    deleteTableValue(id, "transhipment", form)
                  }
                />
              )}
              {selectedTab.toLowerCase() === "transit" && (
                <Transits
                  transits={form.watch("transits") || []}
                  addTransit={(transit: TransitType) =>
                    addToTable(transit, "transits", form)
                  }
                  updateTransit={(transit: TransitType) =>
                    updateTableValue(transit, "transits", form)
                  }
                  deleteTransit={(id: string) =>
                    deleteTableValue(id, "transits", form)
                  }
                />
              )}
              {selectedTab.toLowerCase() === "interests / items" && (
                <InterestItems
                  addInterests={(interests: InterestType) =>
                    addToTable(interests, "interests", form)
                  }
                  interests={form.watch("interests")}
                  deleteInterest={(id: string) =>
                    deleteTableValue(id, "interests", form)
                  }
                  updateInterets={(interest: InterestType) =>
                    updateTableValue(interest, "interests", form)
                  }
                />
              )}
              {selectedTab.toLowerCase() === "policy extension" && (
                <PolicyExtenxions
                  addPolicyExtension={(policyExtenxion: PolicyExtenxionsType) =>
                    addToTable(policyExtenxion, "policy_extensions", form)
                  }
                  policyExtensions={form.watch("policy_extensions")}
                  deletePolicyExtension={(id: string) =>
                    deleteTableValue(id, "policy_extensions", form)
                  }
                  updatePolicyExtension={(
                    policy_extensions: PolicyExtenxionsType
                  ) =>
                    updateTableValue(
                      policy_extensions,
                      "policy_extensions",
                      form
                    )
                  }
                />
              )}
              {selectedTab.toLowerCase() === "policy excess" && (
                <PolicyExcess
                  policy_excess={form.watch("policy_excess")}
                  onChange={(value: string) =>
                    form.setValue("policy_excess", value)
                  }
                />
              )}
              {selectedTab.toLowerCase() === "document uploads" && (
                <DocumentUploads />
              )}
              <div className="ml-auto mr-0 block  p-5 w-[400px] shadow-md rounded-md ">
                <h3>Policy Summary</h3>

                <div className="space-y-4 py-1 my-3 border-b-2 border-t-2">
                  <p className={stylesPolicySummaryItemStyles}>
                    <span>Sum Insured:</span>{" "}
                    <span>
                      {selectedCurrencyCode} {totals.sumInsured}
                    </span>
                  </p>
                  <p className={stylesPolicySummaryItemStyles}>
                    <span>Basic Premium:</span>{" "}
                    <span>
                      {selectedCurrencyCode} {totals.basicPremium}
                    </span>
                  </p>
                  <p className={stylesPolicySummaryItemStyles}>
                    <span>Loadings(%):</span> <span>{totalLoading} %</span>
                  </p>
                  <p className={stylesPolicySummaryItemStyles}>
                    <span>Total Loadings:</span>{" "}
                    <span>
                      {selectedCurrencyCode} {loadingAmount}
                    </span>
                  </p>
                  <p className={stylesPolicySummaryItemStyles}>
                    <span>Maintenance fee:</span> <span>3000</span>
                  </p>
                </div>
                <p className="flex items-center justify-between">
                  <span>Premium Payable:</span>{" "}
                  <span>
                    {selectedCurrencyCode} {premiumPayable}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex justify-end mx-12 my-5">
              <Button type="submit" variant="primary">
                Submit Proposal
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Page;
