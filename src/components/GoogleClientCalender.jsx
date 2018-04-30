/* global gapi */

import React, { Component } from 'react'
import Button from 'material-ui/Button';

var API_KEY = 'AIzaSyDmamUL7tg84jsAf3M50BucmMMpGLuV9rY';
var CLIENT_ID = '753232535471-f7j7pl2jo253ek2utra19nhmlae78tnc.apps.googleusercontent.com';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar";

var self = {};

export default class GoogleClientCalender extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAuthButton: false,
      showSignOutButton: false,
      list: []
    };

    self = this;
    this.initClient = this.initClient.bind(this);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
    this.LoadGoogleCalender = this.LoadGoogleCalender.bind(this);
    this.listUpcomingEvents = this.listUpcomingEvents.bind(this);
  }
  
  componentDidMount(){
    this.LoadGoogleCalender();
  }

  LoadGoogleCalender(){
    let script = document.createElement("script");
    script.id = "googleCalenderClient"
    script.src = "https://apis.google.com/js/api.js"
    script.onload = this.handleClientLoad
    script.onreadystatechange = "if (this.readyState === 'complete') this.onload()"
    script.defer = true
    script.async = true

    document.getElementsByTagName("script")[0].appendChild(script)      
  }

  /*************************************************************** */
    updateSigninStatus(isSignedIn, callback) {
      if (isSignedIn) {
        this.setState({
          showAuthButton: false,
          showSignOutButton: true
        })
        const username = 'Hello, ' + gapi.auth2.getAuthInstance().currentUser.Ab.w3.ig;
        this.props.getUserName(username)
        this.listUpcomingEvents(callback);
        //insertNewEvent();
      } else {
        this.setState({
          showAuthButton: true,
          showSignOutButton: false
        })
      }
    }

    handleAuthClick(e){
      e.preventDefault();
      const signedIn = window.gapi.auth2.getAuthInstance().isSignedIn.get();
      if (!signedIn){
        window.gapi.auth2.getAuthInstance().signIn().then( function() {
          const signedIn2 = window.gapi.auth2.getAuthInstance().isSignedIn.get();
          this.updateSigninStatus(signedIn2, this.props.onClick)
        }.bind(this)).catch(function(err) {
          this.updateSigninStatus(false)
          this.props.onClick([])
        }.bind(this))
      }else{
        this.props.onClick(this.state.list)
      }
    }
    handleSignoutClick(e){
      e.preventDefault();
      window.gapi.auth2.getAuthInstance().signOut();
    }
    handleClientLoad() {
      gapi.load('client:auth2', self.initClient);
    }
    initClient(/****here you've had parameters that made config vars unaccessible*****/) {
      window.gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
      }).then(function () {
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(self.updateSigninStatus);
        const signedIn = window.gapi.auth2.getAuthInstance().isSignedIn.get();
        self.updateSigninStatus(signedIn);
      });
    }

    listUpcomingEvents(callback) {
      gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      }).then(function(response) {
        const events = response.result.items;
        
        if(callback) {
          callback(events)
        }

        this.setState({list: events})
      }.bind(this));
    }

    render(){    
      return(
        <div>
        <Button variant="raised" class="findBtn" onClick={this.handleAuthClick.bind(this)}>
          Find
        </Button>

 
      {/*<Button variant="raised" color="secondary" className="button-control" onClick={this.handleSignoutClick}>
          Force signout
      </Button>*/}
        </div>
      )
    }
  }