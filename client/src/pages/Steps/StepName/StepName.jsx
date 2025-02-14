import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import Button from "../../../components/shared/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../../store/activateSlice";
import styles from "./StepName.module.css";

const StepName = ({ onNext }) => {
  const { name } = useSelector((state) => state.activate);
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState(name);
  function nextStep() {
    if (!fullname) {
      return;
    }
    dispatch(setName(fullname));
    onNext();
  }

  return (
    <>
      <Card title="what's your full name ?">
        <TextInput
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />

        <p className={styles.paragraph}>People use real name at coderRoom</p>
        <div className={styles.actionButtonWrap}>
          <Button onClick={nextStep} text="Next" />
        </div>
      </Card>
    </>
  );
};

export default StepName;
