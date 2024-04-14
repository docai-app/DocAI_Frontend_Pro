'use client';

import Api from '@/apis';
import useAlert from '@/hooks/useAlert';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import HomeView from './HomeView';

const apiSetting = new Api();

function HomeContainer() {
    const [data, setData] = React.useState();
    const { setAlert } = useAlert();
    const router = useRouter();

    const [{ data: getAllLabelsData, error: getAllLabelsError }, getAllLabels] = useAxios(
        apiSetting.Tag.getAllTags(),
        { manual: true }
    );

    useEffect(() => {
        console.log('home');
        // setAlert({ title: 'success', type: 'error' })
        // gatTags()
        return () => {};
    }, [router]);

    const gatTags = () => {
        getAllLabels().then((res) => {
            console.log(res.data);
        });
    };
    return (
        <HomeView
            {...{
                data
            }}
        />
    );
}

export default HomeContainer;
