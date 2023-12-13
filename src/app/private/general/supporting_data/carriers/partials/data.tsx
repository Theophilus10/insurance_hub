import format from "date-fns/format";


export const data = [
  {
    id: 1,
    code:'MSC',
    name: 'Mediterranean Shipping Company',
    shippingType:'Air',
    created_at: format(new Date(), 'dd MMM yyy'),
  },
  {
    id: 2,
    code:'IRISL',
    name: 'IRISL Group',
    shippingType:'Air',
    created_at: format(new Date(), 'dd MMM yyy'),
  },
  {
    id: 3,
    code:'KMTC',
    name: 'Korea Marine Transport Company',
    shippingType:'Air',
    created_at: format(new Date(), 'dd MMM yyy'),
  },
  {
    id: 4,
    code:'ZCHC',
    name: 'Zhonggu Logistics',
    shippingType:'Sea',
    created_at: format(new Date(), 'dd MMM yyy'),
  },
];
