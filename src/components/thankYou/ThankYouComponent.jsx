import React from "react";
import classes from "./thankYou.module.scss";
import iconComplete from "../../assets/images/icon-complete.svg";

const ThankYouComponent = ({ onDone }) => {
  return (
    <div className={classes.thankWrapper}>
      <img src={iconComplete} className={classes.iconComplete} alt="icon" />
      <div className={classes.thankTitle}>THANK YOU!</div>
      <p className={classes.thankText}>We've added your card details</p>
      <button className={classes.thankButton} onClick={onDone}>
        Continue
      </button>
    </div>
  );
};

export default ThankYouComponent;
