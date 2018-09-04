import React from 'react';

import MessagesArea from '../components/MessagesArea';
import SchedulePage from './SchedulePage';

export const HomePage = props => {
    return (
        <div className='App-Main'>
            <MessagesArea />
            <SchedulePage getUserName={props.handleUserName} businessName={props.businessName}/>
        </div>
    )
} 