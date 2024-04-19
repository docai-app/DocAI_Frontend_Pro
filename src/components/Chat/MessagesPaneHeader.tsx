import { UserProps } from '@/utils/types';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import IconButton from '@mui/joy/IconButton';
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
                <IconButton size="sm" variant="plain" color="neutral">
                    <MoreVertRoundedIcon />
                </IconButton>
            </Stack>
        </Stack>
    );
}
