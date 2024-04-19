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
import Avatar from '@mui/joy/Avatar';

import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
const apiSetting = new Api();

function Gmail() {
    const { data: session, status } = useSession()

    useEffect(() => {
        console.log(session);
    }, [session]);

    return (

        <Card>
            <Box sx={{ display: 'flex' }}>

                <Typography level="title-lg"
                    startDecorator={<AlternateEmailIcon />}
                    sx={{ width: '20%' }}
                >Gmail</Typography>
                <Box sx={{ flexGrow: 1 }}>

                    {session ? (
                        <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', gap: 2 }}>
                            <Avatar variant="soft" size="lg"
                                src={(session?.user?.image as string) || ''}
                                alt={session?.user?.name || ''} />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Typography level="body-md" fontWeight={700} color="primary">{session?.user?.name}</Typography>
                                    <Link underline="always" color="danger" level="body-xs" fontWeight={600} 
                                        onClick={() => signOut()}>
                                        Sign out
                                    </Link>
                                </Box>
                                <Typography level="body-xs" >{session?.user?.email}</Typography>
                            </Box>
                        </Box>

                    ) : (
                        <Button color="danger"
                            onClick={() => {
                                signIn('google', { params: { access_type: 'offline' } });
                            }}
                        >
                            Connect Your Google Email
                        </Button>
                    )}
                </Box>
            </Box>
        </Card>


    );
}

export default Gmail;
