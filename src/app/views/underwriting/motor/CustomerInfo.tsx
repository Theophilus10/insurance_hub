import Form from "@app/components/forms/Form";
import SelectField from "@app/components/forms/SelectField";
import InputField from "@app/components/forms/InputField";
import { object, string } from "zod";
import IconButton from "@app/components/ui/IconButton";
import { Button } from "@app/components/ui/button";

const schema = object({
  username: string(),
  password: string().min(8),
});

const CustomerInfo = () => {
  return (
    <Form schema={schema}>
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
      {/* <InputField label="Last Name" name="last_name" disabled={true} />
      <InputField label="Other Name" name="other_name" disabled={true} />
      <InputField label="Phone" name="phone" disabled={true} /> */}
    </Form>
  );
};

export default CustomerInfo;
