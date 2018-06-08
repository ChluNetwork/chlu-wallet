import React from 'react';
// components
import { Grid, FormLabel } from '@material-ui/core'
// icons
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Person from '@material-ui/icons/Person';
import AccountBox from '@material-ui/icons/AccountBox';
import Web from '@material-ui/icons/Web';
import StarHalf from '@material-ui/icons/StarHalf';
import Business from '@material-ui/icons/Business';
// custom components
import CustomInput from 'components/HomePage/CustomInput';
import RegularCard from 'components/HomePage/RegularCard'
import NavPills from 'components/HomePage/NavPills'
import InfoArea from 'components/HomePage/InfoArea'
// styles
import regularFormsStyle from 'styles/material-dashboard-pro-react/views/regularFormsStyle';
import { withStyles } from '@material-ui/core'

const style = {
  profileText: {
    fontWeight: '300',
    margin: '10px 0 0 0',
    textAlign: 'center'
  },
  itemGrid: {
    backgroundColor: 'rgba(200, 200, 200, .2)'
  },
  card: {
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    margin: '1px 0',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    borderRadius: '6px',
    color: 'rgba(0, 0, 0, 0.87)',
    background: '#fff'
  },
  ...regularFormsStyle
};

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      simpleSelect: "",
      design: false,
      code: false,
      develop: false
    };
  }
  handleSimple = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  isValidated() {
    return true;
  }

  testSubmit(event) {
    event.preventDefault();
    alert('LOAD THE CRAWLER RESULTS');
  }


  render() {
    const { classes } = this.props;
    return (
    <div>
      <Grid container justify='center'>
        <Grid item xs={12} sm={12} md={9} className={classes.itemGrid}>
          <br></br>
          <h4 className={classes.infoText}>Do You Manage An Online Profile That Receives Ratings & Reviews?</h4>
        </Grid>
      </Grid>
      <Grid container justify='center'>
        <Grid item xs={12} sm={12} md={3} className={classes.itemGrid}>
          <InfoArea
            title='Select Profile Type'
            description='Select Your Profile Type That Currently Receives Reviews - Individual, Business or Specific Product'
            icon={AccountBox}
            iconColor='rose'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} className={classes.itemGrid}>
          <InfoArea
            title='Profile Websites'
            description='Enter Your Email & Password On the Sites Where That Profile Exists'
            icon={Web}
            iconColor='primary'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} className={classes.itemGrid}>
          <InfoArea
            title='Get Portable Reputation'
            description='We Merge, Normalize & Decentrally Store Your Ratings & Reviews So You Can Take them to Any Website'
            icon={StarHalf}
            iconColor='info'
          />
        </Grid>
      </Grid>
      <Grid container>
        <br></br>
        <NavPills
          color='info'
          alignCenter
          tabs={[
            {
              tabButton: 'Individuals',
              tabIcon: Person,
              tabContent: (
                <RegularCard
                  cardTitle="To begin, simply enter your email & password for any of the sites below on which you have an active profile.
                  We extract, merge and decentrally store your reputation in a portable format so you own and control it."
                  content={
                    <span>
                    <form onSubmit={this.testSubmit}>
                      <Grid container justify='center'>
                        <Grid item xs={12} sm={12} md={2}>
                          <FormLabel className={classes.labelHorizontal}>
                            Linkedin Email
                          </FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={12} md={10}>
                          <Grid container justify='center'>
                            <Grid item xs={12} sm={12} md={4}>
                              <CustomInput
                                id='md3'
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  placeholder: ""
                                }}
                                helpText='We never store your LinkedIn email'
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={2}>
                              <FormLabel className={classes.labelHorizontal}>
                                Linkedin Password
                              </FormLabel>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                              <CustomInput
                                id='md5'
                                ref='password'
                                type='password'
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  placeholder: ""
                                }}
                                helpText='We never store your LinkedIn password'
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container justify='center'>
                        <Grid item xs={12} sm={12} md={2}>
                          <FormLabel className={classes.labelHorizontal}>
                            UpWork Email
                          </FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={12} md={10}>
                          <Grid container justify='center'>
                            <Grid item xs={12} sm={12} md={4}>
                              <CustomInput
                                id='md3'
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  placeholder: ""
                                }}
                                helpText='We never store your UpWork email'
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={2}>
                              <FormLabel className={classes.labelHorizontal}>
                                UpWork Password
                              </FormLabel>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                              <CustomInput
                                id='md5'
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  placeholder: ""
                                }}
                                helpText='We never store your UpWork password'
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container justify='center'>
                        <Grid item xs={12} sm={12} md={2}>
                          <FormLabel className={classes.labelHorizontal}>
                            Fiverr Email
                          </FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={12} md={10}>
                          <Grid container justify='center'>
                            <Grid item xs={12} sm={12} md={4}>
                              <CustomInput
                                id='md3'
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  placeholder: ""
                                }}
                                helpText='We never store your Fiverr email'
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={2}>
                              <FormLabel className={classes.labelHorizontal}>
                                Fiverr Password
                              </FormLabel>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                              <CustomInput
                                id='md5'
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  placeholder: ""
                                }}
                                helpText='We never store your Fiverr password'
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container justify='center'>
                        <Grid item xs={12} sm={12} md={2}>
                          <FormLabel className={classes.labelHorizontal}>
                            Flexhire Email
                          </FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={12} md={10}>
                          <Grid container justify='center'>
                            <Grid item xs={12} sm={12} md={4}>
                              <CustomInput
                                id='md3'
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  placeholder: ""
                                }}
                                helpText='We never store your Flexhire email'
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={2}>
                              <FormLabel className={classes.labelHorizontal}>
                                Flexhire Password
                              </FormLabel>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                              <CustomInput
                                id='md5'
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  placeholder: ""
                                }}
                                helpText='We never store your Flexhire password'
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      </form>
                    </span>
                  }
                />
              )
            },
            {
              tabButton: 'Businesses',
              tabIcon: Business,
              tabContent: (
                <RegularCard
                  cardTitle="To begin, simply enter your email & password for any of the sites below on which you have an active profile.
                  We extract, merge and decentrally store your reputation in a portable format so you own and control it."
                  content={
                    <span>
                    <Grid container>
                      <Grid item xs={12} sm={2}>
                        <FormLabel className={classes.labelHorizontal}>
                          Yelp Email
                        </FormLabel>
                      </Grid>
                      <Grid item xs={12} sm={10}>
                        <Grid container>
                          <Grid item xs={12} sm={12} md={4}>
                            <CustomInput
                              id='md3'
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                placeholder: ""
                              }}
                              helpText='We never store your Yelp email'
                            />
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            <FormLabel className={classes.labelHorizontal}>
                              Yelp Password
                            </FormLabel>
                          </Grid>
                          <Grid item xs={12} sm={12} md={4}>
                            <CustomInput
                              id='md5'
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                placeholder: ""
                              }}
                              helpText='We never store your Yelp password'
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} sm={2}>
                        <FormLabel className={classes.labelHorizontal}>
                          TripAdvisor Email
                        </FormLabel>
                      </Grid>
                      <Grid item xs={12} sm={10}>
                        <Grid container>
                          <Grid item xs={12} sm={12} md={4}>
                            <CustomInput
                              id='md3'
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                placeholder: ""
                              }}
                              helpText='We never store your TripAdvisor email'
                            />
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            <FormLabel className={classes.labelHorizontal}>
                              TripAdvisor Password
                            </FormLabel>
                          </Grid>
                          <Grid item xs={12} sm={12} md={4}>
                            <CustomInput
                              id='md5'
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                placeholder: ""
                              }}
                              helpText='We never store your TripAdvisor password'
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    </span>
                  }
                />
              )
            },
            {
              tabButton: 'Product Owners',
              tabIcon: ShoppingCart,
              tabContent: (
              <RegularCard
                cardTitle="To begin, simply enter your email & password for any of the sites below on which you have an active profile.
                We extract, merge and decentrally store your reputation in a portable format so you own and control it."
                content={
                  <span>
                  <Grid container>
                    <Grid item xs={12} sm={2}>
                      <FormLabel className={classes.labelHorizontal}>
                        Amazon Email
                      </FormLabel>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      <Grid container>
                        <Grid item xs={12} sm={12} md={4}>
                          <CustomInput
                            id='md3'
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              placeholder: ""
                            }}
                            helpText='We never store your Amazon email'
                          />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <FormLabel className={classes.labelHorizontal}>
                            Amazon Password
                          </FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                          <CustomInput
                            id='md5'
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              placeholder: ""
                            }}
                            helpText='We never store your Amazon password'
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} sm={2}>
                      <FormLabel className={classes.labelHorizontal}>
                        Taobao Email
                      </FormLabel>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      <Grid container>
                        <Grid item xs={12} sm={12} md={4}>
                          <CustomInput
                            id='md3'
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              placeholder: ""
                            }}
                            helpText='We never store your Taobao email'
                          />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <FormLabel className={classes.labelHorizontal}>
                            TripAdvisor Password
                          </FormLabel>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                          <CustomInput
                            id='md5'
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              placeholder: ""
                            }}
                            helpText='We never store your Taobao password'
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  </span>
                }
              />
              )
            }
          ]}
        />
      </Grid>
      <Grid container justify='flex-end'>
        <Grid item xs={12} sm={12} md={12} className={classes.infoText}>
          <h7>Chlu guarantees that no information submitted from this form is ever stored on our system</h7>
          <br></br>
          <h7>By submitting this form you acknowledge you are entitled to invoke your <a href='https://gdpr-info.eu/recitals/no-63/'>data access rights</a> and
          <a href='https://www.i-scoop.eu/gdprarticle/gdpr-article-20-right-data-portability/"> data portability rights</a> under European <a href="https://www.eugdpr.org/'>GDPR</a> legislation.
          </h7>
        </Grid>
      </Grid>
    </div>

    );
  }
}

export default withStyles(style)(Step3);
