import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import ChatBot from 'react-simple-chatbot';
import {ThemeProvider} from 'styled-components'

import './Tiempo.css'

class Tiempo extends Component {
    constructor(props){
      super(props)
      this.state = { }
    }

    render(){
        
        return (
            <ThemeProvider theme={{
                background: '#f5f8fb',
                fontFamily: 'Helvetica Neue',
                headerBgColor: '#000000',
                headerFontColor: '#fff',
                headerFontSize: '15px',
                botBubbleColor: '#000000',
                botFontColor: '#fff',
                userBubbleColor: '#fff',
                userFontColor: '#4a4a4a',
                }}>
                <ChatBot
                    steps={[
                    {
                        id: '1',
                        message: 'What is your name?',
                        trigger: '2',
                    },
                    {
                        id: '2',
                        user: true,
                        trigger: '3',
                    },
                    {
                        id: '3',
                        message: 'Hi {previousValue}, nice to meet you!',
                        end: true,
                    },
                    ]}
                />
            </ThemeProvider>
        )
    }
}

export default Tiempo;