'use client';

import Api from '@/apis';
import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SettingView from './SettingView';
import { useSession, SessionProvider } from 'next-auth/react';

const apiSetting = new Api();

export interface ShowCurrentUser {
    success: boolean;
    user?: {
        id: string | null;
        date_of_birth: string | null;
        nickname: string | null;
        phone: string | null;
        position: string | null;
        sex: 0 | 1 | null;
    };
}

function SettingContainer() {
    const router = useRouter();
    const { data: session } = useSession();
    // const session = useState(Session);

    const [
        { data: currentUserData, loading: currentUserLoading, error: currentUserError },
        showCurrentUser
    ] = useAxios<ShowCurrentUser>(apiSetting.User.showCurrentUser(), { manual: true });

    useEffect(() => {
        showCurrentUser();
    }, []);

    // useEffect(() => {
    //     console.log(session);
    // }, [session]);

    return (
        // <SessionProvider>
        <SettingView
            {...{
                currentUserData,
                currentUserLoading,
                session
            }}
        />
        // </SessionProvider>

    );
}

export default SettingContainer;
