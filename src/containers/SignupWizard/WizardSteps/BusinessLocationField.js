import React from "react";

import CustomInput from 'components/MaterialDashboardPro/CustomInput';
import ExploreIcon from '@material-ui/icons/Explore';
import { InputAdornment, IconButton } from '@material-ui/core'
import { geocode, reverseGeocode } from 'helpers/geocode';
import { debounce } from 'helpers/debounce';

export default class BusinessLocationField extends React.Component {
  constructor(props, context) {
    super(props, context);
    // this.handleChange = debounce(this.handleChange, 400); // TODO: this should be done with a decorator instead.
  }

  handleChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  }

  handleGeolocationClick = () => {
    (async () => {
      let position = await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
      let features = await reverseGeocode(position.coords.longitude, position.coords.latitude);

      if (features) {
        if (this.props.onChange) {
          this.props.onChange(features[0].place_name);
        }
      }
    })();
  }

  render() {
    return (
      <div>
        <CustomInput
          labelText='Where is your business located?'
          id='location'
          formControlProps={{ fullWidth: true }}
          inputProps={{ onChange: this.handleChange, value: this.props.value, endAdornment: this.renderGeolocateButton() }}
        />
      </div>
    )
  }

  renderGeolocateButton() {
    // const { classes } = this.props;

    // if ("geolocation" in navigator) {
    //   return (
    //     <InputAdornment position='end' className={classes.inputAdornment}>
    //       <IconButton className={classes.button} aria-label="Auto-locate" onClick={this.handleGeolocationClick}>
    //         <ExploreIcon className={classes.inputAdornmentIcon} />
    //       </IconButton>
    //     </InputAdornment>
    //   )
    // }
  }
}
