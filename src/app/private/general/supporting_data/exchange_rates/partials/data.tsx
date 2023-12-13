import format from "date-fns/format";

export const data = [
  {
    id: 1,
    currency: "Dollar",
    rate: 11,
    created_at: format(new Date(), "dd MMM yyy"),
  },
  {
    id: 2,
    currency: "Pound Sterling",
    rate: 14,
    created_at: format(new Date(), "dd MMM yyy"),
  },
  {
    id: 3,
    currency: "Japanese Yen",
    rate: 4,
    created_at: format(new Date(), "dd MMM yyy"),
  },
  {
    id: 4,
    currency: "Chinese Yuan",
    rate: 2,
    created_at: format(new Date(), "dd MMM yyy"),
  },
];
