import format from "date-fns/format";
import { IInstitution } from "./columns";

export const data: IInstitution[] = [
  {
    id: 1,
    name: "ABC University",
    institution_type: "University",
    contact_person: "John Doe",
    contact_phone: "123-456-7890",
    created_at: format(new Date("2023-01-01"), "dd MMM yyyy"),
  },
  {
    id: 2,
    name: "XYZ College",
    institution_type: "College",
    contact_person: "Jane Smith",
    contact_phone: "987-654-3210",
    created_at: format(new Date("2023-01-01"), "dd MMM yyyy"),
  },
  {
    id: 3,
    name: "EFG School",
    institution_type: "School",
    contact_person: "Alice Johnson",
    contact_phone: "555-123-4567",
    created_at: format(new Date("2023-01-01"), "dd MMM yyyy"),
  },
  {
    id: 4,
    name: "LMN Academy",
    institution_type: "Academy",
    contact_person: "Bob Brown",
    contact_phone: "789-456-1230",
    created_at: format(new Date("2023-01-01"), "dd MMM yyyy"),
  },
  {
    id: 5,
    name: "PQR Institute",
    institution_type: "Institute",
    contact_person: "Charlie Lee",
    contact_phone: "321-654-0987",
    created_at: format(new Date("2023-01-01"), "dd MMM yyyy"),
  },
  {
    id: 6,
    name: "JKL High School",
    institution_type: "High School",
    contact_person: "Eva Davis",
    contact_phone: "111-222-3333",
    created_at: format(new Date("2023-01-01"), "dd MMM yyyy"),
  },
];
