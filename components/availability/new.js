import React, {Component} from "react";
import {Button, Container, Divider, Form, Grid, Message, Segment, Select} from "semantic-ui-react";

import DatePicker from "react-datepicker";
import axios from 'axios';
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";

/**
 * Represents a new availability form
 */
class AvailabilityNew extends Component {
    state = {
        errorMessage: "",
        loading: false,
        start: "",
        end: "",
        dateStart: new Date(),
        dateEnd: new Date()
    };
    /**
     * save the availability by calling the API
     * @returns {Promise<void>}
     */
    save = async () => {
        try {
            const startDate = moment(this.state.dateStart).set("hour", this.state.start).set("minute", 0);
            const endDate = moment(this.state.dateEnd).set("hour", this.state.end).set("minute", 0);
            // Fetch data from external API

            await axios.post("/api/availabilities", {start: startDate, end: endDate})
        } catch (err) {
            this.setState({errorMessage: err.message});
        }
    }
    /**
     * This function handle the saving of availability
     * @param event
     * @returns {Promise<void>}
     */
    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading: true, errorMessage: ""});
        await this.save()
        this.setState({loading: false});
    };

    render() {
        const hours = Array.from(Array(24), (e, i) => {
            return {key: i, value: i, text: `${i}:00`}
        });
        return (
            <Container textAlign='center'>
                <Grid centered width="100%" style={{marginTop: "20px"}}>
                    <Segment>
                        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                            <h2>Create Slot</h2>
                            <Divider/>

                            <Form.Field>
                                <label>Start time</label>
                                <DatePicker selected={this.state.dateStart}
                                            onChange={(start) => {
                                                this.setState({dateStart: start})
                                            }}/>
                                <Select placeholder='Time' options={hours} onChange={(start) => {
                                    this.setState({start: start})
                                }}/>
                            </Form.Field>
                            <Form.Field>
                                <label>End time</label>
                                <DatePicker selected={this.state.dateEnd}
                                            onChange={(end) => {
                                                this.setState({dateEnd: end})
                                            }}/>
                                <Select placeholder='Time' options={hours} onChange={(end) => {
                                    this.setState({end: end})
                                }}/>
                            </Form.Field>

                            <Message error header="Oops!" content={this.state.errorMessage}/>
                            <Button loading={this.state.loading} primary>
                                Create!
                            </Button>
                        </Form>
                    </Segment>
                </Grid>
            </Container>

        );
    }
}

export default AvailabilityNew;
