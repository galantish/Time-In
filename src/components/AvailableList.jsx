import React, { Component } from 'react'

import List from 'material-ui/List';

import AvailableLine from './AvailableLine'

class AvailableList extends Component {
    constructor(props){
      super(props)
      this.state = {

      }

    }

    handleClick(e, value){
        if(this.props.onClick){
            this.props.onClick(e, value)
        }
    }

    render(){
        const { list, pic, onClick, ...otherProps } = this.props

        return (
            <div {...otherProps}>
                <List>
                    {
                        list && 
                        list.length > 0 &&
                        list.map((obj, index) => {
                            return (
                                <AvailableLine key={index} value={obj} pic={pic} onClick={this.handleClick.bind(this)}/>
                            ) 
                        })
                    }
                </List>
            </div>
        )
    }
}

export default AvailableList;