import format from "date-fns/format";

export const data = [
  {
    id: 1,
    code: "ICCA.1",
    name: "ICC(A)",
    created_at: format(new Date(), "dd MMM yyy"),
  },
  {
    id: 2,
    code: "ICCB.1",
    name: "ICC(B)",
    created_at: format(new Date(), "dd MMM yyy"),
  },
  {
    id: 3,
    code: "ICCC.1",
    name: "ICC(C)",
    created_at: format(new Date(), "dd MMM yyy"),
  },
];
