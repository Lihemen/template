import type { FormikConfig, FormikValues } from "formik";
import { ReactNode } from "react";

export interface FormStepInterface
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  shouldSubmit?: boolean;
  onSubmit?: FormikConfig<any>["onSubmit"];
}

export function FormStep({ children }: FormStepInterface) {
  return <>{children as ReactNode} </>;
}
