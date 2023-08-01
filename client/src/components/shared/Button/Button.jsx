import React from "react";
import style from "./Button.module.css";

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className={style.button}>
      <span>{text}</span>
      {/* <img src="" alt="" />    TODO i am no images not using images  */}
    </button>
  );
};

export default Button;
