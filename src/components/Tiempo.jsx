import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import {ThemeProvider} from 'styled-components'
import PropTypes from 'prop-types';
import ChatBot, { Loading } from 'react-simple-chatbot';
import {saveToCalendar} from '../components/saveToGoogle'
import './Tiempo.css'
import Moment from 'moment';

class UserQuery extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        loading: true,
        data: {},
        result: '',
        trigger: false,
      };
  
      this.triggetNext = this.triggetNext.bind(this);
    }
  
    componentWillMount() {
      const self = this;
      const { steps } = this.props;
      const message = steps.input.value;
       
      const queryUrl = `http://localhost:8080/tiempo?query=${message}`;
  
      const xhr = new XMLHttpRequest();
  
      xhr.addEventListener('readystatechange', readyStateChange);
  
      function readyStateChange() {
        if (this.readyState === 4) {
          const data = JSON.parse(this.responseText);
          console.log(data)
          const bindings = data;
          console.log(bindings.text)
          if (bindings && bindings.text && bindings.text.length > 0) {
            self.setState({ loading: false, result: bindings.text, data: bindings });
          } else {
            self.setState({ loading: false, result: 'Not found.' });
          }
        }
      }
  
      xhr.open('GET', queryUrl);
      xhr.send();
    }
  
    triggetNext() {
      this.setState({ trigger: true }, () => {
        this.props.triggerNextStep();
      });
    }
    
    takeAction() {
      let timeRequested = undefined;
      switch(this.state.data.service){
        case "TRX":
          timeRequested = 45
          break;
        case "Pilates":
          timeRequested = 60
          break;
        case "Strength":
          timeRequested = 60
          break;
        case "HIT":
          timeRequested = 45
          break;
        case "Cardio":
          timeRequested = 50
          break;
        case "Cross-Fit":
          timeRequested = 80
          break;
        case "Yoga":
          timeRequested = 75
          break;

      }
      console.log(this.state.data.date)
      console.log(Moment(this.state.data.date));
      const title = `Appointment to ${this.state.data.service} @ 'Shape-In'`;
      const content = "Please notice if you are late";
      const range = { start: this.state.data.date , end: Moment(this.state.data.date).add(timeRequested, 'm').toDate()};
      const calendarId = 'primary';
      
      
    
      saveToCalendar(title, content, range, calendarId);
      
      this.setState({ trigger: true }, () => {
        this.props.triggerNextStep();
      });
    }

    render() {
      const { trigger, loading, result } = this.state;
  
      return (
        <div className="userquery">
          { loading ? <Loading /> : result }
          {
            !loading &&
            <div
              style={{
                textAlign: 'center',
                marginTop: 20,
              }}
            >
              {
                !trigger &&
                <div>
                <button
                onClick={() => this.takeAction()}
                >
                  Yes
                </button> 
                <button
                onClick={() => this.triggetNext()}
                >
                  No
                </button>
                </div>
              }
            </div>
          }
        </div>
      );
    }
}
  
UserQuery.propTypes = {
    steps: PropTypes.object,
    triggerNextStep: PropTypes.func,
};
 
UserQuery.defaultProps = {
    steps: undefined,
    triggerNextStep: undefined,
};

class Tiempo extends Component {
    constructor(props){
        super(props)
        this.state = { }
    }

    
    render(){
        
        return (

            <ThemeProvider theme={{
                background: 'rgb(240, 240, 240)',
                fontFamily: 'Segoe UI Semibold',
                headerBgColor: 'rgb(47, 48, 49)',
                headerFontColor: 'White',
                headerFontSize: '15px',
                botBubbleColor: '#87CEEB',
                botFontColor: '#fff',
                userBubbleColor: '#fff',
                userFontColor: '#4a4a4a',
               
                
                }}>
                
                
                <ChatBot
                floating
                // handleLink={props.handleLink}
                // toggleFloating={props.toggleFloating}
                hideUserAvatar
                botAvatar={'pics/TimeIn_logo.png'}
                botDelay={2500}
                customDelay={100}
                // opened={props.opened}
                steps={[
                    {
                        id: 'greet',
                        message: 'Hi, I\'m Tiempo. How can I help you?',
                        trigger: 'input',
                    },
                    {
                        id: 'input',
                        user: true,
                        trigger: 'query',
                    },
                    {
                        id: 'query',
                        component: <UserQuery />,
                        waitAction: true,
                        trigger: 'finish',
                    },
                    {
                        id:'finish',
                        message: 'Can I help you with something else?',
                        trigger: 'input',
                    },
                    ]}
            />

                
            </ThemeProvider>
        )
    }
}


export default Tiempo;
