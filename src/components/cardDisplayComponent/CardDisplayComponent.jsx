import React, { useEffect, useState } from "react";
import classes from "./cardDisplay.module.scss";
import "../../polyfills/polyfills";
import getShortenedName from "../../polyfills/utils";
import cardLogo from "../../assets/images/card-logo.svg";

const CardDisplayComponent = ({ formCardData }) => {
  const [displayedCardData, setDisplayedCardData] = useState({
    cardName: "Jane Appleseed",
    cardNumber: "0000 0000 0000 0000",
    cardCVC: "000",
    cardDateMonth: "00",
    cardDateYear: "00",
  });

  const formatCardData = (value, placeholder, length, separator = null) => {
    const combined = (value + placeholder).slice(0, length);
    if (separator) {
      return combined.match(new RegExp(`.{1,${separator}}`, "g")).join(" ");
    }
    return combined;
  };

  useEffect(() => {
    const formattedMonth = formCardData.cardDateMonth
      ? String(formCardData.cardDateMonth).padStart(2, "0")
      : "00";

    setDisplayedCardData({
      cardName: formCardData.cardName
        ? getShortenedName(formCardData.cardName, 20).toUpperCase()
        : "JANE APPLESEED",
      cardNumber: formatCardData(
        formCardData.cardNumber || "",
        "0000000000000000",
        16,
        4
      ),
      cardCVC: formatCardData(formCardData.cardCVC || "", "000", 3),
      cardDateMonth: formattedMonth,
      cardDateYear: formatCardData(formCardData.cardDateYear || "", "00", 2),
    });
  }, [formCardData]);

  return (
    <>
      <div className={classes.cardBlock}>
        <div className={classes.cardContent}>
          <div className={classes.cardFront}>
            <div className={classes.cardFrontInner}>
              <div className={classes.cardLogo}>
                <img src={cardLogo} alt="card-logo" />
              </div>
              <div className={classes.cardName}>
                {displayedCardData.cardName}
              </div>
              <div className={classes.cardNumber}>
                {displayedCardData.cardNumber}
              </div>

              <div className={classes.cardDate}>
                {displayedCardData.cardDateMonth}/
                {displayedCardData.cardDateYear}
              </div>
            </div>
          </div>
          <div className={classes.cardBack}>
            <div className={classes.cardBackInner}>
              {displayedCardData.cardCVC}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDisplayComponent;
