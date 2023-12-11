import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@app/components/ui/card";
import { object, string } from "zod";

const schema = object({
  basic_premium: string(),
});
const PremiumPayable = () => {
  return (
    <Card className="max-w-[250px] md:max-w-[250px] lg:max-w-[300px]">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">
          Premium Payable Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-start">
        <Form schema={schema}>
          <InputField
            label="Applicable Rate(%)"
            name="appl_rate"
            type="text"
            disabled={true}
          />
          <InputField
            label="Sub Total"
            name="sub_total"
            type="text"
            disabled={true}
          />
          <InputField
            label="Total Loadings"
            name="total_loadings"
            type="text"
            disabled={true}
          />
          <InputField
            label="Total Discount"
            name="total_discount"
            type="text"
            disabled={true}
          />
          <InputField
            label="Total Premium Payable"
            name="total_premium_payable"
            type="text"
            disabled={true}
          />
        </Form>
      </CardContent>
    </Card>
  );
};

export default PremiumPayable;
