import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export default async function middleware(
    req: NextRequest
): Promise<NextResponse> {
    const authorization = req.cookies.get('authorization');
    if (authorization || req.url.indexOf('/home') != -1) {
        return NextResponse.next();
    }

    const isOrdinalPath = req.nextUrl.pathname.search(/\./) == -1
    if (isOrdinalPath && req.nextUrl.pathname !== '/login') {
        return NextResponse.redirect(`${req.nextUrl.origin}/login`)
    }
    return NextResponse.next()

    // const { pathname, origin } = req.nextUrl;
    // const authorization = req.cookies.get('authorization');
    // if (authorization || req.url.indexOf('/home') != -1) {
    //     return NextResponse.next();
    // }
    // return NextResponse.redirect(new URL('/login', req.url))
}

// export const config = {
//     matcher: [
//         '/admin/:path*',
//     ],
// }