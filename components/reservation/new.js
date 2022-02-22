import React, {Component} from "react";
import {Button, Container, Form, Icon, Input, Message, Select} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import axios from 'axios';
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";
import {tags} from "../../constants";

/**
 * Represents a new reservation form
 */
class ReservationNew extends Component {
    state = {
        errorMessage: "",
        loading: false,
        date: new Date(),
        title: "",
        email: "",
        start: "",
        end: "",
        tag: "",
        display:"none"
    };
    /**
     * Save the reservation given the id in props
     * @returns {Promise<void>}
     */
    saveReservation = async () => {
        try {
            const date = moment(this.state.date)

            const startDate = date.set({"hour": parseInt(this.state.start), "minute": 0}).toDate();
            const endDate = date.set({"hour": parseInt(this.state.end), "minute": 0}).toDate();

            // Fetch data from external API
            const reservation = {
                email: this.state.email,
                start: startDate,
                end: endDate,
                title: this.state.title,
                tag: this.state.tag,
                availabilityId: Math.abs(this.props.availabilityId)
            }
            await axios.post("/api/reservations", reservation)
            //window.location.reload(false)

        } catch (err) {
            this.setState({errorMessage: err.message});
        }
        if (this.state.errorMessage==""){
            this.setState({display:"flex"})
        }
    }

    /**
     * this function handles the saving of reservation
     * @param event
     * @returns {Promise<void>}
     */
    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading: true, errorMessage: ""});
        await this.saveReservation()
        this.setState({loading: false});
    };

    render() {
        const hours = Array.from(Array(24), (e, i) => {
            return {key: i, value: i, text: `${i}:00`}
        });
        const tags_items = Array.from(tags, (e, i) => {
            return {key: i, value: i, text: e}
        });
        return (
            <Container>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <h3>Create Reservation</h3>

                    <Form.Field>
                        <label>Date</label>

                        <DatePicker selected={this.state.date}
                                    onChange={(date) => {
                                        this.setState({date: date})
                                    }}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Title</label>
                        <Input
                            value={this.state.title}
                            onChange={(event) =>
                                this.setState({title: event.target.value})
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Start time</label>
                        <Select placeholder='Time' options={hours} onChange={(e, data) => {
                            this.setState({start: data.value})
                        }}/>
                    </Form.Field>
                    <Form.Field>
                        <label>End time</label>
                        <Select placeholder='Time' options={hours} onChange={(e, data) => {
                            this.setState({end: data.value})
                        }}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <Input iconPosition='left' placeholder='Email' onChange={(event) => {
                            this.setState({email: event.target.value})
                        }}>
                            <Icon name='at'/>
                            <input/>
                        </Input>
                    </Form.Field>
                    <Form.Field>
                        <label>Tag</label>
                        <Select options={tags_items} onChange={(e, data) => {
                            this.setState({tag: tags[data.value]})
                        }}/>
                    </Form.Field>

                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Message positive style={{display: this.state.display}} content="Please close!" header="Created!"/>

                    <Button loading={this.state.loading} primary>
                        Create!
                    </Button>
                </Form>
            </Container>

        );
    }
}

export default ReservationNew;
