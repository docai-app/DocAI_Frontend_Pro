'use client';

import useAlert from '@/hooks/useAlert';
import React, { FormEventHandler, useCallback, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useAxios from 'axios-hooks';
import LoginView from './LoginView';
import Api from '../../apis';

const apiSetting = new Api();


function LoginContainer() {
    const [data, setData] = React.useState();
    const { setAlert } = useAlert();
    const router = useRouter();

    const [{ data: signInData, loading: signInLoading, error: signInError }, signIn] = useAxios(
        {}, { manual: true }
    )

    useEffect(() => {
        localStorage.removeItem('authorization');
        localStorage.removeItem('email');
        document.cookie = `authorization=null; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    }, []);

    const handleSignIn: FormEventHandler<HTMLFormElement> = useCallback(
        async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
            const remember = formData.get('persistent');

            const res = await signIn(apiSetting.Authorization.signIn(email, password));
            if (res.data.success) {
                const token = res.headers.authorization;
                localStorage.setItem('authorization', token);
                localStorage.setItem('email', email);
                if (remember) {
                    const expiryDate = 'Fri, 31 Dec 9999 23:59:59 GMT'; // to be updated so that this can be dynamic
                    document.cookie = `authorization=${escape(token)}; expires=${expiryDate}`;
                } else {
                    document.cookie = `authorization=${escape(token)}`;
                }
                if (usePathname() === '/login') router.push;
                else router.refresh();
            } else {
                localStorage.removeItem('authorization');
                localStorage.removeItem('email');
                document.cookie = `authorization=null; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
            }
        }, [router, signIn]
    )
    return (
        <LoginView
            {...{
                data,
                handleSignIn
            }}
        />
    );
}

export default LoginContainer;
