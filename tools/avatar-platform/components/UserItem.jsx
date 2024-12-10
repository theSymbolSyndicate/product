import { User } from '@nextui-org/react';

export const UserItem = ({ user }) => {
	const formattedUser = user || {
		name: 'Deleted User'
	};

	return (
		<User
			avatarProps={{ src: formattedUser.avatar, name: formattedUser.name, size: 'sm' }}
			description={formattedUser.email}
			name={formattedUser.name}
		/>
	);
};
