import * as Yup from "yup";

const cardFormValidationSchema = Yup.object().shape({
  cardName: Yup.string()
    .required("Name can't be blank")
    .test(
      "is-full-name",
      "Please enter at least a first and last name",
      (value) => value && value.trim().split(" ").length >= 2
    ),
  cardNumber: Yup.string()
    .required("Can't be blank")
    .length(16, "Number must be exactly 16 digits")
    .matches(/^\d+$/, "Wrong format, numbers only"),
  cardDateMonth: Yup.string()
    .required("Can't be blank. Must be e.g. 01, 02, ..., 12")
    .length(2, "Month must be exactly 2 digits, e.g. 01, 02, ..., 12"),
  cardDateYear: Yup.string().required("Can't be blank"),
  cardCVC: Yup.string()
    .required("Can't be blank")
    .length(3, "CVC must be exactly 3 digits"),
});

export default cardFormValidationSchema;
