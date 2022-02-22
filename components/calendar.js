import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'

import moment from 'moment'
import React, {Component} from "react";
import axios from 'axios';
import {Container, Header, Modal, Segment} from "semantic-ui-react";
import ReservationNew from "../components/reservation/new";
import ReservationDelete from "../components/reservation/delete";
import {colors, tags} from "../constants";


/**
 * Main entry point rendering the calendar
 */
class Calendar extends Component {
    state = {
        items: [],
        open: false,
        openResa: false,
        current: ""
    };

    /**
     * On component mount, set items
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        const items = await this.getAvailabilities();
        this.setState({items: items});
    }


    /**
     * Getting the tag associated color
     * @param tag: tag of the reservation
     * @returns string: color of the tag
     */
    getColor(tag) {
        let idx = tags.indexOf("blue")
        if (tags.includes(tag)) {
            idx = tags.indexOf(tag)
        }
        return colors[idx]
    }

    /**
     * Populate state variables with availabilities and reservations
     * @returns {Promise<{items: *[]}>}
     */
    async getAvailabilities() {
        let av_response = await axios.get("api/availabilities");
        const avs = av_response.data;
        const availabilities = avs.map(av => {
            return {
                id: -av.id,
                group: 1,
                title: "Free!",
                start_time: moment(av.start),
                end_time: moment(av.end),
                canMove: false,
                itemProps: {}
            }
        });

        let res_response = await axios.get("api/reservations");
        const res = res_response.data;
        const reservations = res.map(reservation => {
            return {
                id: reservation.id,
                group: 2,
                title: reservation.title,
                start_time: moment(reservation.start),
                end_time: moment(reservation.end),
                canMove: false,
                itemProps: {
                    style: {background: this.getColor(reservation.tag)}
                }
            }
        });

        return [...availabilities, ...reservations];
    }

    onItemClick(itemId, e, time) {
        if (itemId > 0) {
            this.setState({openResa: true, current: itemId})
        } else {
            this.setState({current: itemId, open: true})
        }
    }

    async updateAvailabilities() {
        const items = await this.getAvailabilities();
        this.setState({items: items});
    }


    /**
     * Render the layout with the calendar
     * @returns {*}
     */
    render() {
        const groups = [{id: 1, title: 'Availabilities', height: 100}, {id: 2, title: 'Bookings', height: 100}]
        return (
            <Container data-custom-attribute='Random content' textAlign='center' style={{marginTop: 50}}>
                <Segment>
                    <Timeline
                        groups={groups}
                        items={this.state.items}
                        defaultTimeStart={moment().add(-12, 'hour')}
                        defaultTimeEnd={moment().add(12, 'hour')}
                        onItemClick={(i, e, t) => this.onItemClick(i, e, t)}
                    />
                </Segment>
                <Modal
                    size="tiny"
                    closeIcon
                    open={this.state.open}
                    onClose={async () => {
                        await this.updateAvailabilities();
                        this.setState({open: false})
                    }}
                    onOpen={() => this.setState({open: true})}
                >
                    <Header content='Book meeting'/>
                    <Modal.Content>
                        <ReservationNew availabilityId={this.state.current}/>
                    </Modal.Content>
                </Modal>
                <Modal
                    size="mini"
                    closeIcon
                    open={this.state.openResa}
                    onClose={async () => {
                        await this.updateAvailabilities();
                        this.setState({openResa: false});

                    }}
                    onOpen={() => this.setState({openResa: true})}
                >
                    <Header content='Delete Reservation'/>
                    <Modal.Content>
                        <ReservationDelete reservationId={this.state.current}/>
                    </Modal.Content>
                </Modal>

            </Container>

        )
    }


}

export default Calendar;
