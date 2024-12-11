import { getCurrentUser } from '@/app/actions';
import { SignInWithGoogleButton } from '@/components/SignInButton';
import { createLocalUrl } from '@/utils/common';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default async function Home() {
	let isLoggedIn = false;

	try {
		const user = await getCurrentUser();
		isLoggedIn = !!user;
	}
	catch {}

	return (
		<div className="flex h-screen w-full items-center justify-center">
			{!isLoggedIn && (
				<div className="flex flex-col items-center gap-4">
					<h1 className="text-4xl">Welcome to Avatar Platform</h1>
					<SignInWithGoogleButton />
				</div>
			)}
			{isLoggedIn && (
				<Link href={createLocalUrl('/dashboard')}>
					<Button color="primary">Explore</Button>
				</Link>
			)}
		</div>
	);
}
