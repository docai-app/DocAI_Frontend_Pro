'use client';

import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import * as React from 'react';
import './globals.css';

// const canUseDOM = typeof window !== 'undefined';
// const useIsomorphicLayoutEffect = canUseDOM ? React.useLayoutEffect : React.useEffect;


export default function RootLayout(props: { children: React.ReactNode }) {
    // const router = useRouter()
    // useIsomorphicLayoutEffect(() => {
    //     axios.defaults.headers.common['authorization'] =
    //         window.localStorage?.getItem('authorization') || '';
    //     axios.interceptors.response.use(
    //         (response) => response,
    //         (error) => {
    //             if (error.response?.status === 401) {
    //                 localStorage.removeItem('authorization');
    //                 localStorage.removeItem('email');
    //                 document.cookie = `authorization=null; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    //                 router.push('/login');
    //             }
    //             return Promise.reject(error);
    //         }
    //     );
    // }, [router]);

    return (
        <html lang="en">
            <body>
                <ThemeRegistry>{props.children}</ThemeRegistry>
            </body>
        </html>
    );
}
