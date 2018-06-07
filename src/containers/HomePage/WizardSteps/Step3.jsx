import React from "react";

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import Select from "material-ui/Select";
import MenuItem from "material-ui/Menu/MenuItem";
import InputLabel from "material-ui/Input/InputLabel";
import FormControl from "material-ui/Form/FormControl";
import FormLabel from "material-ui/Form/FormLabel";

// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";

// @material-ui/icons
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import ContentCopy from "@material-ui/icons/ContentCopy";
import Restaurant from "@material-ui/icons/Restaurant";
import Person from "@material-ui/icons/Person";
import Hotel from "@material-ui/icons/Hotel";
import InfoOutline from "@material-ui/icons/InfoOutline";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
import AccountBox from "@material-ui/icons/AccountBox";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Done from "@material-ui/icons/Done";
import LooksOne from "@material-ui/icons/LooksOne";
import LooksTwo from "@material-ui/icons/LooksTwo";
import Looks3 from "@material-ui/icons/Looks3";
import Timeline from "@material-ui/icons/Timeline";
import Code from "@material-ui/icons/Code";
import Group from "@material-ui/icons/Group";
import Web from "@material-ui/icons/Web";
import StarHalf from "@material-ui/icons/StarHalf";
import Business from "@material-ui/icons/Business";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";
import Button from "components/CustomButtons/Button.jsx";
import IconCard from "components/Cards/IconCard.jsx";
import RegularCard from "components/Cards/RegularCard.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  card: {
    display: "inline-block",
    position: "relative",
    width: "100%",
    margin: "1px 0",
    boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
    borderRadius: "6px",
    color: "rgba(0, 0, 0, 0.87)",
    background: "#fff"
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
      <GridContainer justify="center" >
        <ItemGrid xs={12} sm={12} md={9} style={{ backgroundColor: '#ffffcc' }}>
          <br></br>
          <h4 className={classes.infoText}>Do You Manage An Online Profile That Receives Ratings & Reviews?</h4>
        </ItemGrid>
      </GridContainer>
      <GridContainer justify="center">
        <ItemGrid xs={12} sm={12} md={3} style={{ backgroundColor: '#ffffcc' }}>
          <InfoArea
            title="Select Profile Type"
            description="What Profile Type of Yours Gets Reviews Online - Individual, Business or Specific Product"
            icon={AccountBox}
            iconColor="rose"
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={3} style={{ backgroundColor: '#ffffcc' }}>
          <InfoArea
            title="Profile Platforms"
            description="Enter Your Email & Password On the Sites Where That Profile Exists"
            icon={Web}
            iconColor="primary"
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={3} style={{ backgroundColor: '#ffffcc' }}>
          <InfoArea
            title="Get Portable Ratings & Reviews"
            description="We Merge, Normalize & Decentrally Store Your Ratings & Reviews So You Can Take them to Any Website"
            icon={StarHalf}
            iconColor="info"
          />
        </ItemGrid>
      </GridContainer>
      <GridContainer justify="center">
        <br></br>
        <NavPills
          color="info"
          alignCenter
          tabs={[
            {
              tabButton: "Individuals",
              tabIcon: Person,
              tabContent: (
                <RegularCard
                  cardTitle="To begin, simply enter your email & password for any of the sites below on which you have an active profile.
                  We extract, merge and decentrally store your reputation in a portable format so you own and control it."
                  content={
                    <span>
                    <form onSubmit={this.testSubmit}>
                      <GridContainer>
                        <ItemGrid xs={12} sm={2}>
                          <FormLabel className={classes.labelHorizontal}>
                            Linkedin Email
                          </FormLabel>
                        </ItemGrid>
                        <ItemGrid xs={12} sm={10}>
                          <GridContainer>
                            <ItemGrid xs={12} sm={12} md={4}>
                              <CustomInput
                                id="md3"
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  placeholder: ""
                                }}
                                helpText="We never store your LinkedIn email"
                              />
                            </ItemGrid>
                            <ItemGrid xs={12} sm={2}>
                              <FormLabel className={classes.labelHorizontal}>
                                Linkedin Password
                              </FormLabel>
                            </ItemGrid>
                            <ItemGrid xs={12} sm={12} md={4}>
                              <CustomInput
                                id="md5"
                                ref="password"
                                type="password"
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  placeholder: ""
                                }}
                                helpText="We never store your LinkedIn password"
                              />
                            </ItemGrid>
                          </GridContainer>
                        </ItemGrid>
                      </GridContainer>
                      <GridContainer>
                        <ItemGrid xs={12} sm={2}>
                          <FormLabel className={classes.labelHorizontal}>
                            UpWork Email
                          </FormLabel>
                        </ItemGrid>
                        <ItemGrid xs={12} sm={10}>
                          <GridContainer>
                            <ItemGrid xs={12} sm={12} md={4}>
                              <CustomInput
                                id="md3"
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  placeholder: ""
                                }}
                                helpText="We never store your UpWork email"
                              />
                            </ItemGrid>
                            <ItemGrid xs={12} sm={2}>
                              <FormLabel className={classes.labelHorizontal}>
                                UpWork Password
                              </FormLabel>
                            </ItemGrid>
                            <ItemGrid xs={12} sm={12} md={4}>
                              <CustomInput
                                id="md5"
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  placeholder: ""
                                }}
                                helpText="We never store your UpWork password"
                              />
                            </ItemGrid>
                          </GridContainer>
                        </ItemGrid>
                      </GridContainer>
                      <GridContainer>
                        <ItemGrid xs={12} sm={2}>
                          <FormLabel className={classes.labelHorizontal}>
                            Fiverr Email
                          </FormLabel>
                        </ItemGrid>
                        <ItemGrid xs={12} sm={10}>
                          <GridContainer>
                            <ItemGrid xs={12} sm={12} md={4}>
                              <CustomInput
                                id="md3"
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  placeholder: ""
                                }}
                                helpText="We never store your Fiverr email"
                              />
                            </ItemGrid>
                            <ItemGrid xs={12} sm={2}>
                              <FormLabel className={classes.labelHorizontal}>
                                Fiverr Password
                              </FormLabel>
                            </ItemGrid>
                            <ItemGrid xs={12} sm={12} md={4}>
                              <CustomInput
                                id="md5"
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  placeholder: ""
                                }}
                                helpText="We never store your Fiverr password"
                              />
                            </ItemGrid>
                          </GridContainer>
                        </ItemGrid>
                      </GridContainer>
                      <GridContainer>
                        <ItemGrid xs={12} sm={2}>
                          <FormLabel className={classes.labelHorizontal}>
                            Flexhire Email
                          </FormLabel>
                        </ItemGrid>
                        <ItemGrid xs={12} sm={10}>
                          <GridContainer>
                            <ItemGrid xs={12} sm={12} md={4}>
                              <CustomInput
                                id="md3"
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  placeholder: ""
                                }}
                                helpText="We never store your Flexhire email"
                              />
                            </ItemGrid>
                            <ItemGrid xs={12} sm={2}>
                              <FormLabel className={classes.labelHorizontal}>
                                Flexhire Password
                              </FormLabel>
                            </ItemGrid>
                            <ItemGrid xs={12} sm={12} md={4}>
                              <CustomInput
                                id="md5"
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  placeholder: ""
                                }}
                                helpText="We never store your Flexhire password"
                              />
                            </ItemGrid>
                          </GridContainer>
                        </ItemGrid>
                      </GridContainer>
                      </form>
                    </span>
                  }
                />
              )
            },
            {
              tabButton: "Businesses",
              tabIcon: Business,
              tabContent: (
                <RegularCard
                  cardTitle="To begin, simply enter your email & password for any of the sites below on which you have an active profile.
                  We extract, merge and decentrally store your reputation in a portable format so you own and control it."
                  content={
                    <span>
                    <GridContainer>
                      <ItemGrid xs={12} sm={2}>
                        <FormLabel className={classes.labelHorizontal}>
                          Yelp Email
                        </FormLabel>
                      </ItemGrid>
                      <ItemGrid xs={12} sm={10}>
                        <GridContainer>
                          <ItemGrid xs={12} sm={12} md={4}>
                            <CustomInput
                              id="md3"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                placeholder: ""
                              }}
                              helpText="We never store your Yelp email"
                            />
                          </ItemGrid>
                          <ItemGrid xs={12} sm={2}>
                            <FormLabel className={classes.labelHorizontal}>
                              Yelp Password
                            </FormLabel>
                          </ItemGrid>
                          <ItemGrid xs={12} sm={12} md={4}>
                            <CustomInput
                              id="md5"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                placeholder: ""
                              }}
                              helpText="We never store your Yelp password"
                            />
                          </ItemGrid>
                        </GridContainer>
                      </ItemGrid>
                    </GridContainer>
                    <GridContainer>
                      <ItemGrid xs={12} sm={2}>
                        <FormLabel className={classes.labelHorizontal}>
                          TripAdvisor Email
                        </FormLabel>
                      </ItemGrid>
                      <ItemGrid xs={12} sm={10}>
                        <GridContainer>
                          <ItemGrid xs={12} sm={12} md={4}>
                            <CustomInput
                              id="md3"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                placeholder: ""
                              }}
                              helpText="We never store your TripAdvisor email"
                            />
                          </ItemGrid>
                          <ItemGrid xs={12} sm={2}>
                            <FormLabel className={classes.labelHorizontal}>
                              TripAdvisor Password
                            </FormLabel>
                          </ItemGrid>
                          <ItemGrid xs={12} sm={12} md={4}>
                            <CustomInput
                              id="md5"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                placeholder: ""
                              }}
                              helpText="We never store your TripAdvisor password"
                            />
                          </ItemGrid>
                        </GridContainer>
                      </ItemGrid>
                    </GridContainer>
                    </span>
                  }
                />
              )
            },
            {
              tabButton: "Product Owners",
              tabIcon: ShoppingCart,
              tabContent: (
              <RegularCard
                cardTitle="To begin, simply enter your email & password for any of the sites below on which you have an active profile.
                We extract, merge and decentrally store your reputation in a portable format so you own and control it."
                content={
                  <span>
                  <GridContainer>
                    <ItemGrid xs={12} sm={2}>
                      <FormLabel className={classes.labelHorizontal}>
                        Amazon Email
                      </FormLabel>
                    </ItemGrid>
                    <ItemGrid xs={12} sm={10}>
                      <GridContainer>
                        <ItemGrid xs={12} sm={12} md={4}>
                          <CustomInput
                            id="md3"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              placeholder: ""
                            }}
                            helpText="We never store your Amazon email"
                          />
                        </ItemGrid>
                        <ItemGrid xs={12} sm={2}>
                          <FormLabel className={classes.labelHorizontal}>
                            Amazon Password
                          </FormLabel>
                        </ItemGrid>
                        <ItemGrid xs={12} sm={12} md={4}>
                          <CustomInput
                            id="md5"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              placeholder: ""
                            }}
                            helpText="We never store your Amazon password"
                          />
                        </ItemGrid>
                      </GridContainer>
                    </ItemGrid>
                  </GridContainer>
                  <GridContainer>
                    <ItemGrid xs={12} sm={2}>
                      <FormLabel className={classes.labelHorizontal}>
                        Taobao Email
                      </FormLabel>
                    </ItemGrid>
                    <ItemGrid xs={12} sm={10}>
                      <GridContainer>
                        <ItemGrid xs={12} sm={12} md={4}>
                          <CustomInput
                            id="md3"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              placeholder: ""
                            }}
                            helpText="We never store your Taobao email"
                          />
                        </ItemGrid>
                        <ItemGrid xs={12} sm={2}>
                          <FormLabel className={classes.labelHorizontal}>
                            TripAdvisor Password
                          </FormLabel>
                        </ItemGrid>
                        <ItemGrid xs={12} sm={12} md={4}>
                          <CustomInput
                            id="md5"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              placeholder: ""
                            }}
                            helpText="We never store your Taobao password"
                          />
                        </ItemGrid>
                      </GridContainer>
                    </ItemGrid>
                  </GridContainer>
                  </span>
                }
              />
              )
            }
          ]}
        />
      </GridContainer>
      <GridContainer justify="flex-end">
        <ItemGrid xs={12} sm={12} md={12} className={classes.infoText}>
          <h7>Chlu guarantees that no information submitted from this form is ever stored on our system</h7>
          <br></br>
          <h7>By submitting this form you acknowledge you are entitled to invoke your <a href="https://gdpr-info.eu/recitals/no-63/">data access rights</a> and
          <a href="https://www.i-scoop.eu/gdprarticle/gdpr-article-20-right-data-portability/"> data portability rights</a> under European <a href="https://www.eugdpr.org/">GDPR</a> legislation.
          </h7>
        </ItemGrid>
      </GridContainer>
    </div>

    );
  }
}

export default withStyles(style)(Step3);
