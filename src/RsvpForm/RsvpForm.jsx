import React, { useEffect, useState } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import RespondentsStep from "./RespondentsStep";
import MealStep from "./MealStep";
import ContactStep from "./ContactStep";

const GET_ATTENDEES_URL =
  "https://script.google.com/macros/s/AKfycbxTjLDFGXa9BtKJPKpWaISqkx2nhwHePKQzHE1o/exec";
const POST_ATTENDEES_URL =
  "https://script.google.com/macros/s/AKfycbxPuN8-2jQXmQ9rgANprko2vXjHjoVj6cdZ10oGoJkR1YMfS9hSaT0wYUR3BCQDOp4G/exec";

export default function RsvpForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [attendees, setAttendees] = useState([]);
  const [respondents, setRespondents] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [thankYouDialogOpen, setThankYouDialogOpen] = useState(false);

  const getAttendees = async () => {
    const response = await fetch(GET_ATTENDEES_URL).then((response) =>
      response.json()
    );
    setAttendees(response.rows);
  };

  const postAttendees = async () => {
    handleNext();
    try {
      await fetch(POST_ATTENDEES_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(respondents),
      });
      setThankYouDialogOpen(true);
      await getAttendees();
      setRespondents([]);
      setActiveStep(0);
    } catch (e) {
      handleBack();
    }
  };

  useEffect(() => {
    getAttendees();
  }, []);

  const handleRespondentsChange = (newRespondents) => {
    setRespondents(
      newRespondents.map(({ ...respondent }) => {
        if (!respondent.attending) {
          respondent.mealChoice = "";
          respondent.plusOneAttending = false;
        }
        if (!respondent.plusOneAttending) {
          respondent.plusOneTitle = "";
          respondent.plusOneName = "";
          respondent.plusOneMealChoice = "";
        }
        return respondent;
      })
    );
  };

  const handleNext = (increment = 1) => {
    setActiveStep((prevActiveStep) => {
      return prevActiveStep + increment;
    });
  };

  const handleBack = (increment = 1) => {
    setActiveStep((prevActiveStep) => prevActiveStep - increment);
  };

  const getSteps = () => [
    {
      label: "Select Guest(s)",
      content: (
        <RespondentsStep
          attendees={attendees}
          respondents={respondents}
          onRespondentsChange={handleRespondentsChange}
        />
      ),
      validate: () =>
        respondents.length > 0 &&
        respondents.filter(
          ({ plusOneAttending, plusOneName }) =>
            !(plusOneAttending ^ !plusOneName)
        ).length === 0,
      onNext: () => {
        handleNext(
          respondents.filter(({ attending }) => attending).length > 0 ? 1 : 2
        );
      },
    },
    {
      label: "Guest Meal(s)",
      content: (
        <MealStep
          respondents={respondents}
          onRespondentsChange={handleRespondentsChange}
        />
      ),
      validate: () =>
        respondents.filter(
          ({ attending, mealChoice, plusOneAttending, plusOneMealChoice }) =>
            !(attending ^ !mealChoice && plusOneAttending ^ !plusOneMealChoice)
        ).length === 0,
      onNext: () => handleNext(),
      onBack: () => handleBack(),
    },
    {
      label: "Contact Info",
      content: (
        <ContactStep
          respondents={respondents}
          onRespondentsChange={handleRespondentsChange}
        />
      ),
      onNext: () => handleNext(),
      onBack: () => {
        handleBack(
          respondents.filter(({ attending }) => attending).length > 0 ? 1 : 2
        );
      },
    },
  ];

  const steps = getSteps();
  const isFinalStep = activeStep === steps.length - 1;

  return (
    <React.Fragment>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map(
          ({ label, content, Content, validate, onBack, onNext }, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                {content}
                <div>
                  {activeStep > 0 && <Button onClick={onBack}>Back</Button>}
                  <Button
                    color="primary"
                    disabled={validate ? !validate() : false}
                    onClick={
                      isFinalStep ? () => setConfirmDialogOpen(true) : onNext
                    }
                    variant="contained"
                  >
                    {isFinalStep ? "Submit" : "Next"}
                  </Button>
                </div>
              </StepContent>
            </Step>
          )
        )}
      </Stepper>
      {activeStep !== 0 && activeStep !== 3 && (
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
      )}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>Are you ready to submit?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You{"'"}re about to submit your responses. These responses are your
            official RSVP{"'"}s. You can come back and change your responses
            anytime before the July 25<sup>th</sup>, 2021 deadline. Reach out to
            us at{" "}
            <a
              href={`mailto:wedding@colmandkatie.com`}
              target="_blank"
              rel="noopener noreferrer"
            >
              wedding@colmandkatie.com
            </a>{" "}
            if you have any questions!
            <br />
            Thank you for responding!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
            Go Back
          </Button>
          <Button
            onClick={() => {
              setConfirmDialogOpen(false);
              postAttendees();
            }}
            color="primary"
            autoFocus
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={thankYouDialogOpen}
        onClose={() => setThankYouDialogOpen(false)}
      >
        <DialogTitle>RSVP Submitted</DialogTitle>
        <DialogContent>
          <DialogContentText>Thank You!</DialogContentText>
        </DialogContent>
        <Button
          onClick={() => setThankYouDialogOpen(false)}
          color="primary"
          autoFocus
        >
          Close
        </Button>
      </Dialog>
    </React.Fragment>
  );
}
