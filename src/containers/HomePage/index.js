import React from 'react';
import PropTypes from 'prop-types';
// components
import {
    withStyles,
    Grid
} from '@material-ui/core';
// icons
import {
    MonetizationOn,
    ThumbsUpDown,
    Lock,
    CallMerge,
    Web,
    Payment
} from '@material-ui/icons';
// custom components
import RegularCard from 'components/MaterialDashboardPro/RegularCard';
import InfoArea from 'components/MaterialDashboardPro/InfoArea';
import Timeline from 'components/MaterialDashboardPro/Timeline';
import Wizard from 'components/MaterialDashboardPro/Wizard';
// sub views
import Step1 from './WizardSteps/Step1';
import Step2 from './WizardSteps/Step2';
import Step3 from './WizardSteps/Step3';
// content
import { stories } from 'fixtures/stories';
// style
import "styles/material-dashboard-pro-react.css?v=1.1.1";
import homePageStyle from 'styles/material-dashboard-pro-react/views/homePageStyle.jsx'

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: []
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }

  testSubmit(event) {
    console.log('submitting register form');
  }

render() {
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <div className={classes.container}>
          <Grid container justify='center'>
            <Grid item xs={12} sm={12} md={6}>
              <h2 className={classes.title}>Manage Your Reputation</h2>
              <h5 className={classes.description}>
                Chlu is a Cryptocurrency and Decentralized Reputation Wallet.
              </h5>
            </Grid>
          </Grid>
          <Grid container justify='center'>
            <Grid item xs={12} sm={12} md={12}>
              <RegularCard
                cardTitle=''
                titleAlign='center'
                customCardTitleClasses={classes.cardTitle}
                customCardClasses={classes.cardClasses}
                content={
                  <div>
                    <Grid container justify='center'>
                      <Grid item xs={12} sm={12} md={5}>
                        <div className={classes.center}>
                          <h3>For Online Review Writers</h3>
                        </div>
                        <InfoArea
                          title='Pay'
                          description='Use Your Chlu Wallet to Pay With Crypto.'
                          icon={Payment}
                          iconColor='rose'
                        />
                        <InfoArea
                          title='Review'
                          description='Use Your Chlu Wallet to Write Verified Reviews for Online Products & Services.'
                          icon={ThumbsUpDown}
                          iconColor='primary'
                        />
                        <InfoArea
                          title='Earn Chlu'
                          description='Earn Redeemable Chlu Tokens for Writing Verified Reviews.'
                          icon={MonetizationOn}
                          iconColor='info'
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={5}>
                        <div className={classes.center}>
                          <h3>For Online Review Recipients</h3>
                        </div>
                        <InfoArea
                          title='Own'
                          description='Take ownership of all your ratings and reviews.'
                          icon={Lock}
                          iconColor='rose'
                        />
                        <InfoArea
                          title='Merge'
                          description='Merge your ratings and reviews from multiple websites.'
                          icon={CallMerge}
                          iconColor='primary'
                        />
                        <InfoArea
                          title='Port'
                          description='Take your merged ratings and reviews to any website.'
                          icon={Web}
                          iconColor='info'
                        />
                      </Grid>
                    </Grid>
                    <Grid container justify='center'>
                      <Grid item xs={12} sm={12}>
                        <Wizard
                          validate
                          steps={[
                            { stepName: '1: Create Your Wallet', stepComponent: Step1, stepId: 'get started' },
                            { stepName: '2: Save Your D.I.D.', stepComponent: Step2, stepId: 'about' },
                            { stepName: '3: Claim Your Reputation', stepComponent: Step3, stepId: 'reviews' },
                          ]}
                          title="Let's Get Started"
                          subtitle='Follow The Three Easy Steps Below To Begin'
                        />
                      </Grid>
                    </Grid>
                  </div>
                }
              />
            </Grid>
          </Grid>
          <Grid container justify='center'>
            <Grid item xs={12} sm={12} md={12}>
              <h2 className={classes.learnMore}>Learn More - The Problem With Ratings & Reviews Today</h2>
            </Grid>
            <Grid item xs={12}>
              <RegularCard plainCard content={<Timeline stories={stories} />} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(homePageStyle)(HomePage);

