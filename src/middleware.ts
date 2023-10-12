import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
	const origin = request?.nextUrl?.origin
	const path = request?.nextUrl?.pathname

	if (path === "/") {
		return NextResponse.redirect(
			new URL("/project/4187fea8-baa1-4f04-ad4b-89cfe2590ce3", origin)
		)
	}

	return NextResponse.next()
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
