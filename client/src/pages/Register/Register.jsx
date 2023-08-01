import React, { useState } from "react";
import styles from "./Register.module.css";

import StepPhoneEmail from "../Steps/StepPhoneEmail/StepPhoneEmail";

import StepOtp from "../Steps/StepOtp/StepOtp";
import StepName from "../Steps/StepName/StepName";
import StepAvater from "../Steps/StepAvatar/StepAvater";
import StepUserName from "../Steps/StepUserName/StepUserName";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
  3: StepName,
  4: StepAvater,
  5: StepUserName,
};

const Register = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];
  function onNext() {
    setStep(step + 1);
  }
  return (
    <div>
      <Step onNext={onNext}></Step>
    </div>
  );
};
export default Register;
