import React, { Component } from 'react'

export class AdminPage extends Component {

    state = {
        headLineName: '',
    }

    editState = event => {
        const headLineName = event.target.value
        this.setState({
            headLineName
        })
    }

    onSubmit = (event) => {
        event.preventDefault()
        const headLineName = this.state.headLineName
        this.props.handleHeadLineName(headLineName)
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="App-Main">
                <h1>
                    Admin Page
                </h1>
                <form>
                    <label>
                        Business Name:<br />
                        <input placeholder="Genish Mustach" onChange={this.editState} />
                    </label>
                    <br />
                    <button onClick={this.onSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}

