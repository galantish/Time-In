import React from 'react';
import { Slide } from 'react-slideshow-image';
import './MessagesArea.css'


class MessagesArea extends React.Component{
    constructor(props){
      super(props)
      this.state = {img:[
        'imgs/image1.jpg',
        'imgs/image2.jpg',
        'imgs/image3.jpg',
        'imgs/image4.jpg',
        'imgs/image5.jpg',
        'imgs/image6.jpg',
        'imgs/image7.jpg',
        'imgs/image8.jpg'
    ],}
  
    }
  
    render(){ 
        return (
            <Slide
          images={this.state.img}
          duration={4000}
            transitionDuration={3000}
            />
            );
    }
}

export default MessagesArea;