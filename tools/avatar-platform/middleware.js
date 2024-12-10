import { createLocalUrl } from '@/utils/common';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Middleware to protect routes that require authentication
export default async function middleware(req) {
	const protectedRoutes = [
		'/admin',
		'/dashboard',
		'/form'
	];
	const currentPath = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.some(route => currentPath.startsWith(route));

	// If the route is not protected, proceed
	if (!isProtectedRoute)
		return NextResponse.next();

	// If the user is authenticated, proceed
	const session = await getToken({ req, secret: process.env.AUTH_SECRET });
	if (session)
		return NextResponse.next();

	// If user is not authenticated, redirect to the home page
	const homePageUrl = createLocalUrl('/');
	return NextResponse.redirect(new URL(homePageUrl, req.url));
}
