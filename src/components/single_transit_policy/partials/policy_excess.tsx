import { InputField } from '@app/components/forms/ShadcnFields';
import React from 'react';

interface Props {
  policyExcess: string;
  onChange: (value: string) => void;
}
const PolicyExcess = ({ policyExcess, onChange }: Props) => {
  return (
    <div className='py-5'>
      <InputField
        label='Policy Excess'
        onChange={e => onChange(e.target.value)}
        value={policyExcess}
      />
    </div>
  );
};

export default PolicyExcess;
