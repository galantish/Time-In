import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import './Tiempo.css'

class Tiempo extends Component {
    constructor(props){
      super(props)
      this.state = { }
    }

    render(){
        
        return (
            <Paper className="tiempo-wrapper">
                <h4> Tiempo Component </h4>
                <TextField style={{width: "95%"}} id="tiempo-text" multiline rowsMax="15" placeholder="How can I help you?">

                </TextField>

            </Paper>
        )
    }
}

export default Tiempo;