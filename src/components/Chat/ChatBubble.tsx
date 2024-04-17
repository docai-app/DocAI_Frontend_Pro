import { getTransitionChartContent } from '@/utils/stringUtil';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import * as React from 'react';
import ChartView from './messages/ChartView';
import ContentView from './messages/ContentView';
import ImageView from './messages/ImageView';
import MarkmapView from './messages/MarkmapView';
import PdfView from './messages/PdfView';
import { MessageProps } from './types';

type ChatBubbleProps = MessageProps & {
    variant: 'sent' | 'received';
};

export default function ChatBubble(props: ChatBubbleProps) {
    const { content, variant, timestamp, attachment = undefined, sender, type } = props;
    const isSent = variant === 'sent';
    const [isHovered, setIsHovered] = React.useState<boolean>(false);
    const [isLiked, setIsLiked] = React.useState<boolean>(false);
    const [isCelebrated, setIsCelebrated] = React.useState<boolean>(false);
    return (
        <Box sx={{ maxWidth: '60%', minWidth: 'auto' }}>
            <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ mb: 0.25 }}>
                <Typography level="body-xs">{sender === 'You' ? sender : sender.name}</Typography>
                <Typography level="body-xs">{timestamp}</Typography>
            </Stack>
            {attachment ? (
                <Sheet
                    variant="outlined"
                    sx={{
                        px: 1.75,
                        py: 1.25,
                        borderRadius: 'lg',
                        borderTopRightRadius: isSent ? 0 : 'lg',
                        borderTopLeftRadius: isSent ? 'lg' : 0
                    }}
                >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar color="primary" size="lg">
                            <InsertDriveFileRoundedIcon />
                        </Avatar>
                        <div>
                            <Typography fontSize="sm">{attachment.fileName}</Typography>
                            <Typography level="body-sm">{attachment.size}</Typography>
                        </div>
                    </Stack>
                </Sheet>
            ) : (
                <Box
                    sx={{ position: 'relative' }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Sheet
                        color={isSent ? 'primary' : 'neutral'}
                        variant={isSent ? 'solid' : 'soft'}
                        sx={{
                            p: 1.25,
                            borderRadius: 'lg',
                            borderTopRightRadius: isSent ? 0 : 'lg',
                            borderTopLeftRadius: isSent ? 'lg' : 0,
                            backgroundColor: isSent
                                ? 'var(--joy-palette-primary-solidBg)'
                                : 'background.body'
                        }}
                    >
                        {(!type || type == 'text') && (
                            <ContentView content={content} isSent={isSent} />
                        )}
                        {type == 'image' && <ImageView content={content} />}
                        {type == 'pdf' && <PdfView content={content} />}
                        {type == 'markdown' && <MarkmapView value={content} />}

                        {type == 'chart' && (
                            <ChartView
                                content={getTransitionChartContent(content, 0)}
                                position={0}
                            />
                        )}
                    </Sheet>
                    {/* {(isHovered || isLiked || isCelebrated) && (
                        <Stack
                            direction="row"
                            justifyContent={isSent ? 'flex-end' : 'flex-start'}
                            spacing={0.5}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                p: 1.5,
                                ...(isSent
                                    ? {
                                        left: 0,
                                        transform: 'translate(-100%, -50%)',
                                    }
                                    : {
                                        right: 0,
                                        transform: 'translate(100%, -50%)',
                                    }),
                            }}
                        >
                            <IconButton
                                variant={isLiked ? 'soft' : 'plain'}
                                color={isLiked ? 'danger' : 'neutral'}
                                size="sm"
                                onClick={() => setIsLiked((prevState) => !prevState)}
                            >
                                {isLiked ? '❤️' : <FavoriteBorderIcon />}
                            </IconButton>
                            <IconButton
                                variant={isCelebrated ? 'soft' : 'plain'}
                                color={isCelebrated ? 'warning' : 'neutral'}
                                size="sm"
                                onClick={() => setIsCelebrated((prevState) => !prevState)}
                            >
                                {isCelebrated ? '🎉' : <CelebrationOutlinedIcon />}
                            </IconButton>
                        </Stack>
                    )} */}
                </Box>
            )}
        </Box>
    );
}
