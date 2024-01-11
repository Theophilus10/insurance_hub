import format from "date-fns/format";


export const data = [
  {
    id: 1,
    code: 'M01',
    description: "Mansion",
    minAmount:20,
    maxAmount: 100,
    fireRate: 2,
    collapseRate:3,
    publicLiabilityRate: 5,
    startDate: format(new Date(), 'dd MMM yyy'),
    endDate: format(new Date(), 'dd MMM yyy'),
    created_at: format(new Date(), 'dd MMM yyy'),
  },
  {
    id: 2,
    code: 'M02',
    description: "Bigger House",
    minAmount:20,
    maxAmount: 100,
    fireRate: 2,
    collapseRate:6,
    publicLiabilityRate: 10,
    startDate: format(new Date(), 'dd MMM yyy'),
    endDate: format(new Date(), 'dd MMM yyy'),
    created_at: format(new Date(), 'dd MMM yyy'),
  },
  {
    id: 3,
    code: 'M03',
    description: "Factory House",
    minAmount:20,
    maxAmount: 100,
    fireRate: 5,
    collapseRate:8,
    publicLiabilityRate: 14,
    startDate: format(new Date(), 'dd MMM yyy'),
    endDate: format(new Date(), 'dd MMM yyy'),
    created_at: format(new Date(), 'dd MMM yyy'),
  },
];
