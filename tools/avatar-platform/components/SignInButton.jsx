import { signInWithGoogle } from '@/app/actions';
import { Button } from '@nextui-org/react';
import { FaGoogle as GoogleIcon } from 'react-icons/fa';

export const SignInWithGoogleButton = () => {
	return (
		<form action={signInWithGoogle}>
			<Button type="submit" startContent={<GoogleIcon />}>
                Signin with Google
			</Button>
		</form>
	);
};
