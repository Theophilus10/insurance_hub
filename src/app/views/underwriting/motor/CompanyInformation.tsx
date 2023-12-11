import Form from "@app/components/forms/Form";
import SelectField from "@app/components/forms/SelectField";
import InputField from "@app/components/forms/InputField";
import IconButton from "@app/components/ui/IconButton";
import { Button } from "@app/components/ui/button";
import { object, string } from "zod";
import Divider from "@app/components/ui/Divider";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-5">
        <SelectField
          label="Insurance Company"
          name="company"
          required
          options={options}
        />
        <SelectField
          label="Select Branch"
          name="branch"
          required
          options={options}
        />
      </div>
      <Divider />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-5">
        <SelectField
          label="Distribution Channel"
          name="distribution_channel"
          required
          options={options}
        />
        <SelectField
          label="Intermediary Type"
          name="intermediary_type"
          required
          options={options}
        />
        <SelectField
          label="Intermediary Name"
          name="intermediary_name"
          required
          options={options}
        />
        <SelectField
          label="Branch Office of Intermediary"
          name="intermediary_branch_ofice"
          required
          options={options}
        />
      </div>
      <Divider />
      <InputField label="fullname or ID or Email " name="find_customer" />
      <div className="flex py-5 gap-6 ">
        <IconButton icon="mdi:search" color="primary" />
        <Button>Add New Customer</Button>
      </div>

      <InputField
        label="First Name"
        name="first_name"
        value="yes"
        disabled={true}
      />

      {/* Add responsive styling to the other fields as needed */}
      {/* <InputField label="code" name="code" disabled={true} />
      <InputField label="Phone" name="phone" disabled={true} />
      <InputField label="Email" name="email" disabled={true} />
      <InputField label="Address" name="address" disabled={true} /> */}
    </Form>
  );
};

export default CompanyInformation;
