import format from "date-fns/format";
import { IBranch } from "./columns";

export const data: IBranch[] = [
  {
    id: 1,
    name: "Head Office",
    institution_id: 1,
    institution: "University",
    contact_person: "John Doe",
    contact_phone: "123-456-7890",
    created_at: format(new Date("2023-01-01"), "dd MMM yyyy"),
  },
  {
    id: 2,
    name: "Head Office",
    institution_id: 1,
    institution: "College",

    contact_person: "Jane Smith",
    contact_phone: "987-654-3210",
    created_at: format(new Date("2023-01-01"), "dd MMM yyyy"),
  },
  {
    id: 3,
    name: "Head Office",
    institution: "School",
    institution_id: 1,
    contact_person: "Alice Johnson",
    contact_phone: "555-123-4567",
    created_at: format(new Date("2023-01-01"), "dd MMM yyyy"),
  },
  {
    id: 4,
    name: "Head Office",
    institution_id: 1,
    institution: "Academy",

    contact_person: "Bob Brown",
    contact_phone: "789-456-1230",
    created_at: format(new Date("2023-01-01"), "dd MMM yyyy"),
  },
  {
    id: 5,
    name: "PHead Office",
    institution_id: 1,
    institution: "Institute",
    contact_person: "Charlie Lee",
    contact_phone: "321-654-0987",
    created_at: format(new Date("2023-01-01"), "dd MMM yyyy"),
  },
  {
    id: 6,
    name: "Head Office",
    institution_id: 1,
    institution: "High School",
    contact_person: "Eva Davis",
    contact_phone: "111-222-3333",
    created_at: format(new Date("2023-01-01"), "dd MMM yyyy"),
  },
];
