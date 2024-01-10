import { InputField } from '@app/components/forms/ShadcnFields';
import React from 'react';

const PolicyExcess = () => {
  return (
    <div>
      <InputField label='Policy Excess' onChange={e => console.log(e)} />
    </div>
  );
};

export default PolicyExcess;
