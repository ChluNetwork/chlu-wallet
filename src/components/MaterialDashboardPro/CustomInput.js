import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
// components
import {
  withStyles,
  FormControl,
  FormHelperText,
  Input,
  InputLabel
} from '@material-ui/core'
// icons
import { Clear, Check } from "@material-ui/icons";
// styles
import customInputStyle from "styles/material-dashboard-pro-react/components/customInputStyle";

function CustomInput({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success,
    helpText,
    rtlActive
  } = props;

  var labelClasses = cx({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });

  var formControlClasses = classes.formControl;
  if (formControlProps !== undefined) {
    formControlClasses += " " + formControlProps.className;
  }
  var underlineClasses = cx({
    [classes.underline]: true,
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
  });
  if (inputProps !== undefined) {
    formControlClasses =
      formControlClasses +
      " " +
      cx({
        [classes.inputWithAdornment]:
          (inputProps.startAdornment !== undefined ||
            inputProps.endAdornment !== undefined) &&
          labelText === undefined
      });
  }
  if (inputProps !== undefined) {
    labelClasses =
      labelClasses +
      " " +
      cx({
        [classes.labelWithAdornment]: inputProps.endAdornment !== undefined
      });
  }
  const successClasses =
    classes.feedback +
    " " +
    classes.labelRootSuccess +
    " " +
    cx({
      [classes.feedbackNoLabel]: labelText === undefined,
      [classes.feedbackAdorment]:
        inputProps !== undefined && inputProps.endAdornment !== undefined
    });
  const errorClasses =
    classes.feedback +
    " " +
    classes.labelRootError +
    " " +
    cx({
      [classes.feedbackNoLabel]: labelText === undefined,
      [classes.feedbackAdorment]:
        inputProps !== undefined && inputProps.endAdornment !== undefined
    });
  const input =
    classes.input +
    " " +
    cx({
      [classes.inputRTL]: rtlActive,
      [classes.inputNoLabel]: labelText === undefined
    });
  return (
    <FormControl
      {...formControlProps}
      className={formControlClasses}
      aria-describedby={id + "-text"}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        classes={{
          input: input,
          disabled: classes.disabled,
          underline: underlineClasses
        }}
        id={id}
        {...inputProps}
      />
      {error ? (
        <Clear className={errorClasses} />
      ) : success ? (
        <Check className={successClasses} />
      ) : null}
      {helpText !== undefined ? (
        <FormHelperText id={id + "-text"}>{helpText}</FormHelperText>
      ) : null}
    </FormControl>
  );
}

CustomInput.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  helpText: PropTypes.string,
  rtlActive: PropTypes.bool
};

export default withStyles(customInputStyle)(CustomInput);
