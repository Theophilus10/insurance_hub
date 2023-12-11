// import { Button } from "@app/components/ui/button";
// import InputField from "@app/components/forms/InputField";
"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@app/components/ui/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@app/components/ui/card";
import CompanyInformation from "@app/app/views/underwriting/motor/CompanyInformation";
import ScrollSection from "@app/components/ui/scrollSection";
import PremiumComputation from "@app/app/views/underwriting/motor/PremiumComputation";
import PremiumPayable from "@app/app/views/underwriting/motor/PremiumPayable";
import CustomerInfo from "@app/app/views/underwriting/motor/CustomerInfo";
import VehicleInfo from "@app/app/views/underwriting/motor/VehicleInfo";
import PolicyInfo from "@app/app/views/underwriting/motor/PolicyInfo";
import Divider from "@app/components/ui/Divider";
const TabsComponent = () => {
  return (
    <ScrollSection className="container mx-auto px-4 lg:px-8 py-6">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl py-5">
            Underwriting Motor Insurance
          </CardTitle>
          <Divider />
          <CardDescription className="text-sm md:text-base">
            Make changes to your account here.
          </CardDescription>
          <CardContent>
            <CompanyInformation />
          </CardContent>
        </CardHeader>
      </Card>

      {/* <TabsContent value="customer-info" className="py-4">
          <Card className="max-w-md mx-auto md:max-w-lg lg:max-w-xl">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Policy To:</CardTitle>
              <CardDescription className="text-sm md:text-base">
                Search for a customer. If not add a new customer
              </CardDescription>
              <CardContent>
                <CustomerInfo />
              </CardContent>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="vehicle-info" className="py-4">
          <Card className="max-w-md mx-auto md:max-w-lg lg:max-w-xl">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">
                About Vehicle
              </CardTitle>
              <CardDescription className="text-sm md:text-base">
                Enter Your Vehicle information here
              </CardDescription>
              <CardContent>
                <VehicleInfo />
              </CardContent>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="policy-info" className="py-4">
          <Card className="max-w-md mx-auto md:max-w-lg lg:max-w-xl">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Policy</CardTitle>
              <CardDescription className="text-sm md:text-base">
                Policy information goes here
              </CardDescription>
              <CardContent>
                <PolicyInfo />
              </CardContent>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="md:flex gap-[20px]">
        <PremiumComputation />
        <PremiumPayable />
      </div> */}
    </ScrollSection>
  );
};

export default TabsComponent;
