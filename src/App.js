import React, { Component } from 'react';
import './App.css';

import SchedulePage from './pages/SchedulePage';
import MessagesArea from './components/MessagesArea';
import Tiempo from './components/Tiempo';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
    }
  }

  handleUserName(name){
    this.setState({name})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Time-In</h1> 
          <div className="vertical-center2"> <h3>Genish mustache</h3> </div>
          <div className="username vertical-center">
            {this.state.name}
          </div>
        </header>
        <div className='App-Main'>
          <MessagesArea/>
          <SchedulePage getUserName={this.handleUserName.bind(this)}/>
        </div>
        <Tiempo/>
        <div className="footer-container">
          @ Time-In @ Copyright 2018
        </div>
      </div>
    );
  }
}

export default App;
