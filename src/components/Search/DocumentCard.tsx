import { DocumentModel } from '@/models/Document';
import { Box, Typography } from '@mui/joy';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import Tooltip from '@mui/joy/Tooltip';
import moment from 'moment';

interface ViewProps {
    document: DocumentModel;
}

export default function DocumentCard(props: ViewProps) {
    const { document } = props;

    const dropdown = () => {
        return (
            <Dropdown>
                <MenuButton
                    variant="plain"
                    size="sm"
                    sx={{
                        maxWidth: '32px',
                        maxHeight: '32px',
                        borderRadius: '9999999px'
                    }}
                >
                    <IconButton component="span" variant="plain" color="neutral" size="sm">
                        <MoreVertRoundedIcon />
                    </IconButton>
                </MenuButton>
                <Menu
                    placement="bottom-end"
                    size="sm"
                    sx={{
                        zIndex: '99999',
                        p: 1,
                        gap: 1,
                        '--ListItem-radius': 'var(--joy-radius-sm)'
                    }}
                >
                    <MenuItem>
                        <EditRoundedIcon />
                        Rename file
                    </MenuItem>
                    <MenuItem>
                        <ShareRoundedIcon />
                        Share file
                    </MenuItem>
                    <MenuItem sx={{ textColor: 'danger.500' }}>
                        <DeleteRoundedIcon color="warning" />
                        Delete file
                    </MenuItem>
                </Menu>
            </Dropdown>
        );
    };
    return (
        <>
            <Card variant="outlined" size="sm" sx={{ margin: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ flex: 1 }}>
                        <Tooltip title={document.name} variant="solid">
                            <Typography
                                level="title-md"
                                sx={{
                                    color: 'black',
                                    width: 200,
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                <a
                                    href={document.storage_url}
                                    target={'_blank'}
                                    className=" hover:underline cursor-pointer "
                                >
                                    {document.name}
                                </a>
                            </Typography>
                        </Tooltip>
                        {/* <Typography level="body-sm">132.2MB</Typography> */}
                    </Box>
                    {dropdown()}
                </Box>
                <CardOverflow
                    sx={{
                        borderBottom: '1px solid',
                        borderTop: '1px solid',
                        borderColor: 'neutral.outlinedBorder'
                    }}
                >
                    <AspectRatio
                        ratio="16/9"
                        color="primary"
                        sx={{ borderRadius: 0 }}
                        objectFit="contain"
                        minHeight={250}
                    >
                        {document.storage_url && document.storage_url.trim().endsWith('.pdf') ? (
                            <object
                                className="w-full h-full object-center object-contain"
                                type="application/pdf"
                                data={document.storage_url + '#toolbar=0'}
                            >
                                <img
                                    src={
                                        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png'
                                    }
                                    alt="PDF file icon"
                                    className="w-full h-full object-contain object-center"
                                />
                            </object>
                        ) : (
                            <img
                                src={document.storage_url}
                                alt={document.name}
                                className="w-full h-full object-contain object-center"
                            />
                        )}
                    </AspectRatio>
                </CardOverflow>
                <Typography level="body-xs">
                    {moment(document.created_at).format('YYYY-MM-DD HH:mm')}
                </Typography>
            </Card>
        </>
    );
}
