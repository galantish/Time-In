// import React, { Component } from 'react';
// import './App.css';

// import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
// import SchedulePage from './pages/SchedulePage';
// import MessagesArea from './components/MessagesArea';
// import { HomePage } from './pages/HomePage';
// import { AdminPage } from './pages/AdminPage';
// import Tiempo from './components/Tiempo';


// class App extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       name: '',
//       headlineName: '',
//     }
//   }

//   handleUserName(name) {
//     this.setState({ name })
//   }

//   handleHeadLineName = headlineName => {
//     this.setState({ headlineName })
//   }



//   render() {

//     return (
//       <Router>
//         <div>

//           <div className="App">
//             <header className="App-header">
//               <NavLink to="/">
//                 <h1 className="App-title">Welcome to Time-In</h1>
//               </NavLink>
//               <NavLink to="/admin">
//                 <h4 className="App-title">Admin Console</h4>
//               </NavLink>
//               <div className="vertical-center2"> <h1>{this.state.headlineName}</h1> </div>
//               <div className="username vertical-center">
//                 {this.state.name}
//               </div>
//             </header>
//             <Switch>
//               <Route exact path="/" render={props => <HomePage handleUserName={this.handleUserName} />}></Route>
//               <Route exact path="/admin" render={props => <AdminPage handleHeadLineName={this.handleHeadLineName} {...props} />}></Route>
//             </Switch>
//             <Tiempo />
//           </div>
//           <div className="footer-container">
//             @ Time-In @ Copyright 2018
  
//       <div className="App">
//               <header className="App-header">

//                 <img src="pics/TimeInLogogo.bmp" />

//                 <div className="vertical-center2"> <h1>Shape-In</h1> </div>
//                 <div className="username vertical-center">
//                   {this.state.name}
//                 </div>
//               </header>
//               <div className='App-Main'>
//                 <MessagesArea />
//                 <SchedulePage getUserName={this.handleUserName.bind(this)} />
//               </div>
//               <Tiempo />
//               <div className="footer-container">
//                 @ Time-In Copyright 2018
//         </div>
//             </div>
//           </div>
//         </div>
//       </Router>
//     );
//   }
// }

// export default App;

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
        
        <img src= "./pics/TimeIn_logo-02.png" />
        
          <div className="vertical-center2"> <h1>Shape-In</h1> </div>
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
          @ Time-In Copyright 2018
        </div>
      </div>
    );
  }
}

export default App;