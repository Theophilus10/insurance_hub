import { Upload } from 'lucide-react';
import React from 'react';

const DocumentUploads = () => {
  return (
    <div>
      <h2>Supporting Documents</h2>
      <div className='flex items-center justify-center'>
        <div className='flex flex-col justify-center items-center p-32'>
          <Upload />
          <p>Drop files here or click to upload.</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploads;
