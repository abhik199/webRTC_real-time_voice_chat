import React, { useState } from "react";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import style from "../StepEmail.module.css";

const Email = () => {
  const [email, setEmail] = useState("");
  return (
    <>
      <Card title="Enter your email id" icon="email-emoji">
        <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
        <div>
          <div className={style.actionButtonWrap}>
            <div>
              <Button text="Next"></Button>
            </div>
            <p className={style.bottomParagraph}>
              By entering your number, you're agreeing to our Term of Service
              and privacy Police.Thanks!
            </p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Email;
