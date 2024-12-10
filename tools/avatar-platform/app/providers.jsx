'use client';

import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';

export const Providers = ({ children }) => {
	const router = useRouter();

	return (
		<NextUIProvider navigate={router.push}>
			<SessionProvider>
				{children}
			</SessionProvider>
		</NextUIProvider>
	);
};
