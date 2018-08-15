import React from "react";

import CustomInput from 'components/MaterialDashboardPro/CustomInput';
import ExploreIcon from '@material-ui/icons/Explore';
import { InputAdornment, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { geocode, reverseGeocode, autocomplete } from 'helpers/geocode';
import { debounce } from 'helpers/debounce';

export default class BusinessLocationField extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.updateSuggestions = debounce(this.updateSuggestions, 800); // TODO: this should be done with a decorator instead.

    this.state = {
      suggestions: []
    };
  }

  handleInputChange = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }

    this.updateSuggestions(e.target.value);
  }

  handleInputKeyDown = (e) => {
    if (e.which === 13 && this.state.suggestions.length > 0) {
      if (this.props.onChange) {
        this.props.onChange(this.state.suggestions[0]);
      }

      this.setState({
        suggestions: []
      });
    }
  }

  handleSuggestionClick = (value) => {
    this.setState({
      suggestions: []
    });

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  updateSuggestions = (value) => {
    (async () => {
      let suggestions = await autocomplete(value);

      this.setState({
        suggestions: suggestions
      });
    })();
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
    const { value } = this.props;

    return (
      <div>
        <CustomInput
          labelText='Where is your business located?'
          id='location'
          formControlProps={{ fullWidth: true }}
          inputProps={{ onChange: this.handleInputChange, value: value, endAdornment: this.renderGeolocateButton(), onKeyDown: this.handleInputKeyDown }}
        />
        {this.renderSuggestions()}
      </div>
    )
  }

  renderSuggestions() {
    if (this.state.suggestions.length > 0) {
      return (
        <div>
          <List>
            {this.state.suggestions.map((suggestion, i) => this.renderSuggestionItem(suggestion, i))}
          </List>
        </div>
      )
    }
  }

  renderSuggestionItem(suggestion, i) {
    return (
      <ListItem key={i} button onClick={() => this.handleSuggestionClick(suggestion)}>
        <ListItemIcon>
          <ExploreIcon />
        </ListItemIcon>
        <ListItemText primary={suggestion} secondary={i === 0 ? "Best match, press ENTER to accept" : undefined} />
      </ListItem>
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
