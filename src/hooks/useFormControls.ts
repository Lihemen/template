import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "use-query-params";

export function useFormControls(steps: number = 1) {
  const [formControls, setFormControls] = useQueryParams({
    form_step: withDefault(NumberParam, 0),
    submit_on_this_step: withDefault(StringParam, "false"),
  });

  const isLastStep = () => {
    return formControls.form_step === steps - 1;
  };

  const isFirstStep = () => {
    return formControls.form_step === 0 || steps === 1;
  };

  const nextStep = () => {
    if (isLastStep()) return;
    setFormControls({ form_step: formControls.form_step + 1 });
  };

  const prevStep = () => {
    if (isFirstStep()) return;
    setFormControls({ form_step: formControls.form_step - 1 });
  };

  return {
    isFirstStep,
    isLastStep,
    prevStep,
    nextStep,
    formControls,
    setFormControls,
  };
}
