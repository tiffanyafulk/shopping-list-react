/**
 * @author Tiffany Tubbs
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../App.css';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider'

import NewListItemForm from './NewListItemForm';
import List from './List';

const dividerStyle = {
  marginTop: 45,
  marginBottom: 10,
};

class ListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          id: 0,
          name: 'Grapes',
          isChecked: false,
        },
        {
          id: 1,
          name: 'Strawberries',
          isChecked: false,
        },
        {
          id: 2,
          name: 'Apples',
          isChecked: false,
        }],
    };
    this.addListItem = this.addListItem.bind(this);
    this.toggleItemCheckbox = this.toggleItemCheckbox.bind(this);
    this.handleDeleteCheckedItems = this.handleDeleteCheckedItems.bind(this);

    ListComponent.propTypes = {
      onDelete: PropTypes.func.isRequired,
      id: PropTypes.number,
      name: PropTypes.string,
    };
  }

  addListItem(item) {
    this.setState({
      list: [...this.state.list,
        {
          id: this.state.list.length,
          name: item,
          isChecked: false,
        }],
    });
  }

  toggleItemCheckbox(itemId) {
    const updatedState = { ...this.state };
    const indexOfItemToUpdate = updatedState.list.findIndex(item => item.id === itemId);
    updatedState.list[indexOfItemToUpdate].isChecked = !updatedState.list[indexOfItemToUpdate].isChecked;
    this.setState({
      ...updatedState
    });
  }

  handleDeleteCheckedItems() {
    const updatedState = { ...this.state };
    const uncheckedItems = updatedState.list.filter(item => !item.isChecked);
    this.setState({
      list: uncheckedItems,
    });
  }

  render() {
    return (
      <Paper zDepth={2} className="list-component">
        <DeleteListDialog onDelete={this.props.onDelete} listId={this.props.id}/>
        <List title={this.props.name}
              data={this.state.list}
              onCheckboxClicked={this.toggleItemCheckbox}/>
        <Divider style={dividerStyle}/>
        <NewListItemForm onFormSubmission={this.addListItem}/>
        <RaisedButton className="delete-checked-items"
                      secondary={true}
                      label="Delete Checked Items"
                      onClick={this.handleDeleteCheckedItems}/>
      </Paper>
    )
  }
}

export default ListComponent;

class DeleteListDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDeleteList = this.handleDeleteList.bind(this);

    DeleteListDialog.propTypes = {
      listId: PropTypes.number,
    };
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleCancel() {
    this.handleClose();
  }

  handleDeleteList() {
    this.props.onDelete(this.props.listId);
    this.handleClose();
  }

  handleClose() {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onTouchTap={this.handleDeleteList}
      />,
    ];

    return (
      <div>
        <IconButton className="delete-list-button" tooltip="Delete List" onTouchTap={this.handleOpen}>
          <FontIcon className="fa fa-times fa-4x"/>
        </IconButton>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Are you sure you want to delete this list?
        </Dialog>
      </div>
    );
  }
}
