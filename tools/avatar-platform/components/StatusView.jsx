'use client';
import { TaskStatus } from '@/constants';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { Chip } from '@nextui-org/react';
import { useEffect, useState } from 'react';

const statusColorMap = {
	[TaskStatus.DONE]: 'success',
	[TaskStatus.IN_PROGRESS]: 'warning',
	[TaskStatus.OPEN]: 'secondary',
	[TaskStatus.CLOSED]: 'danger'
};

const statusTextMap = {
	[TaskStatus.DONE]: 'Done',
	[TaskStatus.IN_PROGRESS]: 'In Progress',
	[TaskStatus.OPEN]: 'Open',
	[TaskStatus.CLOSED]: 'Closed'
};

const statusList = Object.values(TaskStatus);

const StatusChip = ({ status, as }) => {
	const color = statusColorMap[status];
	const text = statusTextMap[status];

	return (
		<Chip
			as={as}
			className="font-bold uppercase"
			color={color}
			size="sm"
			variant="flat"
		>
			{text}
		</Chip>
	);
};

export const StatusView = ({ status, isEditable, onChange }) => {
	const [selectedKeys, setSelectedKeys] = useState(new Set([]));

	const handleSelect = newSelectedKeys => {
		setSelectedKeys(newSelectedKeys);
		onChange(Array.from(newSelectedKeys)[0]);
	};

	useEffect(() => {
		const newSelectedKeys = new Set([status]);
		setSelectedKeys(newSelectedKeys);
	}, [status]);

	return (
		!isEditable ? (
			<StatusChip status={status} />
		) : (
			<Dropdown backdrop="blur">
				<DropdownTrigger>
					<button>
						<StatusChip status={status} />
					</button>
				</DropdownTrigger>
				<DropdownMenu
					aria-label="Assignees selection"
					variant="flat"
					closeOnSelect
					selectionMode="single"
					selectedKeys={selectedKeys}
					onSelectionChange={handleSelect}
				>
					{statusList.map(item => (
						<DropdownItem key={item}>
							<StatusChip status={item} />
						</DropdownItem>
					))}
				</DropdownMenu>
			</Dropdown>
		)
	);
};
