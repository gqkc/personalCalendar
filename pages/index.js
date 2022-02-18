import 'react-calendar-timeline/lib/Timeline.css'
import React, {Component} from "react";
import Layout from "../components/Layout";
import {Button, Header, Modal, Tab} from "semantic-ui-react";
import Calendar from "../components/calendar";
import Stats from "../components/stats";
import AvailabilityNew from "../components/availability/new";

/**
 * Main entry point
 */
class Home extends Component {
    state={open:false}

    /**
     * Render a modal to create availability
     * @returns {*}
     */
    renderCreateAvailability() {
        return (<Modal
            size="tiny"
            closeIcon
            open={this.state.open}
            trigger={<Button style={{float:"right"}} primary disabled={!this.checkAdmin(this.props.user)}><h3>Create
                availability</h3></Button>}
            onClose={() => this.setState({open: false})}
            onOpen={() => this.setState({open: true})}
        >
            <Header content='Create Slot!'/>
            <Modal.Content>
                <AvailabilityNew/>
            </Modal.Content>
        </Modal>)
    }

    /**
     * Returns True if login from github equals the ADMIN in .env file
     * @param user
     * @returns {*}
     */
    checkAdmin = (user) => {
        console.log(user.login)
        console.log(process.env.ADMIN)
        console.log(process.env)
        if (process.env.NEXT_PUBLIC_ADMIN == user.login) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Render the layout with the calendar and stats
     * @returns {*}
     */
    render() {
        const panes = [
            {menuItem: 'Calendar', render: () => <Tab.Pane><Calendar user={this.props.user}/></Tab.Pane>},
            {menuItem: 'Stats', render: () => <Tab.Pane> <Stats user={this.props.user}/></Tab.Pane>},
        ]
        return (
            <Layout>
                {this.renderCreateAvailability()}
                <Tab panes={panes}/>
            </Layout>

        )
    }


}

export default Home;
