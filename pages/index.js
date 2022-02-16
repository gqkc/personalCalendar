import Timeline from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import React, {Component} from "react";
import Layout from "../components/Layout";
import axios from 'axios';
import {Header, Modal} from "semantic-ui-react";
import ReservationNew from "../components/reservation/new";
import ReservationDelete from "../components/reservation/delete";
import {colors, tags} from "../constants";


class Home extends Component {
    state = {
        availabilities: [],
        reservations: [],
        open: false,
        openResa: false,
        current: ""
    };

    async componentDidMount() {
        await this.getAvailabilities();
    }
    getColor(tag) {
        let idx = tags.indexOf("blue")
        if (tags.includes(tag)) {
            idx = tags.indexOf(tag)
        }
        return colors[idx]
    }
    async getAvailabilities() {
        let av_response = await axios.get("api/availabilities");
        const avs = av_response.data;
        const availabilities = avs.map((av, i) => {
            return {
                id: -av.id,
                group: 1,
                title: "Free!",
                start_time: moment(av.start),
                end_time: moment(av.end),
                canMove: false,
                itemProps: {className: 'ui positive', style: {background: "green", textAlign: "center"}}
            }
        });
        let res_response = await axios.get("api/reservations");
        const res = res_response.data;
        const reservations = res.map((reservation, i) => {
            return {
                id: reservation.id,
                group: 2,
                title: reservation.title,
                start_time: moment(reservation.start),
                end_time: moment(reservation.end),
                canMove: false,
                itemProps: {style: {background: this.getColor(reservation.tag), textAlign: "center"}}
            }
        });

        this.setState({availabilities: availabilities, reservations: reservations});
    }


    render() {
        const groups = [{id: 1, title: 'Availabilities', height: 100}, {id: 2, title: 'Bookings', height: 100}]
        return (
            <Layout>
                <div>
                    <Timeline
                        groups={groups}
                        items={[...this.state.availabilities, ...this.state.reservations]}
                        defaultTimeStart={moment().add(-12, 'hour')}
                        defaultTimeEnd={moment().add(12, 'hour')}
                        onItemClick={(itemId, e, time) => {
                            if (itemId > 0) {
                                this.setState({openResa: true, current: itemId})
                            } else {
                                this.setState({current: itemId, open: true})
                            }
                        }
                        }
                    />

                </div>
                <Modal
                    size="tiny"
                    closeIcon
                    open={this.state.open}
                    onClose={() => this.setState({open: false})}
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
                    onClose={() => this.setState({openResa: false})}
                    onOpen={() => this.setState({openResa: true})}
                >
                    <Header content='Delete Reservation'/>
                    <Modal.Content>
                        <ReservationDelete reservationId={this.state.current}/>
                    </Modal.Content>
                </Modal>
            </Layout>

        )
    }


}

export default Home;
