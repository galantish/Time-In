import React, { Component } from 'react';
import './SchedulePage.css';

import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

import fetch from 'cross-fetch'
import Moment from 'moment'

import GoogleClientCalender from '../components/GoogleClientCalender'
import AvailableList from '../components/AvailableList'
import {saveToCalendar} from '../components/saveToGoogle'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class SchedulePage extends Component {
  constructor(props){
    super(props)
    this.state = {
      service: '',
      from: Moment().format("YYYY-MM-DDTHH:mm"),
      showResult: false,
      results: [],
      userBusy: [],
      showProccessing: false,
      hasError: false,
      showDialog: false,
      selectedTime: { start: '', end: ''},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePickTime = this.handlePickTime.bind(this);
  }

  handleOpen = () => {
    this.setState({ showDialog: true });
  };

  handleClose = () => {
    this.setState({ showDialog: false });
  };

  handleChange = event => {
    let timeRequested = undefined
    if (event.target.name === "service"){
      switch(event.target.value){
        case "eyebrow":
          timeRequested = 10
          break;
        case "mustache":
          timeRequested = 30
          break;
        default: timeRequested = 10
        }
    }

    this.setState({ [event.target.name]: event.target.value, showResult: false, hasError: false, timeRequested });

  };

  handleSaveToCalendar(){
    const title = `Appointment to ${this.state.service} @ 'Genish Mustache'`,
    content = "Please notice if you are late", 
    range = this.state.selectedTime, 
    calendarId = 'primary';
    
    saveToCalendar(title, content, range, calendarId);
    this.handleClose();
  }

  handleClick = (list) => {
    this.setState({ userBusy: list })
    this.getFreeTimes(list);
  };

  handlePickTime(e, value){
    this.setState({selectedTime: value})
    this.handleOpen()
  }

  getFreeTimes(userBusy){
    this.setState({ showProccessing: true, showResult: false, hasError: false })
    
    const gapInMinutes = 10;
    const startingAt = this.state.from;
    const timeRequested = this.state.timeRequested;

    const options = {
      method: "POST",
      body: JSON.stringify({ userBusy, startingAt, gapInMinutes, timeRequested }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    } 

    fetch("http://localhost:8080/", options).then(response => {
      response.json().then(data => {
        this.setState( { results: data, showResult: true, showProccessing: false, hasError: false } )
      })
    }).catch(err =>{
      this.setState( { showProccessing: false, hasError: true } );
    })
  }


  render() {

    const pic = this.state.service === 'eyebrow' ? "pics/eye.jpg" : "/pics/mustache.jpg"; 

    return (
      <div>
        <form className="schedule-form" autoComplete="off">
          <FormControl className="control">
            <InputLabel htmlFor="service-simple">Select service</InputLabel>
            <Select
              value={this.state.service}
              onChange={this.handleChange}
              inputProps={{
                name: 'service',
                id: 'service-combo',
              }}
              autoWidth>
              <MenuItem value="eyebrow">Eyebrows</MenuItem>
              <MenuItem value="mustache">Mustache</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="from-when"
            name="from"
            label="Starting at"
            type="datetime-local"
            onChange={this.handleChange}
            defaultValue={this.state.from}
            className="control"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br/><br/>
          { /* מחביא פה את הלחצן find */ }
          <GoogleClientCalender onClick={this.handleClick} getUserName={this.props.getUserName}/>
          <br/><br/>

          {
            this.state.hasError && "Error occurred :("
          }
          {
            this.state.showProccessing && "Just a moment please..."
          }
          {
            this.state.showResult &&
            this.state.results &&
            (
              this.state.results.length > 0 ? 
              <AvailableList className="available-list" list={this.state.results} pic={pic} onClick={this.handlePickTime}/> :
              "No results available"
            )
          }
        </form>

        {
          <Dialog
            open={this.state.showDialog}
            transition={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description">
            <DialogTitle id="alert-dialog-slide-title">
              Just to be sure
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Do you wanna set up appointment to { Moment(this.state.selectedTime.start).format("YYYY-MM-DD HH:mm ") } 
                until { Moment(this.state.selectedTime.end).format("YYYY-MM-DD HH:mm ") } 
                for {this.state.service} At 'Genish Mustache'
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleSaveToCalendar.bind(this)} color="primary">
                Save to calendar
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        }
      </div>
    );
  }
}

export default SchedulePage;