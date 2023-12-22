import format from "date-fns/format";

export const data = [
  {
    id: 1,
    code: "0001",
    interest: "Machinery & Spares Parts, construction equipment, generators, Farm Machinery",
    description: "Machinery & Spares Parts, construction equipment, generators, Farm Machinery",
    created_at: format(new Date(), "dd MMM yyy"),
  },
  {
    id: 1,
    code: "0002",
    interest: "Construction Materials: Cement, PVC, Pipes, Brassware, Iron, Asbestos, etc.",
    description: "Construction Materials: Cement, PVC, Pipes, Brassware, Iron, Asbestos, etc. ",
    created_at: format(new Date(), "dd MMM yyy"),
  },
  {
    id: 1,
    code: "0003",
    interest: "Gas, Gas Cylinders Welding machines, Electrodes,",
    description: "Gas, Gas Cylinders Welding machines, Electrodes,",
    created_at: format(new Date(), "dd MMM yyy"),
  },
];
