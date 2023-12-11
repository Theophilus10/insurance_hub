'use client';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  return router.replace('/private/marine/reporting/pending_policies');
};

export default Page;
