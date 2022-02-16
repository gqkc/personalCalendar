import React, {Component} from "react";
import {Button, Container, Form, Icon, Input, Message, Select} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import axios from 'axios';
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";
import {tags} from "../../constants";

class ReservationNew extends Component {
    state = {
        errorMessage: "",
        loading: false,
        date: new Date(),
        title: "",
        email: "",
        start: "",
        end: "",
        tag: ""
    };

    saveReservation = async () => {
        try {
            const date = moment(this.state.date)
            const startDate = date.set("hour", this.state.start).set("minute", 0);
            const endDate = date.set("hour", this.state.end).set("minute", 0);
            // Fetch data from external API
            const reservation = {
                email: this.state.email,
                start: startDate,
                end: endDate,
                title: this.state.title,
                availabilityId: this.props.availabilityId
            }
            await axios.post("/api/reservations", reservation)
            window.location.replace("/")

        } catch (err) {
            this.setState({errorMessage: err.message});
        }
    }

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
                            <Select placeholder='Time' options={hours} onChange={(start) => {
                                this.setState({start: start})
                            }}/>
                        </Form.Field>
                        <Form.Field>
                            <label>End time</label>
                            <Select placeholder='Time' options={hours} onChange={(end) => {
                                this.setState({end: end})
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
                            <Select options={tags_items} onChange={(tag) => {
                                this.setState({tag: tag})
                            }}/>
                        </Form.Field>

                        <Message error header="Oops!" content={this.state.errorMessage}/>
                        <Button loading={this.state.loading} primary>
                            Create!
                        </Button>
                    </Form>
            </Container>

        );
    }
}

export default ReservationNew;
