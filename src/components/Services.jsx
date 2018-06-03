import React, { Component } from "react";
import FlipMove from "react-flip-move";

class Services extends Component {
    constructor(props) {
        super(props);

        this.createService = this.createService.bind(this);
    }
    createService(item) {
        return <li onClick={() => this.delete(item.key)}
            key={item.key}>{item.text}</li>
    }

    delete(key) {
        this.props.delete(key);
    }

    render() {
        var servicesItems = this.props.entries;
        var listItem = servicesItems.map(this.createService);

        return (
            <ul className="theList">
                <FlipMove duration={500} easing="ease-out">
                    {listItem}
                </FlipMove>
            </ul>
        );
    }
}

export default Services;