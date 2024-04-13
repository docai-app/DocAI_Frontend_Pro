import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import * as React from 'react';
import './globals.css';
export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app'
};

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ThemeRegistry>{props.children}</ThemeRegistry>
            </body>
        </html>
    );
}
