import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
// import GitHubProvider from "next-auth/providers/github";
import { NextApiRequest, NextApiResponse } from 'next';

const GOOGLE_AUTHORIZATION_URL =
    'https://accounts.google.com/o/oauth2/v2/auth?' +
    new URLSearchParams({
        scope: 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send email',
        prompt: 'consent',
        access_type: 'offline',
        response_type: 'code'
    });

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            // clientId: process.env.GOOGLE_CLIENT_ID as string,
            // clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            clientId: process.env.NEXT_PUBLIC_GOOGLE_GMAIL_READ_INCOMING_CLIENT_ID || '',
            clientSecret:
                process.env.NEXT_PUBLIC_GOOGLE_GMAIL_READ_INCOMING_CLIENT_SECRET || '',
            authorization: {
                params: {
                    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send email',
                    prompt: 'consent',
                    access_type: 'offline'
                },
                url: GOOGLE_AUTHORIZATION_URL
            }
        })
    ],
    secret: process.env.NEXT_PUBLIC_SECRET,
    session: {
        strategy: 'jwt'
    },
}


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };