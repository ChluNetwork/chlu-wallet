import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

// components
import Card from "@material-ui/core/Card";
// custom components
import Button from 'components/MaterialDashboardPro/Button'
// styles
import { withStyles } from '@material-ui/core'
import wizardStyle from 'styles/material-dashboard-pro-react/components/wizardStyle.jsx'

class Wizard extends React.Component {
  constructor(props) {
    super(props);
    this.wizard = React.createRef()
    var width;
    if (this.props.steps.length === 1) {
      width = "100%";
    } else {
      if (window.innerWidth < 600) {
        if (this.props.steps.length !== 3) {
          width = "50%";
        } else {
          width = 100 / 3 + "%";
        }
      } else {
        if (this.props.steps.length === 2) {
          width = "50%";
        } else {
          width = 100 / 3 + "%";
        }
      }
    }
    this.state = {
      currentStep: this.props.currentStep || 0,
      color: this.props.color,
      nextButton: this.props.steps.length > 1 ? true : false,
      previousButton: false,
      finishButton: this.props.steps.length === 1 ? true : false,
      width: width,
      movingTabStyle: {
        transition: "transform 0s"
      }
    };
    this.navigationStepChange = this.navigationStepChange.bind(this);
    this.refreshAnimation = this.refreshAnimation.bind(this);
    this.previousButtonClick = this.previousButtonClick.bind(this);
    this.previousButtonClick = this.previousButtonClick.bind(this);
    this.finishButtonClick = this.finishButtonClick.bind(this);
  }
  componentDidMount() {
    this.refreshAnimation(this.state.currentStep);
    window.addEventListener("resize", this.updateWidth.bind(this));
  }
  componentWillUnmount() {
    // TODO: investigate why this does not work
    window.removeEventListener("resize", this.updateWidth.bind(this), true);
  }
  updateWidth() {
    if (this.wizard.current) this.refreshAnimation(this.state.currentStep);
  }
  navigationStepChange(key) {
    if (this.props.steps) {
      var validationState = true;
      if (key > this.state.currentStep) {
        for (var i = this.state.currentStep; i < key; i++) {
          if (this.props.validate && !this.props.validate(i)) {
            validationState = false;
            break;
          }
        }
      }
      if (validationState) {
        if (typeof this.props.onChangeStep === 'function') this.props.onChangeStep(this.state.currentStep, key)
        this.setState({
          currentStep: key,
          nextButton: this.props.steps.length > key + 1 ? true : false,
          previousButton: key > 0 ? true : false,
          finishButton: this.props.steps.length === key + 1 ? true : false
        });
        this.refreshAnimation(key);
      }
    }
  }
  nextButtonClick() {
    if (!this.props.validate || this.props.validate(this.state.currentStep)) {
      var key = this.state.currentStep + 1;
      if (typeof this.props.onChangeStep === 'function') this.props.onChangeStep(this.state.currentStep, key)
      this.setState({
        currentStep: key,
        nextButton: this.props.steps.length > key + 1 ? true : false,
        previousButton: key > 0 ? true : false,
        finishButton: this.props.steps.length === key + 1 ? true : false
      });
      this.refreshAnimation(key);
    }
  }
  previousButtonClick() {
    var key = this.state.currentStep - 1;
    if (key >= 0) {
      if (typeof this.props.onChangeStep === 'function') this.props.onChangeStep(this.state.currentStep, key)
      this.setState({
        currentStep: key,
        nextButton: this.props.steps.length > key + 1 ? true : false,
        previousButton: key > 0 ? true : false,
        finishButton: this.props.steps.length === key + 1 ? true : false
      });
      this.refreshAnimation(key);
    }
  }
    finishButtonClick() {
      if (this.props.validate &&
          this.props.validate(this.state.currentStep) &&
          this.props.finishButtonClick !== undefined) {
              this.props.finishButtonClick();
      }
  }
  refreshAnimation(index) {
    var total = this.props.steps.length;
    var li_width = 100 / total;
    var total_steps = this.props.steps.length;
    var move_distance = this.wizard.current.children[0].offsetWidth / total_steps;
    var index_temp = index;
    var vertical_level = 0;

    var mobile_device = window.innerWidth < 600 && total > 3;

    if (mobile_device) {
      move_distance = this.wizard.current.children[0].offsetWidth / 2;
      index_temp = index % 2;
      li_width = 50;
    }

    this.setState({ width: li_width + "%" });

    var step_width = move_distance;
    move_distance = move_distance * index_temp;

    var current = index + 1;

    if (current === 1 || (mobile_device === true && index % 2 === 0)) {
      move_distance -= 8;
    } else if (
      current === total_steps ||
      (mobile_device === true && index % 2 === 1)
    ) {
      move_distance += 8;
    }

    if (mobile_device) {
      vertical_level = parseInt(index / 2, 10);
      vertical_level = vertical_level * 38;
    }
    var movingTabStyle = {
      width: step_width,
      transform:
        "translate3d(" + move_distance + "px, " + vertical_level + "px, 0)",
      transition: "all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)"
    };
    this.setState({ movingTabStyle: movingTabStyle });
  }
  render() {
    const { classes, title, subtitle, color, steps } = this.props;
    return (
      <div className={classes.wizardContainer} ref={this.wizard}>
        <Card className={classes.card}>
          <div className={classes.wizardHeader}>
            <h3 className={classes.title}>{title}</h3>
            <h5 className={classes.subtitle}>{subtitle}</h5>
          </div>
          <div className={classes.wizardNavigation}>
            <ul className={classes.nav}>
              {steps.map((prop, key) => {
                return (
                  <li
                    className={classes.steps}
                    key={key}
                    style={{ width: this.state.width }}
                  >
                    <a
                      className={classes.stepsAnchor}
                      onClick={() => this.navigationStepChange(key)}
                    >
                      {prop.stepName}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div
              className={classes.movingTab + " " + classes[color]}
              style={this.state.movingTabStyle}
            >
              {steps[this.state.currentStep].stepName}
            </div>
          </div>
          <div className={classes.content}>
            {steps.map((prop, key) => {
              const stepContentClasses = cx({
                [classes.stepContentActive]: this.state.currentStep === key,
                [classes.stepContent]: this.state.currentStep !== key
              });
              return (
                <div className={stepContentClasses} key={key}>
                  <prop.stepComponent
                    innerRef={node => (this[prop.stepId] = node)}
                    {...this.props.steps[this.state.currentStep].stepProps}
                  />
                </div>
              );
            })}
          </div>
          <div className={classes.footer}>
            <div className={classes.left}>
              {this.state.previousButton ? (
                <Button
                  customClass={this.props.previousButtonClasses}
                  onClick={() => this.previousButtonClick()}
                >
                  {this.props.previousButtonText}
                </Button>
              ) : null}
            </div>
            <div className={classes.right}>
              {this.state.nextButton ? (
                <Button
                  color='rose'
                  customClass={this.props.nextButtonClasses}
                  onClick={() => this.nextButtonClick()}
                >
                  {this.props.nextButtonText}
                </Button>
              ) : null}
              {this.state.finishButton ? (
                <Button
                  color='rose'
                  customClass={this.finishButtonClasses}
                  onClick={() => this.finishButtonClick()}
                >
                  {this.props.finishButtonText}
                </Button>
              ) : null}
            </div>
            <div className={classes.clearfix} />
          </div>
        </Card>
      </div>
    );
  }
}

Wizard.defaultProps = {
  color: "rose",
  title: "Here should go your title",
  subtitle: "And this would be your subtitle",
  previousButtonText: "Previous",
  previousButtonClasses: "",
  nextButtonClasses: "",
  nextButtonText: "Next",
  finishButtonClasses: "",
  finishButtonText: "Finish"
};

Wizard.propTypes = {
  classes: PropTypes.object.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      stepName: PropTypes.string.isRequired,
      stepComponent: PropTypes.func.isRequired,
      stepId: PropTypes.string.isRequired
    })
  ).isRequired,
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose"
  ]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  previousButtonClasses: PropTypes.string,
  previousButtonText: PropTypes.string,
  nextButtonClasses: PropTypes.string,
  nextButtonText: PropTypes.string,
  finishButtonClasses: PropTypes.string,
  finishButtonText: PropTypes.string,
  finishButtonClick: PropTypes.func,
  validate: PropTypes.func
};

export default withStyles(wizardStyle)(Wizard);
