import React from 'react';
import './AddServices.css'
import Button from 'material-ui/Button';
import Services from '../components/Services';


class AddServices extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

    }

    deleteItem(key) {
        var filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key);
        });

        this.setState({
            items: filteredItems
        });
    }

    addItem(e) {
        if (this._inputElement.value !== "") {
            var newItem = {
                text: this._inputElement.value,
                key: Date.now()
            };

            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            });


        }
        this._inputElement.value = "";

        console.log(this.state.items);

        e.preventDefault();


    }
    render() {
        return (
            <div className="addServices">
                <div className="header">
                    <form onSubmit={this.addItem}>
                        <input ref={(a) => this._inputElement = a} placeholder="Enter service to add">
                        </input>
                        <button type="submit">add</button>
                    </form>
                </div>

                <Services entries={this.state.items}
                    delete={this.deleteItem} />
            </div>
        );
    }
}

export default AddServices;