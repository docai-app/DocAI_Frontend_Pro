'use client';

import React from "react";
import LoginView from "./LoginView";

function LoginContainer() {
    const [data, setData] = React.useState();
    return (
        <LoginView
            {...{
                data
            }}
        />
    );
}

export default LoginContainer;