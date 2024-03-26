import {
  type FormikConfig,
  type FormikValues,
  type FormikProps,
  Formik,
  Form as FormikForm,
} from "formik";
import React, { ReactNode, useRef } from "react";

import { FormStep, type FormStepInterface } from "./step";

import { useFormControls } from "~/hooks";

interface FormProps extends FormikConfig<any> {
  className?: string;
}

export function StepperForm({ children, className, ...props }: FormProps) {
  const formikRef = useRef<FormikProps<FormikValues>>(null);
  const childrenArray = React.Children.toArray(
    children as ReactNode | ReactNode[]
  ) as Array<React.ReactElement<FormStepInterface>>;

  const { isLastStep, formControls, nextStep } = useFormControls(
    childrenArray.length
  );

  const currentChild = childrenArray[
    formControls.form_step
  ] as React.ReactElement<FormStepInterface>;

  return (
    <Formik
      {...props}
      innerRef={formikRef}
      onSubmit={async (values, actions) => {
        if (currentChild.props?.shouldSubmit) {
          await currentChild?.props.onSubmit?.(values, actions);
          return;
        }
        if (isLastStep()) {
          await props.onSubmit(values, actions);
          return;
        }
        nextStep();
      }}
      validationSchema={
        currentChild?.props.validationSchema ?? props.validationSchema
      }>
      <FormikForm className={className}>{currentChild}</FormikForm>
    </Formik>
  );
}

StepperForm.Step = FormStep;
