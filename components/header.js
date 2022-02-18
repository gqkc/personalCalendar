import React, {Component} from "react";
import {Menu} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

/**
 * Header of the calendar with links in the navbar
 */
class HeaderCalendar extends Component {
    state = {open: false}

    static async getInitialProps(props) {
        return props
    }

    render() {
        return (
            <Menu fixed='top' inverted>
                <Menu.Item as='a' header href="/">
                    Calendar
                </Menu.Item>
            </Menu>
        )
    }
}

export default HeaderCalendar;

