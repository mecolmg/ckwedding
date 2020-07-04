import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Collapse from '@material-ui/core/Collapse';
import FormInput from './FormInput';
import styles from './RespondentsStep.module.scss';
import {RespondentPropType, RespondentUpdater} from './respondents';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function RespondentsStep({
  attendees,
  respondents,
  onRespondentsChange,
}) {
  const updateRespondent = RespondentUpdater.from(
    respondents,
    onRespondentsChange
  );

  return (
    <>
      <Autocomplete
        autoHighlight
        disableClearable
        disableCloseOnSelect
        getOptionLabel={getAttendeeLabel}
        getOptionSelected={(a, b) => a.id === b.id}
        value={respondents}
        groupBy={(attendee) => attendee.familyName}
        loading={attendees.length === 0}
        loadingText={<LoadingAttendees />}
        multiple
        onChange={(event, respondents) => {
          onRespondentsChange(respondents);
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
      <Collapse in={respondents.length > 0}>
        {respondents.map((respondent, index) => (
          <RespondentForm
            className={styles.respondentForm}
            respondent={respondent}
            updateRespondent={(key, value) => {
              updateRespondent(index, key, value);
            }}
            key={index}
          />
        ))}
      </Collapse>
    </>
  );
}

RespondentsStep.propTypes = {
  attendees: PropTypes.array.isRequired,
  respondents: PropTypes.arrayOf(RespondentPropType),
  onRespondentsChange: PropTypes.func.isRequired,
};

function RespondentForm({respondent, updateRespondent, ...props}) {
  const {attending, fullName, hasPlusOne} = respondent;

  return (
    <div {...props}>
      <FormInput>
        <FormLabel>Will {fullName} be attending?</FormLabel>
        <RadioGroup
          className={styles.radioRow}
          value={attending}
          onChange={(event, value) => {
            updateRespondent('attending', value === 'true');
          }}
          row
        >
          <FormControlLabel value={true} control={<Radio />} label="Yes" />
          <FormControlLabel value={false} control={<Radio />} label="No" />
        </RadioGroup>
      </FormInput>
      <Collapse in={attending && hasPlusOne}>
        <PlusOneForm
          respondent={respondent}
          updateRespondent={updateRespondent}
        />
      </Collapse>
    </div>
  );
}

RespondentForm.propTypes = {
  respondent: RespondentPropType,
  updateRespondent: PropTypes.func.isRequired,
};

function PlusOneForm({respondent, updateRespondent}) {
  const {fullName, plusOneAttending, plusOneName} = respondent;

  return (
    <>
      <FormInput>
        <FormLabel>Will {fullName} have a plus one?</FormLabel>
        <RadioGroup
          className={styles.plusOneRadios}
          value={plusOneAttending}
          onChange={(event, value) => {
            updateRespondent('plusOneAttending', value === 'true');
          }}
          row
        >
          <FormControlLabel value={true} control={<Radio />} label="Yes" />
          <FormControlLabel value={false} control={<Radio />} label="No" />
        </RadioGroup>
      </FormInput>
      <Collapse in={plusOneAttending}>
        <FormInput>
          <FormLabel>What is {fullName}&apos;s plus one&apos;s name?</FormLabel>
          <FormGroup row>
            <FormInput>
              <TextField
                label="Full name"
                variant="outlined"
                value={plusOneName}
                onChange={(event) => {
                  updateRespondent('plusOneName', event.target.value);
                }}
              />
            </FormInput>
          </FormGroup>
        </FormInput>
      </Collapse>
    </>
  );
}

PlusOneForm.propTypes = {
  respondent: RespondentPropType,
  updateRespondent: PropTypes.func.isRequired,
};

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
