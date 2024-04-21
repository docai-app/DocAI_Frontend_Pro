import { UserProps } from '@/utils/types';
import { Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import moment from 'moment';
import AvatarWithStatus from './AvatarWithStatus';

interface ViewProps {
    sender?: UserProps;
}

export default function WritingView(props: ViewProps) {
    const { sender } = props;
    return (
        <Stack direction="row" spacing={1} width={'100%'} flexDirection={'row'}>
            <AvatarWithStatus src={''} />
            <Box sx={{ maxWidth: '60%', minWidth: 'auto' }}>
                <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ mb: 0.25 }}>
                    <Typography level="body-xs">{sender?.name}</Typography>
                    <Typography level="body-xs">{moment().format('MM-DD HH:mm')}</Typography>
                </Stack>

                <Box sx={{ position: 'relative' }}>
                    <Sheet
                        color={'primary'}
                        variant={'soft'}
                        sx={{
                            p: 1.25,
                            borderRadius: 'lg',
                            borderTopRightRadius: 'lg',
                            borderTopLeftRadius: 0,
                            backgroundColor: 'background.body'
                        }}
                    >
                        {'...'}
                    </Sheet>
                </Box>
            </Box>
        </Stack>
    );
}
