import Form from "@app/components/forms/Form";
import SelectField from "@app/components/forms/SelectField";
import InputField from "@app/components/forms/InputField";
import { object, string, number } from "zod";

const options = [
  { value: "sedan", label: "Sedan" },
  { value: "hatchback", label: "Hatchback" },
  { value: "SUV", label: "SUV" },
  { value: "pickup", label: "Pickup Truck" },
  { value: "coupe", label: "Coupe" },
  { value: "convertible", label: "Convertible" },
  { value: "wagon", label: "Wagon" },
  { value: "van", label: "Van" },
  { value: "truck", label: "Truck" },
];

const schema = object({
  registration_number: string(),
  make: string(),
  model: string(),
  color: string(),
  chasis_number: string(),
  year_manufacture: string(),
  engine_capacity: string(),
  mileage: number(),
  body_type: string(),
  seats: number(),
});

const VehicleInfo = () => {
  return (
    <Form schema={schema}>
      <InputField
        label="Reg. Number"
        name="registration_number"
        placeholder="GZ 419 23"
        required
      />

      <InputField label="Make" name="make" placeholder="Make" required />
      <InputField
        label="Model"
        name="model"
        type="text"
        placeholder="Model"
        required
      />
      <InputField
        label="Color"
        name="color"
        type="text"
        placeholder="Color"
        required
      />
      <InputField
        label="Chasis Number"
        name="chasis_number"
        type="text"
        placeholder="Chasis Number"
        required
      />
      <InputField
        label="Year of Mfg"
        name="year_manufacture"
        type="text"
        placeholder="Year of Manufacture"
        required
      />
      <InputField
        label="Engine Capacity(CC/HP)"
        name="engine_capacity"
        type="text"
        placeholder="Engine Capacity"
        required
      />
      <InputField
        label="Mileage"
        name="mileage"
        type="number"
        placeholder="Mileage"
        required
      />

      <SelectField
        label="Body Type"
        name="body_type"
        options={options}
        required
      />

      <InputField
        label="Seats Including Driver"
        name="seats"
        type="number"
        placeholder="Seating Capacity"
        required
      />
    </Form>
  );
};

export default VehicleInfo;
