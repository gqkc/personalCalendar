import '../styles/globals.css'
import '../styles/calendar.css'
import "../styles/Home.module.css"
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Container} from "semantic-ui-react";
import Layout from "../components/layout";

/**
 * Handles the auth process and show app when authenticated
 * @returns {*}
 * @constructor
 */
function App({Component, pageProps}) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get(
            "access_token"
        );
        const PROXY=process.env.NEXT_PUBLIC_PROXY
        axios
            .get(PROXY, {
                headers: {
                    Authorization: "token " + token,
                },
            })
            .then((res) => {
                setUser(res.data);
                console.log(res.data)
                pageProps.user = res.data
                setLoggedIn(true);

            })
            .catch((error) => {
                console.log("error " + error);
            });
    }, []);
    const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
    const REDIRECT_URL = process.env.NEXT_PUBLIC_REDIRECT_URL
    const GITHUB_AUTHORIZE= `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`
    return (
        <div>
            <Layout>
                <Container textAlign="center">
                    <div className="App text-center container-fluid">
                        {!loggedIn ? (
                            <>
                                <img
                                    className="mb-4"
                                    src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                                    width="150"
                                ></img>
                                <h1 className="h3 mb-3 font-weight-normal">Sign in with GitHub</h1>
                                <Button
                                    primary
                                    href={GITHUB_AUTHORIZE}
                                >
                                    Sign in
                                </Button>
                            </>
                        ) : (
                            <>
                                <Component {...pageProps} />
                            </>
                        )}
                    </div>
                </Container>
            </Layout>
        </div>
    );
}

export default App;