/**
 * @author Tiffany Tubbs
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../App.css';
import Checkbox from 'material-ui/Checkbox';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
  }

  handleCheckboxClick() {
    this.props.onChange(this.props.item.id);
  }

  render() {
    return (
      <Checkbox label={this.props.item.name} checked={this.props.item.isChecked} onCheck={this.handleCheckboxClick}/>
    )
  }
}


class List extends Component {
  constructor(props) {
    super(props);

    List.propTypes = {
      onCheckboxClicked: PropTypes.func.isRequired,
    }
  }

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <ul>
          {this.props.data.map((item, i) => {
            return <ListItem key={i} item={item} onChange={this.props.onCheckboxClicked}/>
          })}
        </ul>
      </div>
    );
  }
}

export default List;
