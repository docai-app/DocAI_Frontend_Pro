'use client';

import React from "react";
import HomeView from "./HomeView";

function HomeContainer() {
    const [data, setData] = React.useState();
    return (
        <HomeView
            {...{
                data
            }}
        />
    );
}

export default HomeContainer;