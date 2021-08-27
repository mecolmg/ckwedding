import PropTypes from "prop-types";

class RespondentUpdater {
  static from(respondents, onRespondentsChange) {
    return (i, key, value) =>
      onRespondentsChange(
        respondents.map((respondent, j) =>
          i === j ? { ...respondent, [`${key}`]: value } : { ...respondent }
        )
      );
  }

  static forAllRespondents(respondents, onRespondentsChange) {
    return (key, value) =>
      onRespondentsChange(
        respondents.map((respondent) => ({ ...respondent, [`${key}`]: value }))
      );
  }
}

const RespondentPropType = PropTypes.shape({
  id: PropTypes.number,
  familyName: PropTypes.string,
  fullName: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  hasPlusOne: PropTypes.bool,
  attending: PropTypes.bool,
  mealChoice: PropTypes.string,
  emails: PropTypes.string,
  plusOneAttending: PropTypes.bool,
  plusOneTitle: PropTypes.string,
  plusOneName: PropTypes.string,
  plusOneMealChoice: PropTypes.string,
});

export { RespondentUpdater, RespondentPropType };
