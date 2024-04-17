import { KeyboardArrowRight } from '@mui/icons-material';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import { Box, ListItemButton, ListItemContent, ListItemDecorator, Typography } from '@mui/joy';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ViewProps {
    setTagId?: any;
}

export default function SearchSourceView(props: ViewProps) {
    const { setTagId } = props;
    const router = useRouter();

    const [sources] = useState([
        {
            title: 'Local Drive',
            description: '3 files',
            icon: <FolderOutlinedIcon />,
            onClick: () => {
                router.push('/drive');
            }
        }
        // {
        //     title: 'Website',
        //     description: '3 files',
        //     icon: <LanguageOutlinedIcon />,
        //     onClick: () => {
        //         console.log('title');
        //     }
        // }
    ]);

    const item = (item: any) => {
        return (
            <ListItem>
                <ListItemButton onClick={item?.onClick}>
                    <ListItemDecorator
                        sx={{
                            bgcolor: '#eee',
                            p: 1,
                            alignItems: 'center',
                            borderRadius: 'sm'
                        }}
                    >
                        {item?.icon}
                    </ListItemDecorator>
                    <ListItemContent
                        sx={{
                            ml: 1
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: 16,
                                color: 'black'
                            }}
                        >
                            {item?.title}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: 12,
                                color: 'GrayText'
                            }}
                        >
                            {item?.description}
                        </Typography>
                    </ListItemContent>
                    <KeyboardArrowRight />
                </ListItemButton>
            </ListItem>
        );
    };
    return (
        <>
            <Box width={'100%'} display={'flex'} marginTop={0}>
                <Box
                    m="auto"
                    sx={{
                        width: { xs: '100%', sm: '75%' }
                    }}
                >
                    <List sx={{}}>
                        {sources.map((source, index) => {
                            return <Box key={index}>{item(source)}</Box>;
                        })}
                    </List>
                </Box>
            </Box>
        </>
    );
}
