import React from 'react';

import MessagesArea from '../components/MessagesArea';
import SchedulePage from './SchedulePage';

export const HomePage = props => {
    return (
        <div className='App-Main'>
            <MessagesArea businessName={props.businessName}/>
            <SchedulePage getUserName={props.handleUserName} businessName={props.businessName}/>
        </div>
    )
} 