import Form from "@app/components/forms/Form";
import SelectField from "@app/components/forms/SelectField";
import InputField from "@app/components/forms/InputField";
import { object, string } from "zod";

const options = [
  { value: "Glico General Insurance Company Limited", label: "Glico" },
  { value: "Ghana Union Assurance", label: "GUA" },
];
const schema = object({
  username: string(),
  password: string().min(8),
});

const CompanyInformation = () => {
  return (
    <Form schema={schema}>
      <SelectField
        label="Select Company"
        name="company"
        required
        options={options}
      />
      <InputField label="code" name="code" disabled={true} />
      <InputField label="Phone" name="phone" disabled={true} />
      <InputField label="Email" name="email" disabled={true} />
      <InputField label="Address" name="adress" disabled={true} />
    </Form>
  );
};

export default CompanyInformation;
