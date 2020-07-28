import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {RespondentPropType} from './respondents';

export default function ContactStep({respondents, onRespondentsChange}) {
  return (
    <Autocomplete
      multiple
      freeSolo
      disableClearable
      options={[]}
      ChipProps={{color: 'primary'}}
      renderInput={(params) => (
        <TextField {...params} label="Emails" variant="outlined" />
      )}
    />
  );
}

ContactStep.propTypes = {
  respondents: PropTypes.arrayOf(RespondentPropType).isRequired,
  onRespondentsChange: PropTypes.func.isRequired,
};
