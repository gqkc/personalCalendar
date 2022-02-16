import {Container} from "semantic-ui-react";
import React from "react";
import HeaderCalendar from "./header";

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
