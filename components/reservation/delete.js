import React, {Component} from "react";
import {Button, Container, Form, Grid, Icon, Input, Message, Segment, Select} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import axios from 'axios';
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";
import {tags} from "../../constants";
import Router from 'next/router'

class ReservationDelete extends Component {
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

    deleteReservation = async () => {
        try {
            await axios.delete(`/api/reservations/${this.props.reservationId}`,)
            window.location.replace("/")

        } catch (err) {
            this.setState({errorMessage: err.message});
        }
    }

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading: true, errorMessage: ""});
        await this.deleteReservation()
        this.setState({loading: false});
        //alert(this.context)
    };

    render() {
        return (
            <Container>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <h3>Do you want to delete this meeting ? </h3>

                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button loading={this.state.loading} negative>
                        Delete
                    </Button>
                </Form>
            </Container>

        );
    }
}

export default ReservationDelete;
