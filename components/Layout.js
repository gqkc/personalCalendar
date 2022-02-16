import {Container} from "semantic-ui-react";
import React from "react";
import HeaderCalendar from "./header";

/**
 * Serve as a layout, call it in views
 * @param props: props of the layout
 * @returns {*}
 * @constructor
 */
const Layout = (props) => {
    return (
        <div>
            <Container>
                <HeaderCalendar/>
                {props.children}
            </Container>
        </div>
    );
};
export default Layout;
