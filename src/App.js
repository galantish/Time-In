import React, { Component } from 'react';
import './App.css';
 
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import SchedulePage from './pages/SchedulePage';
import MessagesArea from './components/MessagesArea';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';
import Tiempo from './components/Tiempo';
import { AddServices } from './components/AddServices';
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
      <Router>
        <div className="App">
          <header className="App-header">
            <NavLink to="/">
              <img src="./pics/NofarLogo.bmp" />
            </NavLink>
            <NavLink to="/admin">
              <h1 className="App-title">Admin Console</h1>
            </NavLink>
            <div className="vertical-center2"> <h1>Shape-In</h1> </div>
            <div className="username vertical-center">
              {this.state.name}
            </div>
          </header>
          <Switch>
            <Route exact path="/" render={props => <HomePage handleUserName={this.handleUserName} />}></Route>
            <Route exact path="/admin" render={props => <AdminPage />}></Route>
          </Switch>
          <Tiempo />
          <div className="footer-container">
            @ Time-In Copyright 2018
        </div>
        </div>
      </Router>
    );
  }
}

export default App;