import React, { Component } from 'react'
import AddServices from '../components/AddServices';
import Container from 'muicss/lib/react/container';
import ReactDOM from 'react-dom';
import Checkbox from 'muicss/lib/react/checkbox';
import Input from 'muicss/lib/react/input';
import Panel from 'muicss/lib/react/panel';
import Textarea from 'muicss/lib/react/textarea';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import Button from 'muicss/lib/react/button';
import { ListItem, ListItemText } from 'material-ui/List';




const showSecond = true;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

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
        // event.preventDefault()
        // const headLineName = this.state.headLineName
        // this.props.handleHeadLineName(headLineName)
        // this.props.history.push('/')
    }


    render() {
        return (
            <div className="App-Main">
                <h1>
                    Admin Page
                </h1>
                <form>
                    <Container width="80%">

                        <label>
                            <br />
                            <Input className="mui--z2" placeholder="Business Name" onChange={this.editState} />
                        </label>
                        <br />
                        <label>
                            <br />
                            <Input className="mui--z2" placeholder="Email Address" onChange={this.editState} />
                        </label>

                        <label>
                            <div>
                                Days of work
                                    <br />
                                    <Checkbox name="sunday" label="Sunday" defaultChecked={true} /> <br />
                                    <Checkbox name="monday" label="Monday" defaultChecked={true} /><br />
                                    <Checkbox name="tuesday" label="Tuesday" defaultChecked={true} /><br />
                                    <Checkbox name="wednesday" label="Wednesday" defaultChecked={true} /><br />
                                    <Checkbox name="thursday" label="Thursday" defaultChecked={true} /><br />
                                    <Checkbox name="friday" label="Friday" /><br />
                                    <Checkbox name="saturday" label="Saturday" /><br />
                            </div>
                        </label>

                            Start Time:
                            <TimePicker placeholder="9:00" className="mui--z2" showSecond={false} minuteStep={15} />
                            Finish Time:
                            <TimePicker placeholder="18:00" className="mui--z2" showSecond={false} minuteStep={15} />

                            <br />



                            <br />
                            <br />

                            <label>
                                Enter a sentense for your customers<br />
                                <Textarea />
                            </label>


                            <AddServices />
                            <br />
                    </Container>
                        <Button onClick={this.onSubmit} variant="flat" color="primary">Submit</Button>

                   

                </form>
            </div>
                )
            }
        }
ReactDOM.render(<AdminPage />, document.getElementById('root'));
                
                
                
