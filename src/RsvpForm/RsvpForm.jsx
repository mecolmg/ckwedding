import React, {useEffect, useState} from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import RespondentsStep from './RespondentsStep';

const GET_ATTENDEES_URL =
  'https://script.google.com/macros/s/AKfycbxTjLDFGXa9BtKJPKpWaISqkx2nhwHePKQzHE1o/exec';

export default function RsvpForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [attendees, setAttendees] = useState([]);
  const [respondents, setRespondents] = useState([]);

  const getAttendees = async () => {
    const response = await fetch(GET_ATTENDEES_URL).then((response) =>
      response.json()
    );
    setAttendees(response.rows);
  };

  useEffect(() => {
    getAttendees();
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getSteps = () => [
    {
      label: 'Select guest(s)',
      content: (
        <RespondentsStep
          attendees={attendees}
          respondents={respondents}
          onRespondentsChange={setRespondents}
        />
      ),
      validate: () => respondents.length > 0,
    },
    {
      label: 'Dinner',
      content: <div>TODO</div>,
    },
  ];

  const steps = getSteps();

  return (
    <React.Fragment>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map(({label, content, Content, validate}, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {content}
              <div>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button
                  color="primary"
                  disabled={validate ? !validate() : false}
                  onClick={handleNext}
                  variant="contained"
                >
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      <Button disabled={activeStep === 0} onClick={handleBack}>
        Back
      </Button>
    </React.Fragment>
  );
}