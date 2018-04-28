import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SchedulePage from './pages/SchedulePage';
import MessagesArea from './components/MessagesArea';
import { HomePage } from './pages/HomePage';
import Tiempo from './components/Tiempo';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
    }
  }

  handleUserName = name => {
    this.setState({ name })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to Time-In</h1>
            <div className="vertical-center2"> <h3>Genish mustache</h3> </div>
            <div className="username vertical-center">
              {this.state.name}
            </div>
          </header>
          <Switch>
            <Route exact path="/" render={props => <HomePage handleUserName={this.handleUserName} />}></Route>
          </Switch>
          <Tiempo />
          <div className="footer-container">
            @ Time-In @ Copyright 2018
          </div>
        </div>
      </Router >
    );
  }
}

export default App;
