import z from "zod";
export const FormSchema = z.object({
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

export const DefaultValues = {
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
