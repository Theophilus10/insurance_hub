// import { Button } from "@app/components/ui/button";
// import InputField from "@app/components/forms/InputField";
'use client';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@app/components/ui/tabs';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@app/components/ui/card';
import CompanyInformation from '@app/app/views/underwriting/motor/CompanyInformation';
import ScrollSection from '@app/components/ui/scrollSection';
import PremiumComputation from '@app/app/views/underwriting/motor/PremiumComputation';
import PremiumPayable from '@app/app/views/underwriting/motor/PremiumPayable';
import CustomerInfo from '@app/app/views/underwriting/motor/CustomerInfo';
import VehicleInfo from '@app/app/views/underwriting/motor/VehicleInfo';
import PolicyInfo from '@app/app/views/underwriting/motor/PolicyInfo';
const TabsComponent = () => {
  return (
    <ScrollSection className='container mx-auto px-4 lg:px-8 py-6'>
      <Tabs defaultValue='insurance-company' className='w-full'>
        <TabsList className='flex sm:flex-row overflow-y-auto my-10 gap-1 lg:gap-4'>
          <TabsTrigger
            value='insurance-company'
            className='cursor-pointer text-[10px] md:text-sm lg:text-base'
          >
            Insurance Company
          </TabsTrigger>
          <TabsTrigger
            value='customer-info'
            className='cursor-pointer text-[10px] md:text-sm lg:text-base'
          >
            Customer Information
          </TabsTrigger>
          <TabsTrigger
            value='vehicle-info'
            className='cursor-pointer text-[10px] md:text-sm lg:text-base'
          >
            Vehicle Information
          </TabsTrigger>
          <TabsTrigger
            value='policy-info'
            className='cursor-pointer text-[10px]  md:text-sm lg:text-base'
          >
            Policy Information
          </TabsTrigger>
        </TabsList>

        <TabsContent value='insurance-company' className='py-4'>
          <Card className='max-w-md mx-auto md:max-w-lg lg:max-w-xl'>
            <CardHeader>
              <CardTitle className='text-lg md:text-xl'>
                Insurance Company
              </CardTitle>
              <CardDescription className='text-sm md:text-base'>
                Make changes to your account here.
              </CardDescription>
              <CardContent>
                <CompanyInformation />
              </CardContent>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value='customer-info' className='py-4'>
          <Card className='max-w-md mx-auto md:max-w-lg lg:max-w-xl'>
            <CardHeader>
              <CardTitle className='text-lg md:text-xl'>Policy To:</CardTitle>
              <CardDescription className='text-sm md:text-base'>
                Search for a customer. If not add a new customer
              </CardDescription>
              <CardContent>
                <CustomerInfo />
              </CardContent>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value='vehicle-info' className='py-4'>
          <Card className='max-w-md mx-auto md:max-w-lg lg:max-w-xl'>
            <CardHeader>
              <CardTitle className='text-lg md:text-xl'>
                About Vehicle
              </CardTitle>
              <CardDescription className='text-sm md:text-base'>
                Enter Your Vehicle information here
              </CardDescription>
              <CardContent>
                <VehicleInfo />
              </CardContent>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value='policy-info' className='py-4'>
          <Card className='max-w-md mx-auto md:max-w-lg lg:max-w-xl'>
            <CardHeader>
              <CardTitle className='text-lg md:text-xl'>Policy</CardTitle>
              <CardDescription className='text-sm md:text-base'>
                Policy information goes here
              </CardDescription>
              <CardContent>
                <PolicyInfo />
              </CardContent>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
      <div className='md:flex gap-[20px]'>
        <PremiumComputation />
        <PremiumPayable />
      </div>
    </ScrollSection>
  );
};

export default TabsComponent;
