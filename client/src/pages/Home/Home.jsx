import React from "react";
import styles from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/shared/Card/Card";
import Button from "../../components/shared/Button/Button";
const Home = () => {
  const singInLinkStyle = {
    color: "#0077ff",
    fontWeight: "bold",
    textDecoration: "none",
    marginLeft: "10px",
  };
  const history = useNavigate();
  function startRegister() {
    history("/authenticate");
  }
  return (
    <div className={styles.cardWrapper}>
      <Card title="welcome to codershouse!" icon="logo">
        <p className={styles.text}>
          were working hard to get Coderhouse ready for everyone! while we wrap
          up the finishing yourches we adding people gradually to make sure
          nothing breaker
        </p>
        <div>
          <Button onClick={startRegister} text={"Let's Go"}></Button>
        </div>
        <div className={styles.signinWrapper}>
          <span className={styles.hasInvite}>Have an invite text?</span>
        </div>
      </Card>
    </div>
  );
};

export default Home;
