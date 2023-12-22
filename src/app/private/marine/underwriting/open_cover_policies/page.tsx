'use client';

import { Alert, AlertDescription, AlertTitle } from '@app/components/ui/alert';
import { Terminal } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className='flex w-full h-full justify-center items-center'>
      <Alert className='w-[500px] bg-orange-200'>
        <Terminal className='h-4 w-4' />
        <AlertTitle>Anticipate!</AlertTitle>
        <AlertDescription>Double Transit Coming soon</AlertDescription>
        <Link href='/private/marine/underwriting/open_cover_policies/new'>
          click to view create page
        </Link>
      </Alert>
    </div>
  );
};

export default page;
