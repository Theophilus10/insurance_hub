"use client";
import { Button } from "@app/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export type Fleet = {
  age_loading_percent: number;
  body_type_code: string;
  cc_loading_percent: number;
  chasis_number: string;
  color: string;
  cover_type: string;
  cub_cap: number;
  currency_code: string;
  customer_number: string;
  days: number;
  excess_rate: number;
  excess_type_code: string;
  exchange_rate: number;
  expiry: number;
  fleet_discount_percent: number;
  inception: number;
  intermediary_number: string;
  make: string;
  mileage: number;
  model: string;
  ncd_percent: number;
  schedule_type: string;
  seats: number;
  sum_insured: number;
  tppd_limit: number;
  vehicle_registration: string;
  year_of_Mfg: number;
};

export const columns: ColumnDef<Fleet>[] = [
  {
    accessorKey: "age_loading_percent",
    header: "Age Loading (%)",
  },
  {
    accessorKey: "body_yype_code",
    header: "Body Type Code",
  },
  {
    accessorKey: "cc_loading_percent",
    header: "CC Loading (%)",
  },
  {
    accessorKey: "chasis_number",
    header: "Chasis Number",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "cover_type",
    header: "Cover Type",
  },
  {
    accessorKey: "cub_cap",
    header: "Cubic Capacity",
  },
  {
    accessorKey: "currency_code",
    header: "Currency Code",
  },
  {
    accessorKey: "customer_number",
    header: "Customer Number",
  },
  {
    accessorKey: "days",
    header: "Days",
  },
  {
    accessorKey: "excess_rate",
    header: "Excess Rate",
  },
  {
    accessorKey: "excess_type_code",
    header: "Excess Type Code",
  },
  {
    accessorKey: "exchange_rate",
    header: "Exchange Rate",
  },
  {
    accessorKey: "expiry",
    header: "Expiry",
  },
  {
    accessorKey: "fleet_discount_percent",
    header: "Fleet Discount (%)",
  },
  {
    accessorKey: "inception",
    header: "Inception",
  },
  {
    accessorKey: "intermediary_number",
    header: "Intermediary Number",
  },
  {
    accessorKey: "make",
    header: "Make",
  },
  {
    accessorKey: "mileage",
    header: "Mileage",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "ncd_percent",
    header: "NCD (%)",
  },
  {
    accessorKey: "schedule_type",
    header: "Schedule Type",
  },
  {
    accessorKey: "seats",
    header: "Seats",
  },
  {
    accessorKey: "sum_insured",
    header: "Sum Insured",
  },
  {
    accessorKey: "tppd_limit",
    header: "TPPD Limit",
  },
  {
    accessorKey: "vehicle_registration",
    header: "Vehicle Registration",
  },
  {
    accessorKey: "year_of_Mfg",
    header: "Year of Manufacture",
  },
];

// color	chasis_number	year_of_Mfg	cub_cap	mileage	body_yype_code	seats	currency_code	days	inception	expiry	cover_type	schedule_type	sum_insured	excess_type_code	excess_rate	tppd_limit	ncd(%)	fleet_discount (%)	age_loading(%)	cc_loading(%)	exchange_rate
