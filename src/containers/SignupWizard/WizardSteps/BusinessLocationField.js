import React from "react";

import CustomInput from 'components/MaterialDashboardPro/CustomInput';
import ExploreIcon from '@material-ui/icons/Explore';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { autocomplete } from 'helpers/geocode';
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

  updateSuggestions = async (value) => {
    let suggestions = await autocomplete(value);

    this.setState({
      suggestions: suggestions
    });
  }

  render() {
    return (
      <div>
        <CustomInput
          labelText='Where is your business located?'
          id='location'
          formControlProps={{ fullWidth: true }}
          inputProps={{ onChange: this.handleInputChange, value: this.props.value, onKeyDown: this.handleInputKeyDown }}
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
}
