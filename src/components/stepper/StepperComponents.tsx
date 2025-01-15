import react, { useEffect, useMemo, useState } from "react";
import { Step, StepperComponent } from "./stepperTypeDef";

import { UseFormReturn } from "react-hook-form";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import classNames from "classnames";
import StepItem from "./ui/Step";

const StepperLabel = ({
  index,
  active,
  label,
}: {
  index: number;
  active: boolean;
  label: string;
}) => {
  return (
    <nav className=" py-2 flex">
      <nav
        className={classNames({
          "p-3 mb-2 text-xs h-6 w-6 aspect-square flex items-center justify-center rounded-full  ":
            true,
          " !bg-blue-600 !text-blue-50": active,
          " !bg-gray-300 !text-gray-600": !active,
        })}
      >
        {index + 1}
      </nav>
      <nav className="bg-gray-200 h-full ">{label}</nav>
    </nav>
  );
};

export const STEP_QUERY_PARAM_KEY = "step";

interface IFormStepper {
  onStepCompleted?: (form: any) => void;
  steps: Step[];
  form: UseFormReturn<any, any, any>;
}

export function updateOrAppendUrlQueryParam(
  url: string,
  key: string,
  value: string | null
): string {
  const urlObject = new URL(url);
  const queryParams = new URLSearchParams(urlObject.search);
  console.log(queryParams, "queryParams");

  if (value === null || value === "") {
    if (queryParams.has(key)) {
      queryParams.delete(key);
    }
  } else {
    if (queryParams.has(key)) {
      queryParams.set(key, value);
    } else {
      queryParams.append(key, value);
    }
  }

  urlObject.search = queryParams.toString();

  return urlObject.toString();
}

export const FormStepper = (props: IFormStepper) => {
  const { steps, onStepCompleted, form } = props;
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currentStepLabel, setCurrentStepLabel] = useState<string>(
    searchParams.get(STEP_QUERY_PARAM_KEY) ?? steps[0]["label"]
  );
  const [CurrentComponet, setCurrentComponent] =
    useState<React.ReactNode | null>(null);

  const currentStepIndex = steps.findIndex(
    (step) => step.label == currentStepLabel
  );

  const getStepIndexFromLabel = (label: string) => {
    return steps?.findIndex((step) => step.label == label);
  };
  const onNextStep = (label: string) => {
    if (isLastStep(label)) {
      onStepCompleted && onStepCompleted(form);
      return;
    }

    const queryParamLabel =
      searchParams.get(STEP_QUERY_PARAM_KEY) ?? currentStepLabel;
    if (queryParamLabel == null) return;

    const nextStepIndex =
      steps.findIndex((step) => step?.label == queryParamLabel) + 1;

    if (nextStepIndex) {
      const newUrl = updateOrAppendUrlQueryParam(
        window.location.href,
        STEP_QUERY_PARAM_KEY,
        steps[nextStepIndex]?.label
      );
      router.push(newUrl);
    }
  };

  const onPrevStep = (label: string) => {
    if (isFirstStep(label)) {
      console.warn("Error: First Step");
      return;
    }

    const queryParamLabel = searchParams.get(STEP_QUERY_PARAM_KEY);

    if (queryParamLabel == null) {
      console.warn("Error: Query Param");
      return;
    }

    const prevStepIndex =
      steps.findIndex((step) => step?.label == queryParamLabel) - 1;
    if (prevStepIndex == null) {
      console.warn("Error: No Prev Step Index");
      return;
    }

    const newUrl = updateOrAppendUrlQueryParam(
      window.location.href,
      STEP_QUERY_PARAM_KEY,
      steps[prevStepIndex]?.label
    );
    router.push(newUrl);
  };

  const isFirstStep = (label: string) => {
    const currentIndex = getStepIndexFromLabel(label);
    return currentIndex == 0;
  };

  const isLastStep = (label: string) => {
    const currentIndex = getStepIndexFromLabel(label);
    return currentIndex + 1 == steps?.length;
  };

  const getStepComponent = (lbl: string) => {
    const steppComponent = steps
      .find(({ label }) => label == lbl)
      ?.component({
        onNextStep: () => onNextStep(lbl),
        onPrevStep: () => onPrevStep(lbl),
        isFirstStep: isFirstStep(lbl),
        isLastStep: isLastStep(lbl),
        form: form,
      });
    if (!steppComponent) return <></>;
    return steppComponent;
  };

  const setCurrentStepComponent = (label: string) => {
    if (label == null) return;
    const newUrl = updateOrAppendUrlQueryParam(
      window.location.href,
      STEP_QUERY_PARAM_KEY,
      label
    );
    router.push(newUrl);
  };

  useEffect(() => {
    const cslabel = searchParams.get(STEP_QUERY_PARAM_KEY);
    if (cslabel == null) return;
    setCurrentStepLabel(searchParams.get(STEP_QUERY_PARAM_KEY) as string);
  }, [searchParams.get(STEP_QUERY_PARAM_KEY)]);

  return (
    <div className=" flex flex-col">
      {steps?.map((step, i) => (
        <StepItem
          key={i}
          onNextStep={() => onNextStep(step.label)}
          onPrevStep={() => onPrevStep(step.label)}
          isLastStep={isLastStep(step.label)}
          isFirstStep={isFirstStep(step.label)}
          steps={steps}
          currentStepIndex={currentStepIndex}
          label={step.label}
          active={currentStepLabel == step.label}
          Component={getStepComponent(step.label)}
          setCurrentStepComponent={setCurrentStepComponent}
          index={i}
          isCompleted={true}
        />
      ))}
    </div>
  );
};
