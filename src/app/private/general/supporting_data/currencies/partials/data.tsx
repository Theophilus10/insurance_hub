import format from "date-fns/format";


export const data = [
  {
    id: 1,
    code: 'USD',
    currency: "Dollar",
    created_at: format(new Date(), 'dd MMM yyy'),
  },
  {
    id: 2,
    code: 'GBP',
    currency: "Pound Sterling",
    created_at: format(new Date(), 'dd MMM yyy'),
  },
  {
    id: 3,
    code: 'EUR',
    currency: "Euro",
    created_at: format(new Date(), 'dd MMM yyy'),
  },
];
