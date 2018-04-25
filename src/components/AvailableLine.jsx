import React, { Component } from 'react'
import './AvailableLine.css'

import { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';

import Moment from 'moment'


class AvailableLine extends Component {
    constructor(props){
      super(props)
      this.state = {

      }
    }
    
    handleClick(e){
        if (this.props.onClick){
            this.props.onClick(e, this.props.value)
        }
    }

    render(){
        const { value, pic } = this.props
        const { start, end } = value;
        
        const displayedText = (date) => {
            const momentDate = Moment(date);
            
            const todayStartOfDay = Moment().hours(0).minutes(0).seconds(0).milliseconds(0);
            const todayEndOfDay = Moment().hours(23).minutes(59).seconds(59).milliseconds(0);

            const tomorrowStartOfDay = todayStartOfDay.clone().add(1, "day");
            const tomorrowEndOfDay = todayEndOfDay.clone().add(1, "day");

            if (momentDate.isBetween(todayStartOfDay, todayEndOfDay)) {
                return `Today at ${momentDate.format("HH:mm")}`;
            }
            if (momentDate.isBetween(tomorrowStartOfDay, tomorrowEndOfDay)) {
                return `Tommorow at ${momentDate.format("HH:mm")}`;
            }

            return Moment(date).format("ddd DD MMM YYYY HH:mm")
        }

        return (
            <ListItem className="list-item">
                <Avatar src={pic}/>
                <ListItemText primary={`From ${displayedText(start)} To ${displayedText(end)}`} />
                <Button variant="flat" color="primary" onClick={this.handleClick.bind(this)}>
                    Pick
                </Button>
            </ListItem>
        )
    }
}

export default AvailableLine;