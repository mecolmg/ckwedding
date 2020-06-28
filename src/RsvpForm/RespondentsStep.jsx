import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './RespondentsStep.module.scss';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function RespondentsStep({attendees, respondents, onChange}) {
  return (
    <div>
      <Autocomplete
        autoHighlight
        disableClearable
        disableCloseOnSelect
        getOptionLabel={getAttendeeLabel}
        value={respondents}
        groupBy={(attendee) => attendee.familyName}
        loading={attendees.length === 0}
        loadingText={<LoadingAttendees />}
        multiple
        onChange={(event, respondents) => {
          onChange(respondents);
        }}
        options={attendees.sort(attendeesComparator)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Who are you responding for?"
            variant="outlined"
          />
        )}
        renderOption={(attendee, {selected}) => (
          <React.Fragment>
            <Checkbox
              checked={selected}
              checkedIcon={checkedIcon}
              icon={icon}
              style={{marginRight: 8}}
            />
            {getAttendeeLabel(attendee)}
          </React.Fragment>
        )}
      />
    </div>
  );
}

function LoadingAttendees() {
  return (
    <div className={styles.loadingContainer}>
      <CircularProgress className={styles.spinner} />
      <div>Loading attendees</div>
    </div>
  );
}

function attendeesComparator(a, b) {
  const getId = (o) => `${o.lastName}${o.familyName}${o.firstName}`;
  return -getId(b).localeCompare(getId(a));
}

function getAttendeeLabel(attendee) {
  return `${attendee.firstName} ${attendee.lastName}`;
}

RespondentsStep.propTypes = {
  attendees: PropTypes.array.isRequired,
  respondents: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};
