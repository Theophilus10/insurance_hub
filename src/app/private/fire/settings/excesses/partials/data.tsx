import format from "date-fns/format";

export const data = [
  {
    id: 1,
    code: "FE002",
    name: "Flood",
    created_at: format(new Date(), "dd MMM yyy"),
  },
];
