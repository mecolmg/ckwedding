class RespondentUpdater {
  static from(respondents, onRespondentsChange) {
    return (i, key, value) =>
      onRespondentsChange(
        respondents.map((respondent, j) =>
          i === j ? {...respondent, [`${key}`]: value} : {...respondent}
        )
      );
  }
}
export {RespondentUpdater};
