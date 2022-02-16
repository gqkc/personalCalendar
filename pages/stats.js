import React, {Component} from "react";
import Layout from "../components/layout";
import {TagCloud} from "react-tagcloud";
import {Container, Divider, Grid, Header} from "semantic-ui-react";
import {Cell, Funnel, FunnelChart, LabelList, Legend, Pie, PieChart, Tooltip} from "recharts";
import {colors} from "../constants";
import axios from "axios";

class Stats extends Component {
    static async getInitialProps(props) {
        let tags = await axios.get("api/reservations/agg", {
            params: {
                group: 'tag'
            }
        })
        let people = await axios.get("api/reservations/agg", {
            params: {
                group: 'email'
            }
        })
        return {tags: tags.data, emails: people.data}
    }

    render() {
        return (<Layout>
                <Container textAlign='center'>
                    <h2>Statistics</h2>
                    <Divider/>
                    <Grid columns={3} divided>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as='h3'>Tag cloud</Header>
                                <TagCloud
                                    tags={this.props.tags}
                                    minSize={20}
                                    maxSize={100}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Container center>
                                    <Header as='h3'>Tag pie chart</Header>
                                    <PieChart width={250} height={250}>
                                        <Legend wrapperStyle={{fontSize: "10px"}}></Legend>
                                        <Pie data={this.props.tags} dataKey="count" nameKey="value" cx="50%" cy="50%"
                                             outerRadius={50} fill="#8884d8">

                                            {
                                                this.props.tags.map((entry, index) => <Cell
                                                    fill={colors[index % colors.length]}/>)
                                            }
                                        </Pie>
                                    </PieChart>
                                </Container>
                            </Grid.Column>
                            <Grid.Column center>
                                <Header as='h3'>Mailers funnel</Header>
                                <FunnelChart width={250} height={250} style={{marginRight: 50}}>
                                    <Tooltip/>
                                    <Funnel
                                        dataKey="count"
                                        nameKey="value"
                                        data={this.props.emails}
                                        isAnimationActive
                                    >
                                        <LabelList style={{fontSize: "10px"}} position="center" fill="#000"
                                                   stroke="none"
                                                   dataKey="value"/>
                                    </Funnel>
                                </FunnelChart>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Layout>
        );
    }
}

export default Stats;
