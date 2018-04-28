import React, { Component } from 'react'

import SchedulePage from './SchedulePage';
import MessagesArea from '../components/MessagesArea';

export const HomePage = props => {
    return (
        <div className='App-Main'>
            <MessagesArea />
            <SchedulePage getUserName={props.handleUserName} />
        </div>
    )
}
