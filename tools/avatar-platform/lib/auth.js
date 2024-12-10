
import { createUser, getUserByEmail } from './db/repositories/UserRepository';
import { UserRole } from '@/constants';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [Google],
	callbacks: {
		async signIn({ user }) {
			try {
				const userRecord = await getUserByEmail(user.email);

				if (!userRecord) {
					await createUser({
						email: user.email,
						name: user.name,
						role: UserRole.USER
					});
				}
			} catch (error) {
				console.error(error);
			}

			return true;
		}
	}
});
