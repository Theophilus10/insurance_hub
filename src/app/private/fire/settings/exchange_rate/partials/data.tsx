import format from "date-fns/format";

export const data = [
  {
    id: 1,
    currency: "Cedi",
    rate: 1,
    created_at: format(new Date(), "dd MMM yyy"),
  },
  {
    id: 2,
    currency: "US Dollar",
    rate: 11.1,
    created_at: format(new Date(), "dd MMM yyy"),
  },
];
