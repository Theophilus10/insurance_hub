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

const durationOptions = [
  { value: "One year", label: "One year" },
  { value: "Short Period", label: "Short Period" },
  { value: "Prorata", label: "Prorata" },
];

const CoverTypeOptions = [
  { value: "Comprehensive", label: "Comprehensive" },
  { value: "Third Party Fire and Theft", label: "Third Party Fire and Theft" },
  { value: "Third Party", label: "Third Party" },
];

const scheduleTypeOptions = [
  { value: "PRIVATE INDIVIDUAL", label: "PRIVATE INDIVIDUAL" },
  { value: "HIRING CAR", label: "HIRING CAR" },
];
const excessTypeOptions = [
  { value: "Excess is Applicable", label: "Excess is Applicable" },
  { value: "Excess is Bought", label: "Excess is Bought" },
  { value: "Voluntary Excess is Taken", label: "Voluntary Excess is Taken" },
];
const coInsurerOptions = [
  {
    value: "Activa International Insurance",
    label: "Activa International Insurance",
  },
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
      <div className="grid grid-cols-1 sm:max-w-[150px] lg:max-w-[300px] xl:max-w-[400px] py-7">
        <h3 className="font-semibold py-5">Policy To:</h3>
        <InputField
          label="fullname or ID or Email "
          name="find_customer"
          type="search"
        />
      </div>

      <div className="flex py-5 gap-6 ">
        <IconButton icon="mdi:search" color="primary" />
        <Button>Add New Customer</Button>
      </div>
      <Divider className="border-b-4 border-black-500" />
      <div className="flex gap-8 py-4">
        <div className="flex-1">
          <SelectField
            label="Currency"
            name="currency"
            required
            options={options}
          />
        </div>
        <div className="flex-1">
          <InputField
            label="Exchange Rate"
            name="exchange_rate"
            disabled={true}
          />
        </div>
      </div>
      <div className="flex gap-8 py-4">
        <div className="flex-1">
          <SelectField
            label="Duration"
            name="duration"
            required
            options={durationOptions}
          />
        </div>
        <div className="flex-1">
          <InputField label="Days" name="exchange_rate" disabled={true} />
        </div>
      </div>
      <div className="flex gap-8 py-4">
        <div className="flex-1">
          <InputField
            label="Inception Date"
            name="inception_date"
            type="date"
          />
        </div>
        <div className="flex-1">
          <InputField label="Expiry Date" name="expiry_date" disabled={true} />
        </div>
      </div>
      <SelectField
        label="Cover Type"
        name="cover_type"
        required
        options={CoverTypeOptions}
      />
      <SelectField
        label="Scedule Type"
        name="scedule_type"
        required
        options={scheduleTypeOptions}
      />
      <div className="flex gap-8 py-4">
        <div className="flex-1">
          <InputField label="Sum Insured" name="sum_insured" type="number" />
        </div>
        <div className="flex-1">
          <InputField label="Rate" name="rate" disabled={true} />
        </div>
      </div>
      <SelectField
        label="Excess"
        name="excess"
        required
        options={excessTypeOptions}
      />
      <div className="flex gap-8 py-4">
        <div className="flex-1">
          <InputField label="Excess Rate" name="excess_rate" type="number" />
        </div>
        <div className="flex-1">
          <InputField
            label="Excess Amount "
            name="rate"
            type="number"
            disabled={true}
          />
        </div>
      </div>
      <SelectField
        label="Co-Insurer"
        name="co_insurer"
        required
        options={coInsurerOptions}
      />
      <div className="flex gap-8 py-4">
        <div className="flex-1">
          <InputField
            label="Co-Insure Rate (%)"
            name="co__nsure_rate"
            type="number"
          />
        </div>
        <div className="flex-1">
          <InputField
            label="Co Insure Amount"
            name="co_insure_amount"
            type="number"
            disabled={true}
          />
        </div>
      </div>
      <div className="flex gap-8 py-4">
        <div className="flex-1">
          <InputField label="TPPD Limit" name="tppd_limit" type="number" />
        </div>
        <div className="flex-1">
          <InputField label="TPPD Rate" name="tppd_rate" type="number" />
        </div>
      </div>

      {/* <InputField
        label="First Name"
        name="first_name"
        value="yes"
        disabled={true}
      /> */}

      {/* Add responsive styling to the other fields as needed */}
      {/* <InputField label="code" name="code" disabled={true} />
      <InputField label="Phone" name="phone" disabled={true} />
      <InputField label="Email" name="email" disabled={true} />
      <InputField label="Address" name="address" disabled={true} /> */}
    </Form>
  );
};

export default CompanyInformation;
