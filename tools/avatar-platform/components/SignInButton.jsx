import { signInWithGoogle } from '@/app/actions';
import { Button } from '@nextui-org/react';
import { FaGoogle } from 'react-icons/fa';

export const SignInWithGoogleButton = () => {
	return (
		<form action={signInWithGoogle}>
			<Button type="submit" startContent={<FaGoogle />}>
                Signin with Google
			</Button>
		</form>
	);
};
