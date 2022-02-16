import React, {Component} from "react";
import {Button, Header, Menu, Modal} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import AvailabilityNew from "./availability/new";

/**
 * Header of the calendar with links in the navbar
 */
class HeaderCalendar extends Component {
    state = {open: false}

    render() {
        return (
            <Menu fixed='top' inverted>
                <Menu.Item as='a' header href="/">
                    Calendar
                </Menu.Item>
                <Menu.Item as='a' href="/stats">
                    Stats
                </Menu.Item>


                <Menu.Item position="right">

                    <Modal
                        size="tiny"
                        closeIcon
                        open={this.state.open}
                        trigger={<Button primary><h3>Create availability</h3></Button>}
                        onClose={() => this.setState({open: false})}
                        onOpen={() => this.setState({open: true})}
                    >
                        <Header content='Create Slot!'/>
                        <Modal.Content>
                            <AvailabilityNew/>
                        </Modal.Content>
                    </Modal>

                </Menu.Item>
            </Menu>
        )
    }
}

export default HeaderCalendar;

