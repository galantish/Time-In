import React from 'react';
import { Slide } from 'react-slideshow-image';
import './MessagesArea.css'


class MessagesArea extends React.Component{
    constructor(props){
      super(props)
      this.state = {business: { 
        images: [],
      }}
    }
  
    componentDidMount = async() => {
        // Get business
        const options = {
         method: "GET",
       }
   
       
       await fetch(`http://localhost:8080/Businesses/${this.props.businessName}`, options).then(response => {
         response.json().then(data => {
           this.setState({
             business: data.businesses[0],
           });
         });
       }).catch(err => {
         alert('error in fetching business email')
       });
     };

    render(){ 
        return (
            <Slide
          images={this.state.business.images}
          duration={4000}
            transitionDuration={3000}
            />
            );
    }
}

export default MessagesArea;