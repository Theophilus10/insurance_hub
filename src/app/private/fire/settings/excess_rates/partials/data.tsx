import format from "date-fns/format";

export const data = [
  {
    id: 1,
    excess: "FOOD",
    riskClass:
      "Private/Residential buildings, educational buildings, places of worship, any commercial office or services building",
    rate: 0.025,
    startDate: "01/04/2023",
    endDate: "04/09/2025",
    created_at: format(new Date(), "dd MMM yyy"),
  },
  {
    id: 2,
    excess: "FOOD",
    riskClass:
      "Hospitality facilities (restaurants, hotels, hostels, short stay apartments, pubs, fast food joints etc)",
    rate: 5,
    startDate: "01/04/2023",
    endDate: "04/09/2025",
    created_at: format(new Date(), "dd MMM yyy"),
  },
];
