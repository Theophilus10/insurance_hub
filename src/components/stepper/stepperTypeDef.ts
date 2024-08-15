import React from "react";
import { UseFormReturn } from "react-hook-form";
import z from "zod";

export type formSchemaType = z.ZodObject<any, any, any> | z.ZodEffects<any>;

export interface StepperComponentParam<
  TValue extends UseFormReturn<z.infer<formSchemaType>>
> {
  onNextStep: () => void;
  onPrevStep: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  form: TValue;
}

export type StepperComponent = React.FC<StepperComponentParam<any>>;

export type Step = {
  label: string;
  icons?: string;
  component: StepperComponent;
};
