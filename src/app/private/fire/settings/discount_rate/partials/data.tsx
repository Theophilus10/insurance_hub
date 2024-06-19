import format from "date-fns/format";

export const data = [
  {
    id: 1,
    discount: "Special Discount",
    rate: 2,
    created_at: format(new Date(), "dd MMM yyy"),
  },
];
