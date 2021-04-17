import React, {forwardRef, useState} from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Collapse from '@material-ui/core/Collapse';
import CircularProgress from '@material-ui/core/CircularProgress';
import request from 'request';
import styles from './EmailForm.module.scss';

const EMAIL_FORM_URL =
  'https://script.google.com/macros/s/AKfycbxdgsn1TZW0TV1LyiHilAxmZA0jbE6sCo2Due0dqz_2CXKLKWZX/exec';

const EmailForm = (props, ref) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [verifyEmail, setVerifyEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
    request.get(
      `${EMAIL_FORM_URL}?email=${email}`,
      {followAllRedirects: true},
      (error, response) => {
        setSubmitting(false);
        setSubmitted(!error);
      }
    );
  };

  const handleAddAnother = () => {
    setEmail('');
    setVerifyEmail('');
    setSubmitting(false);
    setSubmitted(false);
  };

  return (
    <div className={styles.emailForm} ref={ref} {...props}>
      <h1 className={styles.title}>Stay in the Know</h1>
      <Collapse in={!submitting && !submitted}>
        <p className={styles.pleaseSignUp}>
          Please sign up for email updates so that we can quickly inform you of
          any changes. We{"'"}ll only contact you with updates regarding the
          wedding. You can always write us at{' '}
          <a
            href="mailto:wedding@colmandkatie.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            wedding@colmandkatie.com
          </a>{' '}
          with any questions.
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
            />
            <Collapse in={!!email}>
              <TextField
                label="Verify Email"
                variant="outlined"
                value={verifyEmail}
                onChange={(e) => setVerifyEmail(e.target.value)}
                type="email"
                className={styles.verifyInput}
              />
            </Collapse>
          </div>
          <IconButton
            color="primary"
            type="submit"
            disabled={email === '' || email !== verifyEmail}
            className={styles.submitButton}
          >
            <SvgIcon component={SendIcon} />
          </IconButton>
        </form>
      </Collapse>
      <Collapse in={submitting}>
        <CircularProgress />
      </Collapse>
      <Collapse in={submitted}>
        <p className={styles.thankYou}>
          Thanks for signing up! We'll only contact you with updates regarding
          the wedding. You can always write us at{' '}
          <a
            href="mailto:wedding@colmandkatie.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            wedding@colmandkatie.com
          </a>{' '}
          with any questions.
        </p>
        <Button variant="contained" color="primary" onClick={handleAddAnother}>
          Add another email
        </Button>
      </Collapse>
    </div>
  );
};

export default forwardRef(EmailForm);
