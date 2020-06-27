import React, {PureComponent} from 'react';
import DataFrame from 'dataframe-js';
import styles from './RSVP.module.scss';
import request from 'request';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// Google Script URLs.
const GET_ATTENDEES_URL = `https://script.google.com/macros/s/AKfycbyky0PZkAOw2WUT5mzhwabPyWk5j_AUUj3cWuIM/exec`;
const POST_ATTENDEES_URL = `https://script.google.com/macros/s/AKfycbx7RkLwAfmzKZPsQpbmUfCooykkDg5MOZVsXk1oNQ/exec`;

// Email constants.
const EMAIL = 'katelyn.and.colm@gmail.com';
const EMAIL_SUBJECT = "Hey I'd like to be at your wedding too!";
const EMAIL_BODY = encodeURIComponent(`Hi Colm and Katie,

I was hoping to be a part of your wedding!
There will be __ members in my party. Their names are:
  - List of party member's full names.

Please let me know if you can make room on your special day!

Thanks,
_____________`);
const EMAIL_HREF = `mailto:${EMAIL}?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`;

class RSVP extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      confirmDialogOpen: false,
      name: '',
      thankYouDialogOpen: false,
      warnDialogOpen: false,
    };
    this.fetchAttendees_();
  }

  fetchAttendees_ = () => {
    request.get(GET_ATTENDEES_URL, (error, response) => {
      const responseData = JSON.parse(response.body);
      const data = new DataFrame(
        responseData.rows,
        responseData.headers
      ).withColumn('fullNameLower', (row) =>
        `${row.get('firstName')} ${row.get('lastName')}`.toLowerCase()
      );
      this.setState({
        initialData: data,
        data,
      });
    });
  };

  postAttendees_ = () => {
    const {data} = this.state;
    this.getDiff_()
      .toCollection()
      .forEach((row) => {
        const {id, rsvpd, rsvpdPlusOne, needsHotel} = row;
        request.get({
          url: POST_ATTENDEES_URL,
          qs: {
            id,
            rsvpd,
            rsvpdPlusOne,
            needsHotel,
          },
          useQuerystring: true,
        });
      });
    this.setState({initialData: data, thankYouDialogOpen: true});
  };

  getDiff_ = () => {
    const {data, initialData} = this.state;
    return data.filter((row, index) => {
      const {
        id,
        rsvpd: newRsvpd,
        rsvpdPlusOne: newRsvpdPlusOne,
        needsHotel: newNeedsHotel,
      } = row.toDict();
      const {rsvpd, rsvpdPlusOne, needsHotel} = initialData
        .find((row) => row.get('id') === id)
        .toDict();
      return (
        newRsvpd !== rsvpd ||
        newRsvpdPlusOne !== rsvpdPlusOne ||
        newNeedsHotel !== needsHotel
      );
    });
  };

  hasChanges_ = () => {
    if (!this.state.data) return false;
    return this.getDiff_().count() > 0;
  };

  handleInputChange_ = (e) => {
    const {checked, name, type, value} = e.target;
    this.setState({[name]: type === 'checkbox' ? checked : value});
  };

  handleChange_ = (name) => (e) => {
    const {checked, type, value} = e.target;
    this.setState({[name]: type === 'checkbox' ? checked : value});
  };

  handleFamilyMemberChanged_ = (familyMember) => {
    const {data} = this.state;
    const headers = data.listColumns();
    const rows = data
      .toCollection()
      .map((row) => (row.id === familyMember.id ? familyMember : row));
    const newData = new DataFrame(rows, headers);
    this.setState({data: newData});
  };

  handleSubmit_ = () => {
    const changedFamilyIds = new Set();
    this.getDiff_()
      .toCollection()
      .forEach((change) => changedFamilyIds.add(change.familyId));
    if (changedFamilyIds.size > 1) {
      this.openWarnDialog();
    } else {
      this.openConfirmDialog();
    }
  };

  openWarnDialog = () => {
    this.setState({warnDialogOpen: true});
  };

  closeWarnDialog = () => {
    this.setState({warnDialogOpen: false});
  };

  openConfirmDialog = () => {
    this.setState({confirmDialogOpen: true});
  };

  closeConfirmDialog = (submit) => {
    this.setState({confirmDialogOpen: false});
    if (submit) {
      this.postAttendees_();
    }
  };

  rowHasName_ = (familyMember) => {
    return familyMember
      .get('fullNameLower')
      .includes(this.state.name.toLowerCase());
  };

  renderFamilies_ = () => {
    if (!this.state.data || this.state.name === '') {
      return this.renderFormInstructions_();
    }

    const matchingFamilyIds = this.state.data
      .where(this.rowHasName_)
      .distinct('familyId')
      .toCollection()
      .map((row) => row.familyId);

    const families = this.state.data
      .filter((row) => matchingFamilyIds.includes(row.get('familyId')))
      .groupBy('familyId', 'familyName')
      .aggregate((family) => family)
      .toCollection()
      .map((family) => (
        <Family
          key={family.familyId}
          family={family.aggregation.toCollection()}
          familyName={family.familyName}
          onFamilyMemberChanged={this.handleFamilyMemberChanged_}
        />
      ));
    return families.length > 0 ? families : this.renderNoResults_();
  };

  renderFormInstructions_() {
    return (
      <div className={styles.formError}>
        <div>Type your name to get started!</div>
      </div>
    );
  }

  renderNoResults_() {
    return (
      <div className={styles.formError}>
        <div>
          No results were found for that name. If you think we missed you, let
          us know at{' '}
          <a href={EMAIL_HREF} target="_blank" rel="noopener noreferrer">
            {EMAIL}
          </a>
          !
        </div>
      </div>
    );
  }

  render() {
    return (
      <div id="rsvpSection" ref={this.props.rsvpRef} className={styles.rsvp}>
        <div className={styles.content}>
          <h1 className={styles.title}>Save-the-Date RSVP</h1>
          <p className={styles.saveTheDateNotice}>
            This is not an official RSVP. We&apos;re using your responses here
            to get an idea of how many guests are planning to attend. We&apos;re
            also using this to estimate the number of hotel rooms needed for
            those guests coming from out of town.
          </p>
          <div className={styles.form}>
            <div className={styles.formHeader}>
              <TextField
                label="Name"
                className={styles.nameInput}
                value={this.state.name}
                onChange={this.handleChange_('name')}
                margin="normal"
                variant="outlined"
              />
            </div>
            <div className={styles.families}>{this.renderFamilies_()}</div>
            <div className={styles.formFooter}>
              <Button
                variant="contained"
                color="primary"
                className={styles.submitButton}
                onClick={this.handleSubmit_}
                disabled={!this.hasChanges_()}
              >
                Submit Responses
                <SendIcon className={styles.submitIcon} />
              </Button>
            </div>
          </div>
          <Dialog
            open={this.state.warnDialogOpen}
            onClose={this.closeWarnDialog}
          >
            <DialogTitle>Please update one family at a time.</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please only update responses for a single family at a time. If
                you are responding for someone from another family, please make
                a separate submission with their response. Thank you!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.closeWarnDialog} color="primary" autoFocus>
                Okay!
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={this.state.confirmDialogOpen}
            onClose={() => this.closeConfirmDialog(false)}
          >
            <DialogTitle>Are you ready to submit?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You&apos;re about to submit your responses. These responses are
                not official RSVP&apos;s, so don&apos;t worry if you change your
                mind later. You can always update your response here and/or
                reach out to us at{' '}
                <a
                  href={`mailto:${EMAIL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {EMAIL}
                </a>
                . {'\n\n'}Thank you for responding!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.closeConfirmDialog(false)}
                color="primary"
              >
                Go Back
              </Button>
              <Button
                onClick={() => this.closeConfirmDialog(true)}
                color="primary"
                autoFocus
              >
                Continue
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={this.state.thankYouDialogOpen}
            onClose={() => this.setState({thankYouDialogOpen: false})}
          >
            <DialogTitle>Responses Submitted</DialogTitle>
            <DialogContent>
              <DialogContentText>Thank You!</DialogContentText>
            </DialogContent>
            <Button
              onClick={() => this.setState({thankYouDialogOpen: false})}
              color="primary"
              autoFocus
            >
              Close
            </Button>
          </Dialog>
        </div>
      </div>
    );
  }
}

class Family extends PureComponent {
  renderFamilyMembers_ = () => {
    const {family, onFamilyMemberChanged} = this.props;
    return family.map((familyMember) => (
      <FamilyMember
        key={familyMember.id}
        familyMember={familyMember}
        onFamilyMemberChanged={onFamilyMemberChanged}
      />
    ));
  };

  render() {
    return (
      <div>
        <div className={styles.familyName}>{this.props.familyName}</div>
        <table className={styles.familyMembers}>
          <tbody>{this.renderFamilyMembers_()}</tbody>
        </table>
      </div>
    );
  }
}

class FamilyMember extends PureComponent {
  constructor(props) {
    super(props);
    const {familyMember} = props;
    this.state = {
      rsvpd: familyMember.rsvpd,
      rsvpdPlusOne: familyMember.rsvpdPlusOne,
      needsHotel: familyMember.needsHotel,
    };
  }

  handleInputChange_ = (e) => {
    this.handleChange_(e.target.name)(e);
  };

  handleChange_ = (name) => (e) => {
    const {checked, type, value} = e.target;
    const {familyMember, onFamilyMemberChanged} = this.props;
    this.setState({[name]: type === 'checkbox' ? checked : value}, (newState) =>
      onFamilyMemberChanged({
        ...familyMember,
        rsvpd: this.state.rsvpd,
        rsvpdPlusOne: this.state.rsvpdPlusOne,
        needsHotel: this.state.needsHotel,
      })
    );
  };

  render() {
    const {familyMember} = this.props;

    const rsvpCheckbox = (
      <td className={styles.checkboxWithLabel}>
        <FormControl className={styles.selector}>
          <InputLabel htmlFor="rsvpd" className={styles.selectorLabel}>
            RSVP
          </InputLabel>
          <Select
            value={this.state.rsvpd}
            onChange={this.handleChange_('rsvpd')}
            inputProps={{
              name: 'rsvpd',
              id: 'rsvpd',
            }}
          >
            <MenuItem value={''}></MenuItem>
            <MenuItem value={'Yes'}>Yes</MenuItem>
            <MenuItem value={'No'}>No</MenuItem>
          </Select>
        </FormControl>
      </td>
    );
    const rsvpPlusOneCheckbox = familyMember.hasPlusOne ? (
      <td className={styles.checkboxWithLabel}>
        <FormControl className={styles.selector}>
          <InputLabel htmlFor="rsvpdPlusOne" className={styles.selectorLabel}>
            RSVP +1
          </InputLabel>
          <Select
            value={this.state.rsvpdPlusOne}
            onChange={this.handleChange_('rsvpdPlusOne')}
            inputProps={{
              name: 'rsvpdPlusOne',
              id: 'rsvpdPlusOne',
            }}
          >
            <MenuItem value={''}></MenuItem>
            <MenuItem value={'Yes'}>Yes</MenuItem>
            <MenuItem value={'No'}>No</MenuItem>
          </Select>
        </FormControl>
      </td>
    ) : (
      <td className={styles.checkboxWithLabel}></td>
    );
    const needsHotelCheckbox = (
      <td className={styles.checkboxWithLabel}>
        <FormControl className={styles.selector}>
          <InputLabel htmlFor="needsHotel" className={styles.selectorLabel}>
            Need Hotel
          </InputLabel>
          <Select
            value={this.state.needsHotel}
            onChange={this.handleChange_('needsHotel')}
            inputProps={{
              name: 'needsHotel',
              id: 'needsHotel',
            }}
          >
            <MenuItem value={''}></MenuItem>
            <MenuItem value={'Yes'}>Yes</MenuItem>
            <MenuItem value={'No'}>No</MenuItem>
          </Select>
        </FormControl>
      </td>
    );

    return (
      <>
        <tr className={styles.familyMember}>
          <td className={styles.familyMemberName}>
            {familyMember.firstName} {familyMember.lastName}
          </td>
          {rsvpCheckbox}
          {needsHotelCheckbox}
          {rsvpPlusOneCheckbox}
        </tr>
        <tr className={styles.familyMemberFieldsMobile}>
          {rsvpCheckbox}
          {rsvpPlusOneCheckbox}
          {needsHotelCheckbox}
        </tr>
      </>
    );
  }
}

export default RSVP;
