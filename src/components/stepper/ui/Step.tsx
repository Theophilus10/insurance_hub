import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  forwardRef,
  ForwardedRef,
} from "react";
import classNames from "classnames";
import { debounce } from "@app/lib/utils";
import { StepperComponentParam, type Step } from "../stepperTypeDef";

type stepParam = Partial<StepperComponentParam<any>> & {
  active: boolean;
  Component: React.ReactNode;
  label: string;
  index: number;
  isCompleted: boolean;
  steps: Step[];
  currentStepIndex: number;
  setCurrentStepComponent: (label: string) => void;
};

const step = forwardRef(
  (props: stepParam, ref: ForwardedRef<HTMLDivElement | null>) => {
    const {
      active,
      Component,
      currentStepIndex,
      index,
      label,
      steps,
      onNextStep,
      isFirstStep,
      onPrevStep,
      isLastStep,
      setCurrentStepComponent,
    } = props;
    const [scrollHeight, setScrollHeight] = useState(0);
    let stepperContent = useRef<HTMLDivElement | null>(null);

    function getFirstWorkFromLabel(label: string) {
      if (!label) return;
      const words = label.trim().split(" ");
      return words[0];
    }

    function handleOnStepToggle() {
      if (currentStepIndex > index) {
        setCurrentStepComponent(label);
      }
    }

    const resetScrollHeight = () =>
      setScrollHeight(stepperContent!?.current!?.scrollHeight);

    const debouncedResetScrollHeight = debounce(resetScrollHeight, 300);

    useEffect(() => {
      debouncedResetScrollHeight();
    }, [stepperContent, active]);

    useEffect(() => {
      //Adding window resize listener for current content
      window.addEventListener("resize", debouncedResetScrollHeight, true);

      //Adding dom resizeobser for current content
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { contentRect } = entry;
          const { height } = contentRect;
          // setScrollHeight(height);
          debouncedResetScrollHeight();
        }
      });

      const targetElement = stepperContent!.current;
      if (targetElement) {
        resizeObserver.observe(targetElement);
      }
      return () => {
        window.removeEventListener("resize", debouncedResetScrollHeight, true);
        resizeObserver.disconnect();
      };
    }, []);

    return (
      <div ref={ref} className={`flex`}>
        <nav
          className={`basis-[4rem] py-2 min-h-full flex flex-col  text-center stepper-index ${
            isLastStep == false && "stepper-apply-indicator"
          }`}
        >
          <nav
            className={classNames({
              "p-3 mb-2 mx-auto h-6 w-6 flex items-center justify-center rounded-full  text-white":
                true,
              " bg-orange-400": active,
              " bg-gray-300": !active,
            })}
          >
            {index + 1}
          </nav>
          {/* <nav className="w-[1px] bg-gray-300 mx-auto h-full"></nav> */}
        </nav>

        <nav className=" grow w-full flex flex-col py-2 cursor-pointer  ">
          <nav
            onClick={() => handleOnStepToggle()}
            className={classNames({
              relative: true,
              "text-orange-400": active,
              "text-gray-500": !active,
            })}
          >
            {label}
          </nav>
          <div
            style={{ height: active ? "100%" : "0px" }}
            ref={stepperContent}
            className={classNames({
              "flex min-wfu flex-col overflow-hidden transform-none transition-[padding] duration-100":
                true,
              "u--slideUp": active,
              "pt-5 -translate-y-[10%]": !active,
            })}
          >
            <>{Component}</>
          </div>
        </nav>
      </div>
    );
  }
);
export default step;
