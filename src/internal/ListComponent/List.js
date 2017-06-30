/**
 * @author Tiffany Tubbs
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../App.css';
import Checkbox from 'material-ui/Checkbox';
import Chip from 'material-ui/Chip';

class ListItem extends Component {
  constructor(props) {
    super(props);

    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);

    ListItem.propTypes = {
      onChange: PropTypes.func.isRequired,
      item: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        isChecked: PropTypes.bool,
      })),
    }
  }

  handleCheckboxClick() {
    this.props.onChange(this.props.item.id);
  }

  render() {
    return (
      <Checkbox label={this.props.item.name}
                checked={this.props.item.isChecked}
                onCheck={this.handleCheckboxClick}/>
    )
  }
}


class List extends Component {
  constructor(props) {
    super(props);

    List.propTypes = {
      onCheckboxClicked: PropTypes.func.isRequired,
      data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        isChecked: PropTypes.bool,
      })).isRequired,
    }
  }

  render() {
    const numberOfItemsChecked = this.props.data.filter(item => item.isChecked).length;

    return (
      <div>
        <div className="list-header">
          <h2 className="list-title">{this.props.title}</h2>
          <Chip className="items-checked">{numberOfItemsChecked}/{this.props.data.length} Items Checked</Chip>
        </div>
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
