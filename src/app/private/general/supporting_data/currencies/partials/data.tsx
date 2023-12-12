import format from "date-fns/format";


export const data = [
  {
    id: 1,
    code: 'USD',
    currency: "Dollar",
    symbol:'\u0024',
    exchangeRate:11.2,
    created_at: format(new Date(), 'dd MMM yyy'),
  },
  {
    id: 2,
    code: 'GBP',
    currency: "Pound Sterling",
    symbol:'\u00A3',
    exchangeRate:13,
    created_at: format(new Date(), 'dd MMM yyy'),
  },
  {
    id: 3,
    code: 'EUR',
    currency: "Euro",
    symbol:'\u20AC',
    exchangeRate:10.2,
    created_at: format(new Date(), 'dd MMM yyy'),
  },
];
