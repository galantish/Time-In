import React, { Component } from "react";

class Services extends Component {
    createService(item) {
        return <li key={item.key}> {item.text} </li>
    }

    render() {
        var servicesItems = this.props.entries;
        var listItem = servicesItems.map(this.createService);

        return (
            <ul className="theList">
                {listItem}
            </ul>
        );
    }
}

export default Services;