import React from "react";
import {Button, Menu} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const HeaderCalendar = () =>
    (
        <Menu style={{marginTop: "10px"}}>
            <a className="item" href="/">
                <h3>Calendar</h3>
            </a>
            <a className="item" href="/stats">
                <h3>Stats</h3>
            </a>
            <Menu.Item position="right">
                <a position="right" className="button" href="/availability/new">
                    <Button primary href="/availability/new" ><h3>Create availability</h3></Button>
                </a>
            </Menu.Item>
        </Menu>
    );
export default HeaderCalendar;

