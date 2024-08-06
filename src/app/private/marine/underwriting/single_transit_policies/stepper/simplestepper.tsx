import React, { useEffect, useMemo, useRef } from "react";
import {
  IStepperOPtions,
  getCurrentStep,
  onNextStep,
  onPrevStep,
  isLastStep,
  isFirstStep,
  onStepChange,
  stepperOptions,
} from "./steppertypes";
import classNames from "classnames";
import Step from "./step";

import { Button } from "app/app/components/form-components/button";

const Simplestepper: React.FC<IStepperOPtions> = (props) => {
  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(0);
  const { steps, onStepChange, options } = props;
  const currentStepElRef = useRef<HTMLDivElement | null>(null);

  const isMounted = useRef(false);

  const getCurrentStep: getCurrentStep = () => {
    let c_step = steps.at(currentStepIndex);
    return c_step;
  };

  const isLastStep: isLastStep = () => {
    return currentStepIndex + 1 == steps.length;
  };

  const isFirstStep: isFirstStep = () => {
    return currentStepIndex == 0;
  };

  const getStepOffsetTop = (
    scrollableContainer: string,
    currentStepEl: string
  ): number => {
    let parentElement = document.querySelector(
      scrollableContainer
    ) as HTMLElement | null;
    let childElement = document.querySelector(
      "#stepper-" + currentStepIndex
    ) as HTMLElement | null;
    // console.log(childElement)
    let offsetTop = 0;
    while (childElement && childElement !== parentElement) {
      offsetTop += childElement.offsetTop;
      childElement = childElement.offsetParent as HTMLElement | null;
    }

    return offsetTop - 60;
  };

  const handleOnscroll = (scrollerbleEl: string, offset?: number) => {
    var container = document.querySelector(scrollerbleEl);
    if (container == null)
      throw new Error("Element not found: " + scrollerbleEl);
    var c_step = `.stepper-active`;
    container.scrollTo({
      top: offset ?? getStepOffsetTop(scrollerbleEl, c_step),
      behavior: "instant",
    });
  };

  const handleOnStepChange = (): void => {
    if (onStepChange) {
      onStepChange(steps[currentStepIndex]);
    }
    if (options) {
      const { scrollable } = options;
      if (scrollable)
        handleOnscroll(scrollable.scrollableElement, scrollable.offset);
    }
  };

  const onNextStep: onNextStep = () => {
    if (!isLastStep()) {
      isMounted.current = true;
      setCurrentStepIndex((cv) => (cv = cv + 1));
      // handleOnStepChange()
    }
  };

  const onPrevStep: onPrevStep = () => {
    if (!isFirstStep()) {
      isMounted.current = true;
      setCurrentStepIndex((cv) => cv - 1);
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      setTimeout(function () {
        handleOnStepChange();
      }, 100);
    }
  }, [currentStepIndex]);

  return (
    <div className="flex flex-col">
      <div>
        <div className="flex flex-col gap-1">
          <div className=" flex flex-col bg-white rounded-md pr-1 py-3">
            {steps.map((step, i) => (
              <Step
                currentStepIndex={currentStepIndex}
                setCurrentStepIndex={setCurrentStepIndex}
                steps={steps}
                ref={currentStepElRef}
                key={i}
                isCompleted={currentStepIndex > i}
                active={currentStepIndex == i}
                index={i}
                onNextStep={onNextStep}
                onPrevStep={onPrevStep}
                isLastStep={isLastStep}
                getCurrentStep={getCurrentStep}
                label={step.label}
                Component={step.component}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simplestepper;
