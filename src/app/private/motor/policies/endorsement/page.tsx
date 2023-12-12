"use client";
import Form from "@app/components/forms/Form";
import InputField from "@app/components/forms/InputField";
import { Button } from "@app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@app/components/ui/card";
import Divider from "@app/components/ui/Divider";
import IconButton from "@app/components/ui/IconButton";
import DataTable from "@app/components/datatable/datatable";
import { columns } from "./column";
import { data } from "./data";
import Link from "next/link";
const Page = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="py-5">All Endorsements</CardTitle>
        <Divider />
        <CardContent className="py-5">
          <Form>
            <div className="py-3">
              <InputField
                label="Find by Policy Number or Vehicle Reg#"
                type="search"
                name="searching"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-5">
              <InputField label="Start Date" type="date" name="searching" />
              <InputField label="End Date" type="date" name="searching" />
            </div>

            <div className="flex py-5 gap-10 ">
              <IconButton icon="mdi:search" color="primary" />
              <Link href="/private/motor/policies/endorsement/new">
                <Button>New Endorsement</Button>
              </Link>
            </div>
          </Form>
          <Divider className="border-black-900 h-1" />
          <DataTable columns={columns} data={data} />
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default Page;
