import React from 'react';
import './AddServices.css'
import Button from 'material-ui/Button';


class AddServices extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

    }

    render() {
        return (
            <div className="addServices">
                <div className="header">
                    <form>
                        <input placeholder="Enter service to add">
                        </input>
                        <button type="submit">add</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddServices;