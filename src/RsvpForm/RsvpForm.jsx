import React, { useEffect, useState } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import RespondentsStep from "./RespondentsStep";
import MealStep from "./MealStep";
import ContactStep from "./ContactStep";

const GET_ATTENDEES_URL =
  "https://script.google.com/macros/s/AKfycbxTjLDFGXa9BtKJPKpWaISqkx2nhwHePKQzHE1o/exec";

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
                      isFinalStep
                        ? () => {
                            console.log(respondents);
                          }
                        : onNext
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
      <Button disabled={activeStep === 0} onClick={handleBack}>
        Back
      </Button>
    </React.Fragment>
  );
}
