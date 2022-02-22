import React, {Component} from "react";
import {Button, Container, Form, Input, Message} from "semantic-ui-react";
import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css";

/**
 *
 */
class ReservationDelete extends Component {

    state = {
        errorMessage: "",
        display: "none",
        loading: false,
        email: "",

    };
    /**
     * Call the API to delete the specified reservation in props
     * The specified email has to match the reservation email, otherwise show error message
     * @returns {Promise<void>}
     */
    deleteReservation = async () => {
        try {
            await axios.delete(`/api/reservations?id=${this.props.reservationId}&mail=${this.state.email}`,)
        } catch (err) {
            this.setState({errorMessage: err.message});
        }
        if (this.state.errorMessage == "") {
            this.setState({display: "flex"})
        }
    }

    /**
     * On submit function handle the deletion of the reservation with error messages
     * @param event
     * @returns {Promise<void>}
     */
    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading: true, errorMessage: ""});
        await this.deleteReservation()
        this.setState({loading: false});
    };

    /**
     * Render a modal to delete the reservation
     * @returns {*}
     */
    render() {
        return (
            <Container>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <h3>Do you want to delete this meeting ? </h3>
                    <Form.Field>
                        <label>Confirm by typing your email</label>
                        <Input
                            value={this.state.email}
                            onChange={(event) =>
                                this.setState({email: event.target.value})
                            }
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Message positive style={{display: this.state.display}} content="Please close!" header="Deleted"/>
                    <Button loading={this.state.loading} negative>
                        Delete
                    </Button>
                </Form>
            </Container>

        );
    }
}

export default ReservationDelete;
