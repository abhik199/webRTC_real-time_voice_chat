import React, { useState } from "react";
import Card from "../../../../components/shared/Card/Card";
import Button from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import style from "../StepEmail.module.css";
import { sendOtp } from "../../../../http/index";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/authSlice";

const Phone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();

  async function submit() {
    const { data } = await sendOtp({ phone: phoneNumber });
    console.log(data);
    dispatch(setOtp({ phone: data.phone, hash: data.hash }));
    onNext();
  }

  return (
    <>
      <Card title="Enter your phone number" icon="phone">
        <TextInput
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <div className={style.actionButtonWrap}>
          <div>
            <Button text="Next" onClick={submit}></Button>
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
