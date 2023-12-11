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
import { object, number } from "zod";

const schema = object({
  basic_premium: number(),
  adjusted_premium: number(),
  sticker_fee: number(),
  brown_card_fee: number(),
  personal_accident: number(),
  extra_seats: number(),
  extra_tppd: number(),
  ecowas_peril: number(),
  additional_perils: number(),
});
const PremiumComputation = () => {
  return (
    <Card className="max-w-[250px] md:max-w-[250px] lg:max-w-[300px]">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">
          Premium Computation
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-start">
        <Form schema={schema}>
          <InputField
            label="Basic Premium"
            name="basic_premium"
            type="number"
            disabled={true}
          />
          <InputField
            label="Adjusted Premium"
            name="adjusted_premium"
            type="number"
            disabled={true}
          />
          <InputField
            label="Sticker Fee"
            name="sticker_Fee"
            type="number"
            disabled={true}
          />
          <InputField
            label="Brown Card Fee"
            name="Brown_cardfee"
            type="number"
            disabled={true}
          />
          <InputField
            label="Personal Acident"
            name="personal_acident"
            type="number"
            disabled={true}
          />
          <InputField
            label="Extra Seats"
            name="extra_seats"
            type="number"
            disabled={true}
          />
          <InputField
            label="Extra TPPD"
            name="extra_tppd"
            type="number"
            disabled={true}
          />
          <InputField
            label="Ecowas Peril"
            name="ecowas_peril"
            type="number"
            disabled={true}
          />
          <InputField
            label="Additional Perils"
            name="additional_perils"
            type="number"
            disabled={true}
          />
        </Form>
      </CardContent>
    </Card>
  );
};

export default PremiumComputation;
