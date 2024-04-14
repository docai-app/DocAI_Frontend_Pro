'use client';

import useAlert from '@/hooks/useAlert';
import React, { useEffect } from 'react';
import LoginView from './LoginView';

function LoginContainer() {
    const [data, setData] = React.useState();
    const { setAlert } = useAlert();

    useEffect(() => {
        console.log('login');
    }, []);
    return (
        <LoginView
            {...{
                data
            }}
        />
    );
}

export default LoginContainer;
