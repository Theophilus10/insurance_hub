import format from "date-fns/format";


export const data = [
  {
    id: 1,
    code:1,
    name: 'Air',
    created_at: format(new Date(), 'dd MMM yyy'),
  },
  {
    id: 2,
    code:2,
    name: 'Land',
    created_at: format(new Date(), 'dd MMM yyy'),
  },
  {
    id: 3,
    code:3,
    name: 'Sea',
    created_at: format(new Date(), 'dd MMM yyy'),
  },
];
