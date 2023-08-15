import React, { useState } from "react";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import style from "../StepEmail.module.css";

const Phone = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <>
      <Card title="Enter your phone number" icon="phone">
        <TextInput
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <div className={style.actionButtonWrap}>
          <div>
            <Button text="Next"></Button>
          </div>
          <p className={style.bottomParagraph}>
            By entering your number, you're agreeing to our Term of Service and
            privacy Police.Thanks!
          </p>
        </div>
      </Card>
    </>
  );
};

export default Phone;
