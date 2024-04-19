import useAxios from 'axios-hooks';
import Api from '../../apis';
import { useRef } from 'react';
import useAlert from '../../hooks/useAlert';
import ErrorList from '../common/Widget/ErrorList';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Box, Breadcrumbs, Link, Typography, Chip, Card } from '@mui/joy';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';

import Stack from '@mui/joy/Stack';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import Skeleton from '@mui/joy/Skeleton';

import React, { useEffect, useState } from 'react';
import { useSession, SessionProvider } from 'next-auth/react';

const apiSetting = new Api();

function Gmail() {
    const { data: session } = useSession();

    useEffect(() => {
        console.log(session);
    }, [session]);

    return (
        <SessionProvider session={session}>
            <Card>
                {/* <div className="flex flex-col rounded-2xl bg-gray-100 px-12 py-6 border">
                <div className="flex flex-col">
                    <h2 className="text-slate-900 font-bold text-xl mb-6">連結你的外部電子郵件</h2>
                    <label className="flex flex-col gap-2">
                        <div>Gmail</div>
                        {session ? (
                            <a href="#" className="group block flex-shrink-0">
                                <div className="flex items-center">
                                    <div>
                                        <img
                                            className="inline-block h-9 w-9 rounded-full"
                                            src={(session?.user?.image as string) || ''}
                                            alt={session?.user?.name}
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                            {session?.user?.name}{' '}
                                            <span className="text-xs text-gray-500">
                                                {session?.user?.email}
                                            </span>
                                        </p>
                                        <p
                                            className="text-xs font-medium text-gray-500 group-hover:text-gray-700"
                                            onClick={() => signOut()}
                                        >
                                            Sign out
                                        </p>
                                    </div>
                                </div>
                            </a>
                        ) : (
                            <button
                                className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => {
                                    signIn('google', { params: { access_type: 'offline' } });
                                }}
                            >
                                Connect Your Google Email
                            </button>
                        )}
                    </label>
                </div>
            </div> */}
            </Card>
        </SessionProvider>

    );
}

export default Gmail;
