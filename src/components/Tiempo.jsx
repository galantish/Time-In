import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import {ThemeProvider} from 'styled-components'
import PropTypes from 'prop-types';
import ChatBot, { Loading } from 'react-simple-chatbot';

import './Tiempo.css'

class UserQuery extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        loading: true,
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
          const bindings = data._text;
          console.log(bindings)
          if (bindings && bindings.length > 0) {
            self.setState({ loading: false, result: bindings });
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
                <button
                  onClick={() => this.triggetNext()}
                >
                  Ok
                </button>
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
