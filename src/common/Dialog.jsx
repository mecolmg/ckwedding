import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import MaterialButton from "@material-ui/core/Button";
import MaterialDialog from "@material-ui/core/Dialog";
import MaterialDialogActions from "@material-ui/core/DialogActions";
import MaterialDialogContent from "@material-ui/core/DialogContent";
import MaterialDialogContentText from "@material-ui/core/DialogContentText";
import MaterialDialogTitle from "@material-ui/core/DialogTitle";

function Dialog({ open, setOpen, title, children }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <MaterialDialog
      open={open}
      maxWidth="md"
      fullScreen={fullScreen}
      onClose={() => setOpen(false)}
    >
      <MaterialDialogTitle>{title}</MaterialDialogTitle>
      <MaterialDialogContent>
        <MaterialDialogContentText>{children}</MaterialDialogContentText>
      </MaterialDialogContent>
      <MaterialDialogActions>
        <MaterialButton
          onClick={() => setOpen(false)}
          color="primary"
          autoFocus
        >
          Close
        </MaterialButton>
      </MaterialDialogActions>
    </MaterialDialog>
  );
}

export default Dialog;
