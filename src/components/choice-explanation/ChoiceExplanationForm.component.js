import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { withFormik, Field } from "formik";
import * as Yup from "yup";

import { putUserValues } from "../../store/actions/user-values.actions";

// import Hero from "../hero/Hero.component";
import hero from "../../images/hero.JPG";
import stones from "../../images/stones.jpeg";
import ConfirmedTopValues from "../confirmed-values/Confirmed-Values.component";

import {
  FormContainer,
  ConfirmExplanationButton,
  Sizer,
  Hero,
  BottomImg
} from "./ChoiceExplanations.styles";
import { SignUpButtonContainer } from "../sign-up-form/SignUpForm.styles";

const ChoiceExplanation = ({
  errors,
  touched,
  isSubmitting,
  isValidating,
  values
}) => {
  const userValues = useSelector(state => state.userValues.userValues);
  // console.log(userValues);

  const [activeIndex, setActiveIndex] = useState(0);
  const [valsToUpdate, setValsToUpdate] = useState(userValues);
  // console.log(`valsToUPdate: `, valsToUpdate);
  const dispatch = useDispatch();

  const history = useHistory();

  const goToNextCard = () => {
    let index = activeIndex;
    let slidesLength = valsToUpdate.length - 1;
    if (index === slidesLength) {
      localStorage.setItem("explanations-confirmed", JSON.stringify(true));
      history.push("/about-projects");
    }
    ++index;
    setActiveIndex(index);
  };
  const handleClick = (vals, description) => {
    console.log(`Vals: `, vals);
    console.log(`values from description form handle submit: `, {
      ...vals,
      user_value_description: description.user_value_description
    });
    dispatch(
      putUserValues({
        ...vals,
        user_value_description: description.user_value_description
      })
    );

    return goToNextCard();
  };
  return (
    <Sizer>
      <Hero img={hero}>
        <ConfirmedTopValues />
      </Hero>
      <BottomImg img={stones}>
        {valsToUpdate &&
          valsToUpdate.map((val, index) => {
            // console.log(`userValues map: `, val);
            return (
              // <div k>
              <FormContainer
                key={val.user_value_id}
                index={index}
                active={activeIndex}
              >
                <label htmlFor="name">You selected: {val.user_value}</label>
                <Field
                  className="input"
                  component="input"
                  type="textarea"
                  name="user_value_description"
                  placeholder="Why?"
                />
                {touched.user_value_description &&
                  errors.user_value_description && (
                    <p className="errors">{errors.user_value_description}</p>
                  )}
                <SignUpButtonContainer>
                  <ConfirmExplanationButton
                    onClick={() => handleClick(val, values)}
                    disabled={isSubmitting}
                  >
                    confirm
                  </ConfirmExplanationButton>
                </SignUpButtonContainer>
              </FormContainer>
              // </div>
            );
          })}
      </BottomImg>
    </Sizer>
  );
};

// const mapPropsToState = state => {
//   return {
//     userValues: state.userValues.userValues
//     // remove: state.values.userValues.remove
//   };
// };

export default withFormik({
  mapPropsToValues({ user_value_description, val, value }) {
    return {
      val: value,
      user_value_description: user_value_description || ""
    };
  },
  validationSchema: Yup.object().shape({
    user_value_description: Yup.string().required("Required")
  }),
  handleSubmit(values, { resetForm }) {
    resetForm();
  }
})(ChoiceExplanation);
