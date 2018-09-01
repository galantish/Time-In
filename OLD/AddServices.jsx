import React from "react";
import "./AddServices.css";
import {Button, IconButton} from "material-ui";
import Services from "../components/Services";

class AddServices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      input: ""
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
  }
  handleInputChange(event) {
    this.setState({ input: event.target.value });
  }
  deleteItem(key) {
    var filteredItems = this.state.items.filter(function(item) {
      return item.key !== key;
    });

    this.setState({
      items: filteredItems
    });
  }
  handleDurationChange(key, value) {
    var index = this.state.items.findIndex(item => item.key === key);
    let newItem = Object.assign({}, this.state.items[index], {
      duration: value
    });
    var newItems = [...this.state.items];
    newItems[index] = newItem;
    this.setState({
      items: newItems
    });
  }

  addItem(e) {
    if (this.state.input !== "") {
      var newItem = {
        text: this.state.input,
        key: Date.now(),
        duration: 60
      };

      this.setState(prevState => {
        return {
          items: prevState.items.concat(newItem),
          input: ""
        };
      });
    }

    console.log(this.state.items);
    e.preventDefault();
  }
  render() {
    return (
      <div className="addServices">
        <div className="header">
          <form onSubmit={this.addItem}>
            {/* <input ref={(a) => this._inputElement = a} placeholder="Enter service to add" /> */}
            <input
              value={this.state.input}
              onChange={this.handleInputChange}
              placeholder="Enter service to add"
            />
            <button type="submit">add</button>
          </form>
        </div>

        <Services entries={this.state.items} delete={this.deleteItem} onDurationChange={this.handleDurationChange} />
      </div>
    );
  }
}

export default AddServices;
