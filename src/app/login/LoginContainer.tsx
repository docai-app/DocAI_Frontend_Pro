'use client';

import useAlert from '@/hooks/useAlert';
import axios from 'axios';
import useAxios from 'axios-hooks';
import { usePathname, useRouter } from 'next/navigation';
import React, { FormEventHandler, useCallback, useEffect } from 'react';
import Api from '../../apis';
import LoginView from './LoginView';

const apiSetting = new Api();

function LoginContainer() {
    const [data, setData] = React.useState();
    const { setAlert } = useAlert();
    const router = useRouter();
    const pathname = usePathname();

    const [{ data: signInData, loading: signInLoading, error: signInError }, signIn] = useAxios(
        {},
        { manual: true }
    );

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
            axios.defaults.headers.common['authorization'] = '';
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
                axios.defaults.headers.common['authorization'] = token
                if (pathname === '/login') router.push('/');
                else location.reload();
            } else {
                localStorage.removeItem('authorization');
                localStorage.removeItem('email');
                document.cookie = `authorization=null; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
            }
        },
        [router, signIn]
    );
    return (
        <LoginView
            {...{
                data,
                handleSignIn,
                signInLoading,
                signInError
            }}
        />
    );
}

export default LoginContainer;
