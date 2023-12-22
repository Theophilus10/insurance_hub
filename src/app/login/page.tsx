"use client";
import { signIn } from "next-auth/react";

import Form from "@app/components/forms/Form";
import { z } from "zod";
import InputField from "@app/components/forms/InputField";
import { Button } from "@app/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BG from "@app/assets/images/bg.jpg";
import logoUrl from "@app/assets/images/logo.png";
import Image from "next/image";
import IconifyIcon from "@app/components/icon";
import IconButton from "@app/components/ui/IconButton";

const initialValues = {
  username: "",
  password: "",
};

const schema = z.object({
  username: z.string().min(1, "Email is required").email(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(3, "Password too short"),
});

export default function LoginPage() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const onSubmit = async (values: any) => {
    try {
      setBusy(true);
      const res = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: true,
      });
      if (res?.error) {
        setError(true);
        console.log("sigin-in error:", res?.error);
        return;
      }
      setError(false);
      // router.replace("/private/dashboard");
    } catch (err) {
      console.log(err);
    } finally {
      setBusy(false);
    }
    // console.log(values);
  };
  return (
    <div className="h-screen w-screen overflow-y-hidden bg-white">
      <div className="flex min-h-full max-h-full overflow-y-hidden">
        <div className="flex flex-1 flex-col overflow-y-auto justify-center lg:flex-none">
          <div className="overflow-y-auto px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <div className="justify-center grid">
                  <Image
                    className="h-24 w-auto"
                    src={logoUrl}
                    alt="pic_logo"
                    loading="lazy"
                  />
                </div>
                <div className="text-center">
                  <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Welcome to THE INSURANCE HUB
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Please sign-in to your account
                  </p>
                </div>
              </div>
              {error && (
                <div className="rounded-md mt-4 border shadow  bg-red-50 text-red-500 text-base border-red-400">
                  <div className="flex justify-between items-center pl-4 pr-2">
                    <div className="flex items-center gap-3">
                      <IconifyIcon
                        icon="solar:danger-circle-bold-duotone"
                        fontSize={18}
                      />
                      <span className="text-sm">Invalid Credentials</span>
                    </div>
                    <div>
                      <IconButton
                        size={20}
                        icon="ic:round-close"
                        onClick={() => setError(false)}
                        color="ghost"
                      />
                    </div>
                  </div>
                </div>
              )}
              <Form
                initialValues={initialValues}
                schema={schema}
                onSubmit={onSubmit}
                className="flex flex-col gap-6 mt-10"
              >
                <InputField
                  name="username"
                  label="Email"
                  required
                  placeholder="admin@insurance-hub.com"
                />
                <InputField
                  name="password"
                  label="Password"
                  required
                  type="password"
                />
                <Button
                  className="mt-4"
                  label="Submit"
                  variant="primary"
                  type="submit"
                  busy={busy}
                />
              </Form>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block ">
          <div className="absolute inset-0">
            <Image
              className="h-full w-full object-cover rounded-sm"
              src={BG}
              alt=""
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
      </div>
    </div>
  );
}
