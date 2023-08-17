import React, { useState } from "react";
import styles from "./StepEmail.module.css";
import Phone from "./Phone/Phone";
import Email from "./Email/Email";
const StepPhoneEmailMap = {
  phone: Phone,
  email: Email,
};

const StepPhoneEmail = ({ onNext }) => {
  const [type, setType] = useState("phone");
  const Component = StepPhoneEmailMap[type];

  return (
    <>
      <div className={styles.cardWrapper}>
        <div>
          <div className={styles.buttonWrapper}>
            <button
              className={`${styles.tabButton} ${
                type === "phone" ? styles.active : ""
              } `}
              onClick={() => setType("phone")}
            >
              <img src="/images/phone-white.png" alt="phone" />
            </button>
            <button
              className={`${styles.tabButton} ${
                type === "email" ? styles.active : ""
              }`}
              onClick={() => setType("email")}
            >
              <img src="/images/mail-white.png" alt="email" />
            </button>
          </div>
          <Component onNext={onNext}></Component>
        </div>
      </div>
    </>
  );
};

export default StepPhoneEmail;
