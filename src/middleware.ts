import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
	const origin = request?.nextUrl?.origin
	const path = request?.nextUrl?.pathname

	return NextResponse.next()
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
