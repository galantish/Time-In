import React, { Component } from "react";
import FlipMove from "react-flip-move";
import { Button, IconButton, List, ListItem } from "material-ui";
import { Delete } from "material-ui-icons";
import { TextField } from "../../node_modules/material-ui";

class Services extends Component {
  constructor(props) {
    super(props);
  }

  delete(key) {
    this.props.delete(key);
  }

  render() {
    return (
      //   <ul className="theList">
      //     <FlipMove duration={500} easing="ease-out">
      //       {listItem}
      //     </FlipMove>
      //   </ul>
      <List>
        {this.props.entries.map(item => this.renderServiceItem(item))}
      </List>
    );
  }
  renderServiceItem(item) {
    return (
      <ListItem key={item.key}>
        <p style={{fontSize: '18px', margin: '0 20px 0 0'}}>{item.text}</p>
        <TextField
          type="number"
          value={item.duration}
          label="Duration (minutes)"
          placeholder="Duration (minutes)"
          onChange={event =>
            this.props.onDurationChange(item.key, event.target.value)
          }
        />
        {/* <input
          type="number"
          value={item.duration}
          onChange={event =>
            this.props.onDurationChange(item.key, event.target.value)
          }
        /> */}
        {/* <button onClick={() => this.delete(item.key)}>Remove</button> */}
        <IconButton onClick={() => this.delete(item.key)}>
          <Delete />
        </IconButton>
      </ListItem>
    );
  }
}

export default Services;
