'use server';
import { Navigation } from './Navigation';
import { getCurrentUser } from '@/app/actions';
import { UserGroup } from '@/constants';
import { createLocalUrl } from '@/utils/common';

const ALL_MENU_ITEMS = [
	{ text: 'Admin', href: createLocalUrl('/admin'), roles: UserGroup.ADMIN },
	{ text: 'Dashboard', href: createLocalUrl('/dashboard'), roles: UserGroup.ALL }
];

export const Header = async () => {
	let user;
	try {
		user = await getCurrentUser();
	} catch {
		user = null;
	}

	const menuItems = ALL_MENU_ITEMS.filter(item => item.roles.includes(user?.role));

	return (
		<Navigation menuItems={menuItems} user={user} />
	);
};
