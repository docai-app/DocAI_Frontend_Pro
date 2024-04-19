import { Box, Typography } from '@mui/joy';

interface ViewProps {
    content: string;
    isSent: boolean;
}

export default function ContentView(props: ViewProps) {
    const { content, isSent } = props;
    return (
        <>
            <Box>
                {content?.split('\n').map((item: string, index: number) => (
                    <Typography
                        key={index}
                        sx={{
                            color: isSent
                                ? 'var(--joy-palette-common-white)'
                                : 'var(--joy-palette-text-primary)'
                        }}
                    >
                        {item}
                    </Typography>
                ))}
            </Box>
        </>
    );
}
