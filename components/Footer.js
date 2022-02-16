import React, {Component} from "react";
import {Container, Grid, Header, List, Segment} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

/**
 * Footer of the calendar
 */
class FooterCalendar extends Component {
    render() {
        return (
            <Segment inverted vertical style={{padding: '5em 0em', marginTop: 150}}>
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column textAlign={"center"}>
                                <Header  inverted as='h4' content='About'/>
                                <List link inverted >
                                    <List.Item as='a' href="https://nextjs.org">Nextjs</List.Item>
                                    <List.Item as='a' href="https://github.com/namespace-ee/react-calendar-timeline">Timeline</List.Item>
                                    <List.Item as='a' href="https://expressjs.com">Express</List.Item>
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        )
    }
}

export default FooterCalendar;

