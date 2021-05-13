import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { RespondentPropType, RespondentUpdater } from "./respondents";
import styles from "./ContactStep.module.scss";

export default function ContactStep({ respondents, onRespondentsChange }) {
  const updateRespondents = RespondentUpdater.forAllRespondents(
    respondents,
    onRespondentsChange
  );

  return (
    <Autocomplete
      className={styles.emailInput}
      autoSelect
      multiple
      freeSolo
      disableClearable
      options={[]}
      value={
        new Array(
          ...new Set(
            respondents
              .flatMap((respondent) => respondent.emails.split(","))
              .filter((email) => email !== "")
          )
        )
      }
      ChipProps={{ color: "primary" }}
      renderInput={(params) => (
        <TextField {...params} label="Emails (optional)" variant="outlined" />
      )}
      onChange={(_, emails) => {
        updateRespondents("emails", emails.join(","));
      }}
    />
  );
}

ContactStep.propTypes = {
  respondents: PropTypes.arrayOf(RespondentPropType).isRequired,
  onRespondentsChange: PropTypes.func.isRequired,
};
