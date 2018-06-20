import React from 'react'
import PropTypes from 'prop-types'
// components
import {
    withStyles,
    Grid
} from '@material-ui/core'
// icons
import {
    MonetizationOn,
    ThumbsUpDown,
    Lock,
    CallMerge,
    Web,
    Payment,
    Done
} from '@material-ui/icons'
// custom components
import RegularCard from 'components/MaterialDashboardPro/RegularCard'
import InfoArea from 'components/MaterialDashboardPro/InfoArea'
import Timeline from 'components/MaterialDashboardPro/Timeline'
import SignupWizard from 'containers/SignupWizard'
// content
import { stories } from 'fixtures/stories'
// style
import "styles/material-dashboard-pro-react.css?v=1.1.1"
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
                        <SignupWizard/>
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
          <Grid item xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle='About Decentralized Identifiers (DIDs)'
              titleAlign='center'
              customCardTitleClasses={classes.cardTitle}
              customCardClasses={classes.cardClasses}
              content={
                <div>
                  <Grid container justify='center'>
                    <Grid item xs={12} sm={12} md={12}>
                      <div className={classes.center}>
                          <h5>
                            <a name="DID"></a> Historically, digital identification of individuals has required centralized identity management systems - your bank, Facebook or Google login etc. Blockchain and decentralized technology enables a new method of identification that does not require central authorities.
                            Decentralized Identifiers or DIDs can be thought of as the missing "Identity Layer" of the internet.
                          </h5>
                          <h5>
                            A <a href="https://w3c-ccg.github.io/did-spec">DID</a> is a cryptographically secure, globally resolvable and open standard that puts an individual’s identity back under their control.
                            You manage your DID with an associated private and public key.
                          </h5>
                          <h5>
                            When you create your Chlu wallet, we generate a new DID for you and store it on a unique permanent link on <a href="https://en.wikipedia.org/wiki/InterPlanetary_File_System">IPFS</a>. You can use this link and your private key to sign-up and log-in to DID supporting services on the internet.
                          </h5>
                          <h5>
                            Decentralized Reputation links the ratings and reviews of an individual, business or product with their associated DID to enable them to manage and port their reputation online.
                          </h5>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              }
              >
            </RegularCard>
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
