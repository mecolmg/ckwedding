import React from "react";
import PropTypes from "prop-types";
import FormInput from "./FormInput";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import styles from "./MealStep.module.scss";
import { RespondentPropType, RespondentUpdater } from "./respondents";

export default function MealStep({ respondents, onRespondentsChange }) {
  const updateRespondent = RespondentUpdater.from(
    respondents,
    onRespondentsChange
  );

  const getMealRespondents = (
    {
      attending,
      fullName,
      mealChoice,
      plusOneAttending,
      plusOneName,
      plusOneMealChoice,
    },
    index
  ) => {
    const mealRespondents = [];
    if (attending) {
      mealRespondents.push({
        fullName,
        mealChoice,
        onChange: (value) => updateRespondent(index, "mealChoice", value),
      });
      if (plusOneAttending) {
        mealRespondents.push({
          fullName: plusOneName,
          mealChoice: plusOneMealChoice,
          onChange: (value) =>
            updateRespondent(index, "plusOneMealChoice", value),
        });
      }
    }
    return mealRespondents;
  };

  return (
    <>
      {respondents
        .flatMap(getMealRespondents)
        .map(({ fullName, mealChoice, onChange }, index) => (
          <MealChoiceForm
            key={index}
            fullName={fullName}
            mealChoice={mealChoice}
            onChange={onChange}
          />
        ))}
    </>
  );
}

MealStep.propTypes = {
  respondents: PropTypes.arrayOf(RespondentPropType).isRequired,
  onRespondentsChange: PropTypes.func.isRequired,
};

function MealChoiceForm({ fullName, mealChoice, onChange }) {
  return (
    <FormInput className={styles.mealChoiceForm}>
      <FormLabel>What will {fullName} be eating?</FormLabel>
      <RadioGroup
        value={mealChoice}
        onChange={(event, value) => {
          onChange(value);
        }}
      >
        <FormControlLabel
          value="beef"
          control={<Radio />}
          label="Filet of Beef"
        />
        <FormControlLabel
          value="chicken"
          control={<Radio />}
          label="Rosemary Chicken"
        />
        <FormControlLabel
          value="crab cake"
          control={<Radio />}
          label="Chesapeake Crab Cake"
        />
        <FormControlLabel
          value="ravioli"
          control={<Radio />}
          label="Butternut Squash Ravioli (v)"
        />
      </RadioGroup>
    </FormInput>
  );
}

MealChoiceForm.propTypes = {
  fullName: PropTypes.string.isRequired,
  mealChoice: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
