import {Container} from "semantic-ui-react";
import React from "react";
import HeaderCalendar from "./header";
import FooterCalendar from "./footer";

/**
 * Serve as a layout, call it in views
 * @param props: props of the layout
 * @returns {*}
 * @constructor
 */
const Layout = (props) => {
    return (
        <div>
            <HeaderCalendar/>
            <Container style={{marginTop: 200}}>
                {props.children}
            </Container>

            <FooterCalendar/>
        </div>
    );
};
export default Layout;
