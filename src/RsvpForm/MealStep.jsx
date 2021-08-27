import React, { useState } from "react";
import PropTypes from "prop-types";
import FormInput from "./FormInput";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import styles from "./MealStep.module.scss";
import { RespondentPropType, RespondentUpdater } from "./respondents";
import { Collapse, TextField } from "@material-ui/core";

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
      dietaryRestrictions,
      plusOneAttending,
      plusOneName,
      plusOneMealChoice,
      plusOneDietaryRestrictions,
    },
    index
  ) => {
    const mealRespondents = [];
    if (attending) {
      mealRespondents.push({
        fullName,
        mealChoice,
        onChange: (value) => updateRespondent(index, "mealChoice", value),
        dietaryRestrictions,
        onDietaryRestrictionsChange: (value) =>
          updateRespondent(index, "dietaryRestrictions", value),
      });
      if (plusOneAttending) {
        mealRespondents.push({
          fullName: plusOneName,
          mealChoice: plusOneMealChoice,
          onChange: (value) =>
            updateRespondent(index, "plusOneMealChoice", value),
          dietaryRestrictions: plusOneDietaryRestrictions,
          onDietaryRestrictionsChange: (value) =>
            updateRespondent(index, "plusOneDietaryRestrictions", value),
        });
      }
    }
    return mealRespondents;
  };

  return (
    <>
      {respondents
        .flatMap(getMealRespondents)
        .map(
          (
            {
              fullName,
              mealChoice,
              onChange,
              dietaryRestrictions,
              onDietaryRestrictionsChange,
            },
            index
          ) => (
            <MealChoiceForm
              key={index}
              fullName={fullName}
              mealChoice={mealChoice}
              onChange={onChange}
              dietaryRestrictions={dietaryRestrictions}
              onDietaryRestrictionsChange={onDietaryRestrictionsChange}
            />
          )
        )}
    </>
  );
}

MealStep.propTypes = {
  respondents: PropTypes.arrayOf(RespondentPropType).isRequired,
  onRespondentsChange: PropTypes.func.isRequired,
};

function MealChoiceForm({
  fullName,
  mealChoice,
  onChange,
  dietaryRestrictions,
  onDietaryRestrictionsChange,
}) {
  const [hasDietary, setHasDietary] = useState(
    dietaryRestrictions != null && dietaryRestrictions != ""
  );
  return (
    <>
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
      <FormInput className={styles.mealChoiceForm}>
        <FormLabel>Does {fullName} have any dietary restrictions?</FormLabel>
        <RadioGroup
          row
          value={hasDietary}
          onChange={(event, value) => {
            setHasDietary(value === "true");
          }}
        >
          <FormControlLabel value={true} control={<Radio />} label="Yes" />
          <FormControlLabel value={false} control={<Radio />} label="No" />
        </RadioGroup>
        <Collapse in={hasDietary}>
          <TextField
            value={dietaryRestrictions}
            onChange={(event) => {
              onDietaryRestrictionsChange(event.target.value);
            }}
            label={`Dietary restrictions`}
          ></TextField>
        </Collapse>
      </FormInput>
    </>
  );
}

MealChoiceForm.propTypes = {
  fullName: PropTypes.string.isRequired,
  mealChoice: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  dietaryRestrictions: PropTypes.string,
  onDietaryRestrictionsChange: PropTypes.func.isRequired,
};
