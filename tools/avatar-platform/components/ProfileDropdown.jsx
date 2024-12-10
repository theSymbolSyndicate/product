'use client';
import { signOutFromAccount } from '@/app/actions';
import { UserItem } from '@/components/UserItem';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';
export const ProfileDropdown = ({ user }) => {
	return (
		<Dropdown placement="bottom-end" backdrop="blur">
			<DropdownTrigger>
				<Avatar
					isBordered
					as="button"
					className="transition-transform"
					name={user.name}
					size="sm"
					src={user.avatar}
				/>
			</DropdownTrigger>
			<DropdownMenu aria-label="Profile Actions" variant="flat">
				<DropdownSection title="Account" showDivider>
					<DropdownItem key="profile" isReadOnly classNames="cursor-default">
						<UserItem user={user} />
					</DropdownItem>
				</DropdownSection>
				<DropdownItem key="logout" color="danger" onClick={signOutFromAccount}>
					Log Out
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};
