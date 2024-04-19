// mark as client component
"use client";

import { SessionProvider } from "next-auth/react"
import { Session } from 'next-auth'
import React from 'react'

// const SessionWrapper = ({ children }: { children: React.ReactNode }) => {
//     return (
//         <SessionProvider >{children}</SessionProvider>
//     )
// }

const SessionWrapper = ({ children, session }: { children: React.ReactNode, session: any }) => {
    return (
        <SessionProvider session={session} >{children}</SessionProvider>
    )
}


export default SessionWrapper
