import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import React from 'react';
import './globals.css';

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ThemeRegistry>{props.children}</ThemeRegistry>
            </body>
        </html>
    );
}
