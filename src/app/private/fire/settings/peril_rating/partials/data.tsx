import format from "date-fns/format";

export const data = [
  {
    id: 1,
    peril: "FOOD",
    riskClass:
      "Private/Residential buildings, educational buildings, places of worship, any commercial office or services building",
    rate: 0.025,
    startDate: "01/04/2023",
    endDate: "04/09/2025",
    created_at: format(new Date(), "dd MMM yyy"),
  },
  {
    id: 2,
    peril: "EARTHQUAKE",
    riskClass:
      "Private/Residential buildings, educational buildings, places of worship, any commercial office or services building",
    rate: 0.0125,
    startDate: "01/04/2023",
    endDate: "04/09/2025",
    created_at: format(new Date(), "dd MMM yyy"),
  },
];
