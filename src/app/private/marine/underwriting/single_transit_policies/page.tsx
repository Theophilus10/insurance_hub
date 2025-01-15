"use client";

import { Form } from "@app/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardTitle, CardContent } from "@app/components/ui/card";
import { ListTodo } from "lucide-react";
import { Input } from "@app/components/ui/input";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  CustomerDetailStep,
  InsuranceCompanyOrIntermediaryStep,
  PolicyDetailStep,
  TabsStepper,
} from "./stp-steps";
import { FormStepper } from "@app/components/stepper/StepperComponents";
import { Step } from "@app/components/stepper/stepperTypeDef";
import { TranshipmentAndTransitStep } from "./stp-steps/TranshipmentAndTransitStep";
import { InterestAndPolicyExtentionDetailStep } from "./stp-steps/InterestDetailStep";
import { AttachmentStep } from "./stp-steps/AttachmentStep";
import {
  createSingleTransitPolicy,
  showSingleTransitPolicy,
} from "@app/server/services";
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
    component: PolicyDetailStep,
    label: "Policy Details",
  },
  {
    component: TranshipmentAndTransitStep,
    label: "Transhiptment & Transits Details",
  },
  {
    component: InterestAndPolicyExtentionDetailStep,
    label: "Interest/Items & Extentions Details",
  },
  {
    component: AttachmentStep,
    label: "Document Uploads",
  },
];

export const defaultValues = {
  institution_id: null,
  branch_id: null,
  distribution_channel: "",
  intermediary_branch_id: null,
  intermediary_type_id: null,
  intermediary_id: null,
  customer_details: {
    name: "",
    email: "",
    identification_number: null,
    phone: "",
    id: 0,
  },
  issue_date: "",
  no_known_loss: "",
  shipping_type_id: 0,
  bank_id: 0,
  carrier_id: 0,
  currency_id: 0,
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
  transhipments: [],
  transits: [],
  interests: [],
  policy_extensions: [],
  policy_excess: "",
};

export const FormSchema = z.object({
  institution_id: z.number().min(1, { message: "Select an institution" }),
  branch_id: z.number().min(1, { message: "Select a branch" }),
  distribution_channel: z.string().min(1, { message: "Select a channel" }),
  intermediary_id: z.any(),
  intermediary_branch_id: z.any(),
  intermediary_type_id: z.any(),
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
  currency_id: z.number(),
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
  transhipments: z
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

// const getCurrentSTepIndexFromUrl = (url: string): number => {
//   const urlObject = new URL(url);
//   const queryParams = new URLSearchParams(urlObject.search);
//   const stepValue = queryParams.get("step");
//   return STPolicySteps.findIndex((step) => step.label == stepValue);
// };

interface ParamProps {
  params?: {
    policy_id: string;
  };
}

const Page: React.FC<ParamProps> = ({ params }) => {
  const searchParams = useSearchParams();
  const policyIdParam = searchParams.get("policy_id");
  const policyId = policyIdParam ? parseInt(policyIdParam) : 0;
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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const interests = form.watch("interests");
  const transhipmentValues = form.watch("transhipments");
  const transitValues = form.watch("transits");
  const extensionValues = form.watch("policy_extensions");

  useEffect(() => {
    const calculatedTotals = interests?.reduce(
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
    const totalTranshipmentRates = transhipmentValues?.reduce(
      (acc, transhipment) => acc + transhipment.rate,
      0
    );

    const totalTransitRates = transitValues?.reduce(
      (acc, transit) => acc + transit.rate,
      0
    );

    const totalExtensionRates = extensionValues?.reduce(
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

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
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

    // const formData = {
    //   vessel_flag: values.vessel_flag,
    //   flight_vessel_number: values.flight_vessel_number,
    //   flight_vessel_name: values.flight_vessel_name,
    //   bill_of_laden_number: values.bill_of_laden_number,
    //   commercial_invoice_number: values.commercial_invoice_number,
    //   no_known_loss: values.no_known_loss,
    //   exchange_rate: +values.exchange_rate,
    //   customer_id: values.customer_details?.id,
    //   institution_id: values.institution_id,
    //   branch_id: values.branch_id,
    //   distribution_channel: values.distribution_channel,
    //   issue_date: values.issue_date,
    //   policy_excess: values.policy_excess,
    //   currency_id: values.currency,
    //   shipping_type_id: values.shipping_type_id,
    //   carrier_id: values.carrier_id,
    //   country_of_importation: values.country_of_importation,
    //   country_of_destination: values.country_of_destination,
    //   port_of_loading: values.port_of_loading,
    //   port_of_destination: values.port_of_destination,
    //   sailing_date: values.sailing_date,
    //   estimated_arrival_date: values.estimated_arrival_date,
    //   policy_extensions: values.policy_extensions,
    //   interests: values.interests,
    //   transhipments: values.transhipments,
    //   transits: values.transits,
    //   premium_amount: premiumPayable,
    //   intermediary_branch_id: values.intermediary_branch_id,
    //   intermediary_id: values.intermediary_id,
    //   intermediary_type_id: values.intermediary_type_id,
    //   bank_id: values.bank_id,
    //   open_cover_policy_id: values.open_cover_policy_id,
    // };

    // const response = await createSingleTransitPolicy(formData);
    // console.log(response);
  };

  // console.log(form.watch(), "values");
  // console.log(form.formState.errors, "errros");
  const { data: session } = useSession();

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

  useEffect(() => {
    const fetchDefaultValues = async () => {
      setLoading(true);

      if (!policyId) {
        setLoading(false);
        return; // Exit early if there's no policyId
      }

      try {
        const response = await showSingleTransitPolicy(policyId);

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
  }, [form.reset, policyId, showSingleTransitPolicy]);

  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <Card className="container mx-auto">
      <CardTitle className="flex  items-center gap-2 font-thin border-b-[1px] p-5">
        <ListTodo />
        Single Transit Policy Details
      </CardTitle>
      <CardContent className="px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormStepper
              steps={STPolicySteps}
              form={form}
              onStepCompleted={onSubmit}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Page;
