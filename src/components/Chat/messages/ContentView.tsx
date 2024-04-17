import { Typography } from '@mui/joy';
import { useState } from 'react';

interface ViewProps {
    content: string;
    isSent: boolean;
}

export default function ContentView(props: ViewProps) {
    const { content, isSent } = props;
    const [showMore, setShowMore] = useState(false);

    return (
        <>
            <Typography
                level="body-sm"
                sx={{
                    color: isSent
                        ? 'var(--joy-palette-common-white)'
                        : 'var(--joy-palette-text-primary)',
                }}
            >
                {content.split('\n').map((item: string, index: number) => (
                    <p key={index}>{item}</p>
                ))}
            </Typography>
        </>
    );
}
