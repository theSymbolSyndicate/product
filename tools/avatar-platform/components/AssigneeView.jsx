'use client';
import { UserItem } from '@/components/UserItem';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useEffect, useState } from 'react';

const AssigneeAvatarGroup = ({ assignees, isPlusButtonShown }) => {
	const plusButtonItem = { name: '+', as: 'button', id: 'button' };
	const list = [...assignees];

	if (isPlusButtonShown)
		list.push(plusButtonItem);

	return (
		<div className="flex items-center">
			{list.map(user => (
				<Avatar
					size="sm"
					src={user.avatar}
					name={user.name}
					key={user.id}
				/>
			))}
		</div>
	);
};

export const AssigneeView = ({ isEditable, assignees, userList, onChange }) => {
	const [selectedKeys, setSelectedKeys] = useState(new Set([]));

	const handleSelect = newSelectedKeys => {
		setSelectedKeys(newSelectedKeys);
		onChange(Array.from(newSelectedKeys));
	};

	useEffect(() => {
		const assigneeIds = new Set(assignees.map(user => user.id));
		setSelectedKeys(assigneeIds);
	}, [assignees]);

	return (
		!isEditable ? (
			<AssigneeAvatarGroup assignees={assignees} />
		) : (
			<Dropdown backdrop="blur">
				<DropdownTrigger>
					<button>
						<AssigneeAvatarGroup assignees={assignees} isPlusButtonShown />
					</button>
				</DropdownTrigger>
				<DropdownMenu
					aria-label="Assignees selection"
					variant="flat"
					closeOnSelect={false}
					selectionMode="multiple"
					selectedKeys={selectedKeys}
					onSelectionChange={handleSelect}
				>
					{userList.map(user => (
						<DropdownItem key={user.id}>
							<UserItem user={user} />
						</DropdownItem>
					))}
				</DropdownMenu>
			</Dropdown>
		)
	);
};
