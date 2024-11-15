'use server';

import { signIn, signOut } from '@/lib/auth';

export const signInWithGoogle = async () => {
	await signIn('google');
};

export const signOutFromAccount = async () => {
	await signOut();
};
