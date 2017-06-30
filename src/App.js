import React, { Component } from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ListComponent from './internal/ListComponent/ListComponent.js';
import NewListDialog from './internal/NewListDialog';

injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      lists: [{
        id: 0,
        name: 'Shopping List',
      }],
    };

    this.handleNewListFormSubmission = this.handleNewListFormSubmission.bind(this);
    this.deleteList = this.deleteList.bind(this);
  }

  handleNewListFormSubmission(newListName) {
    this.setState({
      lists: [...this.state.lists,
        {
          id: this.state.lists.length,
          name: newListName,
        }],
    })
  }

  deleteList(listIdToDelete) {
    const updatedState = this.state.lists;
    updatedState.splice(listIdToDelete, 1);
    this.setState({
      lists: updatedState,
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <h1>Tiffany's Lists</h1>
            <NewListDialog onFormSubmission={this.handleNewListFormSubmission}/>
          </div>
          {this.state.lists.map((list) => {
            return <ListComponent key={list.id+'-list-component'}
                                  id={list.id} name={list.name}
                                  onDelete={this.deleteList}/>
          })}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

