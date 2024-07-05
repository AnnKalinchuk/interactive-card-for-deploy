import { useState } from "react";
import classes from "./App.module.scss";
import CardFormComponent from "./components/cardForm/CardFormComponent";
import CardDisplayComponent from "./components/cardDisplayComponent/CardDisplayComponent";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

/* import * as Yup from "yup"; */
import ThankYouComponent from "./components/thankYou/ThankYouComponent";
import cardFormValidationSchema from "./components/cardForm/cardFormValidationSchema";

function App() {
  const [showCardForm, setShowCardForm] = useState(true);

  const methods = useForm({ resolver: yupResolver(cardFormValidationSchema) });
  const {
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = methods;

  const [submittedCardData, setSubmittedCardData] = useState({});

  const onSubmit = (data) => {
    setSubmittedCardData(data);
    setShowCardForm(false);
  };

  const handleDone = () => {
    reset();
    setSubmittedCardData({});
    setShowCardForm(true);
  };

  const formCardData = watch();

  return (
    <>
      <div>
        <FormProvider {...methods}>
          <div className={classes.inner}>
            <CardDisplayComponent
              formCardData={{ ...formCardData, ...submittedCardData }}
            />
            <div className={classes.formBlock}>
              {showCardForm ? (
                <CardFormComponent
                  onSubmit={handleSubmit(onSubmit)}
                  errors={errors}
                  isValid={isValid}
                />
              ) : (
                <ThankYouComponent onDone={handleDone} />
              )}
            </div>
          </div>
        </FormProvider>
      </div>
    </>
  );
}

export default App;
