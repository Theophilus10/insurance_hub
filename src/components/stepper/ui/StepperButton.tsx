import React from "react";
import { Button } from "@app/components/ui/button";
import { StepperComponentParam } from "../stepperTypeDef";

type withoutForm = Omit<StepperComponentParam<any>, "form">;
function StepperButton(props: withoutForm) {
  const { onPrevStep, onNextStep, isLastStep, isFirstStep } = props;
  return (
    <div className="m-3">
      <nav className="!bg-white py-3 px-5 rounded-md border mt-2">
        <nav className="grid ml-auto grid-cols-2  w-max gap-3">
          <Button
            onClick={(e: React.FormEvent) => {
              e.preventDefault();
              onPrevStep && onPrevStep();
            }}
            variant="outline"
            className="flex items-center gap-2 !min-h-full !h-full"
            disabled={isFirstStep}
            size="lg"
          >
            previous
          </Button>

          <Button
            onClick={(e: React.FormEvent) => {
              e.preventDefault();
              onNextStep && onNextStep();
            }}
            variant="primary"
            className="flex items-center gap-2 truncate h-full"
            size="lg"
          >
            {isLastStep ? "Submit Proposal" : "next "}
          </Button>
        </nav>
      </nav>
    </div>
  );
}

export default StepperButton;
