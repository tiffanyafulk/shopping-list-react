/**
 * @author Tiffany Tubbs
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const dialogContentStyle = {
  width: '20%',
};

class NewListDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      newListNameFieldValue: '',
      isSubmitButtonDisabled: true,
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleNewListTextFieldChange = this.handleNewListTextFieldChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    NewListDialog.propTypes = {
      onFormSubmission: PropTypes.func.isRequired,
    };
  }

  handleOpen = () => {
    this.setState({
      open: true,
      newListNameFieldValue: '',
      isSubmitButtonDisabled: true,
    });
  };

  handleCancel() {
    this.handleClose();
  }

  handleSubmit() {
    this.props.onFormSubmission(this.state.newListNameFieldValue);
    this.handleClose();
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleKeyPress(event) {
    if (event.target.value.length > 0 && event.key === 'Enter') {
      this.handleSubmit();
    }
  }

  handleNewListTextFieldChange(event) {
    const inputText = event.target.value;
    if (inputText.length > 0) {
      this.setState({
        isSubmitButtonDisabled: false,
        newListNameFieldValue: inputText,
      });
    } else {
      this.setState({
        isSubmitButtonDisabled: true,
        newListNameFieldValue: inputText,
      });
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={this.state.isSubmitButtonDisabled}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />,
    ];

    return (
      <div>
        <FlatButton primary={true} label="New List" onTouchTap={this.handleOpen} />
        <Dialog title="Add A New List"
                actions={actions}
                modal={false}
                open={this.state.open}
                contentStyle={dialogContentStyle}
                onRequestClose={this.handleClose}>
          <TextField type="text"
                     value={this.state.newListNameFieldValue}
                     onChange={this.handleNewListTextFieldChange}
                     onKeyPress={this.handleKeyPress}
                     hintText="New List Name"/>
        </Dialog>
      </div>
    );
  }
}

export default NewListDialog;
