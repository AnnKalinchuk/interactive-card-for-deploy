import React from "react";

import { useFormContext } from "react-hook-form";
import classes from "./cardForm.module.scss";

const CardFormComponent = ({ onSubmit, errors, isValid }) => {
  const { register, trigger, setValue } = useFormContext();

  const handleMonthInputChange = (e) => {
    let value = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(value)) {
      // Handle single digit input
      if (value.length === 1) {
        if (value === "0" || value === "1") {
          setValue("cardDateMonth", value);
          trigger("cardDateMonth");
        } else if (value === "") {
          setValue("cardDateMonth", "");
          trigger("cardDateMonth");
        }
      }
      // Handle two digit input
      else if (value.length === 2) {
        const firstDigit = value.charAt(0);
        const secondDigit = value.charAt(1);

        if (
          (firstDigit === "0" && secondDigit >= "1" && secondDigit <= "9") ||
          (firstDigit === "1" && secondDigit >= "0" && secondDigit <= "2")
        ) {
          setValue("cardDateMonth", value);
          trigger("cardDateMonth");
        } else {
          // Invalid input, reset to previous valid value
          setValue("cardDateMonth", firstDigit);
          trigger("cardDateMonth");
        }
      }
    } else {
      // Non-numeric input, reset to previous valid value
      setValue("cardDateMonth", "");
      trigger("cardDateMonth");
    }
  };

  const validateMonthInput = (value) => {
    const month = parseInt(value, 10);
    if (isNaN(month) || month < 1 || month > 12) {
      return "Invalid month";
    }
    return true;
  };

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <label>
        CARDHOLDER NAME
        <input
          className={`${classes.cardName} ${
            errors.cardName ? classes.error : ""
          }`}
          type="text"
          name="cardName"
          placeholder="e.g. Jane Appleseed"
          {...register("cardName")}
          onBlur={() => trigger("cardName")}
        />{" "}
        {errors.cardName && (
          <span className={classes.error}>{errors.cardName.message}</span>
        )}
      </label>

      <label>
        CARD NUMBER
        <input
          className={`${classes.cardNumber} ${
            errors.cardNumber ? classes.error : ""
          }`}
          type="text"
          name="cardNumber"
          placeholder="e.g. 1234 5678 9123 4567"
          maxLength={16}
          {...register("cardNumber", { pattern: /^\d+$/ })}
          onBlur={() => trigger("cardNumber")}
        />
        {errors.cardNumber && (
          <span className={classes.error}>{errors.cardNumber.message}</span>
        )}
      </label>
      <div className={classes.cardDateAndCVC}>
        <label className={classes.cardDate}>
          EXP. DATE (MM/YY)
          <section>
            <input
              className={`${classes.cardDateMonth} ${
                errors.cardDateMonth ? classes.error : ""
              }`}
              type="text"
              name="cardDateMonth"
              placeholder="MM"
              maxLength={2}
              {...register("cardDateMonth", {
                validate: validateMonthInput,
              })}
              onChange={handleMonthInputChange}
              onBlur={() => trigger("cardDateMonth")}
            />
            <input
              className={`${classes.cardDateYear} ${
                errors.cardDateYear ? classes.error : ""
              }`}
              type="text"
              name="cardDateYear"
              placeholder="YY"
              maxLength={2}
              {...register("cardDateYear", {
                pattern: /^\d+$/,
              })}
              onBlur={() => trigger("cardDateYear")}
            />
          </section>
          {(errors.cardDateMonth || errors.cardDateYear) && (
            <span className={classes.error}>
              {errors.cardDateMonth
                ? errors.cardDateMonth.message
                : errors.cardDateYear.message}
            </span>
          )}
        </label>

        <label>
          CVC
          <input
            className={`${classes.cardCVC} ${
              errors.cardCVC ? classes.error : ""
            }`}
            type="text"
            name="cardCVC"
            placeholder="e.g. 123"
            maxLength={3}
            {...register("cardCVC")}
            onBlur={() => trigger("cardCVC")}
          />
          {errors.cardCVC && (
            <span className={classes.error}>{errors.cardCVC.message}</span>
          )}
        </label>
      </div>
      <input
        type="submit"
        className={classes.formButton}
        value={"Confirm"}
        disabled={!isValid}
      />
    </form>
  );
};

export default CardFormComponent;
