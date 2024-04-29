'use client';

import { Skeleton, Stack } from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';

export default function LoaderView() {
    return (
        <>
            {Array.from({ length: 10 }).map((num, index) => (
                <List
                    key={index}
                    size="sm"
                    sx={{
                        '--ListItem-paddingX': 0
                    }}
                >
                    <ListItem
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'start'
                        }}
                    >
                        <ListItemContent
                            sx={{
                                display: 'flex',
                                gap: 2,
                                alignItems: 'start',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <ListItemDecorator>
                                    <Avatar size="sm">
                                        <Skeleton variant="overlay">
                                            <img
                                                alt=""
                                                src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                                            />
                                        </Skeleton>
                                    </Avatar>
                                </ListItemDecorator>
                                <div>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Typography level="body-sm">
                                            <Link
                                                level="title-sm"
                                                sx={{
                                                    fontWeight: 'bold',
                                                    color: 'black'
                                                }}
                                            >
                                                <Typography

                                                >
                                                    <Skeleton>
                                                        .......................................
                                                    </Skeleton>
                                                </Typography>
                                            </Link>
                                        </Typography>
                                        <Stack direction="row" spacing={1}>

                                        </Stack>
                                    </Box>
                                    <Typography level="body-xs" gutterBottom>
                                        <Skeleton>
                                            .......................................
                                        </Skeleton>
                                    </Typography>
                                </div>
                            </Box>
                        </ListItemContent>
                    </ListItem>
                    <ListDivider />
                </List>
            ))}
        </>)
}