import { UserProps } from '@/utils/types';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { Dropdown } from '@mui/joy';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import AvatarWithStatus from './AvatarWithStatus';
import { toggleMessagesPane } from './utils';

type MessagesPaneHeaderProps = {
    sender: UserProps | undefined;
};

export default function MessagesPaneHeader(props: MessagesPaneHeaderProps) {
    const { sender } = props;
    const modelTypeLabel = () => {
        switch (sender?.source.value) {
            case 'none':
                return sender?.model_type?.name || '';
            case 'schema':
                return sender?.source?.schema?.name || '';
            case 'documents':
                return sender?.source?.document?.name || '未選擇';
            default:
                return '未選擇';
        }
    };

    const RowMenu = () => {
        return (
            <Dropdown>
                <MenuButton
                    slots={{ root: IconButton }}
                    slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
                >
                    <MoreVertRoundedIcon />
                </MenuButton>
                <Menu size="sm" sx={{ minWidth: 140 }}>
                    <MenuItem>
                        <EditIcon />
                        編輯資料
                    </MenuItem>
                    <Divider />
                    <MenuItem color="danger">
                        <DeleteIcon />
                        刪除
                    </MenuItem>
                </Menu>
            </Dropdown>
        );
    };

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.body'
            }}
            py={{ xs: 2, md: 2 }}
            px={{ xs: 1, md: 2 }}
        >
            <Stack direction="row" spacing={{ xs: 1, md: 2 }} alignItems="center">
                <IconButton
                    variant="plain"
                    color="neutral"
                    size="sm"
                    sx={{
                        display: { xs: 'inline-flex', sm: 'none' }
                    }}
                    onClick={() => toggleMessagesPane()}
                >
                    <ArrowBackIosNewRoundedIcon />
                </IconButton>
                <AvatarWithStatus src={sender?.avatar} />
                <div>
                    <Typography fontWeight="lg" fontSize="lg" component="h2" noWrap>
                        {sender?.name}
                    </Typography>
                    <Stack direction={'row'} spacing={1}>
                        <Typography level="body-sm">{sender?.source?.name} </Typography>
                        <Typography level="body-sm">
                            {sender?.source?.document?.storage_url && (
                                <a
                                    href={sender?.source?.document?.storage_url}
                                    target="_blank"
                                    className=" hover:underline text-blue-500"
                                >
                                    {modelTypeLabel()}
                                </a>
                            )}
                            {sender?.source?.schema && sender?.source?.schema?.has_label && (
                                <a
                                    href={`/document/extraction/${sender?.source?.schema?.label_id}/schema?schema_id=${sender?.source?.schema?.id}`}
                                    className=" hover:underline text-blue-500"
                                >
                                    {modelTypeLabel()}
                                </a>
                            )}
                            {sender?.source?.schema && !sender?.source?.schema?.has_label && (
                                <a
                                    href={`/document/extraction/documents/schema?schema_id=${sender?.source?.schema?.id}`}
                                    className=" hover:underline text-blue-500"
                                >
                                    {modelTypeLabel()}
                                </a>
                            )}
                        </Typography>
                    </Stack>
                </div>
            </Stack>
            <Stack spacing={1} direction="row" alignItems="center">
                <RowMenu />
            </Stack>
        </Stack>
    );
}
