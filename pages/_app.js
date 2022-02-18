import '../styles/globals.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button} from "semantic-ui-react";

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
        axios
            .get("http://localhost:8010/proxy/user", {
                headers: {
                    Authorization: "token " + token,
                },
            })
            .then((res) => {
                setUser(res.data);
                console.log(res.data)
                pageProps.user = res.data
                setLoggedIn(true);
                //localStorage.setItem("user", res.data);
                //localStorage.setItem("loggedin", true);


            })
            .catch((error) => {
                console.log("error " + error);
            });
    }, []);

    return (
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
                        href="https://github.com/login/oauth/authorize?client_id=d9be7a379a98b39717c4&redirect_uri=http://localhost:8081/oauth/redirect"
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
    );
}

export default App;