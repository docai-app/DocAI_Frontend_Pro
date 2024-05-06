import useAlert from '@/hooks/useAlert';
import { CircleStackIcon } from '@heroicons/react/24/outline';
import { KeyboardArrowRight } from '@mui/icons-material';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import { Box, ListItemButton, ListItemContent, ListItemDecorator, Typography } from '@mui/joy';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ViewProps {
    setTagId?: any;
}

export default function SearchSourceView(props: ViewProps) {
    const { setAlert } = useAlert();
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
        },
        {
            title: 'Schema',
            description: '3 files',
            icon: <CircleStackIcon />,
            onClick: () => {
                router.push('/smart_extraction_schema');
            }
        },
        {
            title: 'Website',
            description: '3 files',
            icon: <LanguageIcon />,
            onClick: () => {
                setAlert({
                    title: '新功能開發中，敬請期待！',
                    type: 'info'
                });
            }
        },
        {
            title: 'Google Drive',
            description: '3 files',
            icon: <AddToDriveIcon />,
            onClick: () => {
                setAlert({
                    title: '新功能開發中，敬請期待！',
                    type: 'info'
                });
            }
        }
    ]);

    const item = (item: any) => {
        return (
            <ListItem
                variant="outlined"
                sx={{
                    borderRadius: 'sm',
                    mb: 1
                }}
            >
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
