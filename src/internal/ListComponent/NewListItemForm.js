/**
 * @author Tiffany Tubbs
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../App.css';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class NewListItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textFieldValue: '',
      isAddButtonDisabled: true,
    };
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.addNewListItem = this.addNewListItem.bind(this);

    NewListItemForm.propTypes = {
      onFormSubmission: PropTypes.func.isRequired,
    }
  }

  handleTextFieldChange(event) {
    if (event.target.value.length === 0) {
      this.setState({
        isAddButtonDisabled: true,
        textFieldValue: event.target.value,
      })
    } else {
      this.setState({
        isAddButtonDisabled: false,
        textFieldValue: event.target.value,
      })
    }
  }

  handleAddButtonClick() {
    this.addNewListItem();
  }

  handleKeyPress(event) {
    if(event.key === 'Enter') {
      this.addNewListItem();
    }
  }

  addNewListItem() {
    if (this.state.textFieldValue.length !== 0) {
      this.props.onFormSubmission(this.state.textFieldValue);
      this.setState({
        textFieldValue: '',
        isAddButtonDisabled: true,
      });
    }
  }

  render() {
    return (
      <div className="item-form">
        <TextField type="text" value={this.state.textFieldValue}
                   onChange={this.handleTextFieldChange}
                   onKeyPress={this.handleKeyPress}
                   hintText="New List Item"/>
        <RaisedButton label='Add' onClick={this.handleAddButtonClick} disabled={this.state.isAddButtonDisabled} />
      </div>
    )
  }
}

export default NewListItemForm;
