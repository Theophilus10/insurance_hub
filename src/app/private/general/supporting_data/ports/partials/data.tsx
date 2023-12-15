import format from "date-fns/format";

export const data = [
  {
    id: 1,
    code: "SHA",
    name: "Hongqiao Airport",
    country: "China",
    shippingType: "Air",
    created_at: format(new Date(), "dd MMM yyy"),
  },
  {
    id: 2,
    code: "YOW",
    name: "Ottawa International Airport",
    country: "Canada",
    shippingType: "Air",
    created_at: format(new Date(), "dd MMM yyy"),
  },
  {
    id: 1,
    code: "YAK",
    name: "Yakuta Airport",
    country: "United States",
    shippingType: "Air",
    created_at: format(new Date(), "dd MMM yyy"),
  },
];
