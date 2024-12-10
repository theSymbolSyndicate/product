'use client';

import { UserItem } from './UserItem';
import { UserRole } from '@/constants';
import { timestampToText } from '@/utils/common';
import { useTableFilter, useTableSearch, useTableSort } from '@/utils/hooks';
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow
} from '@nextui-org/react';
import { useCallback, useMemo, useState } from 'react';
import { BsThreeDotsVertical as VerticalDotsIcon } from 'react-icons/bs';
import { FaChevronDown as ChevronDownIcon } from 'react-icons/fa6';
import { GoPlusCircle as PlusIcon } from 'react-icons/go';
import { MdSearch as SearchIcon } from 'react-icons/md';

const columns = [
	{ name: 'NAME', uid: 'name', sortable: true },
	{ name: 'ROLE', uid: 'role', sortable: true },
	{ name: 'CREATED / UPDATED', uid: 'createdAt' },
	{ name: 'ACTIONS', uid: 'actions' }
];

const roleOptions = Object.values(UserRole).map(role => ({
	uid: role,
	name: role
}));

export const UserTable = ({ users }) => {
	const [filteredUsersByName, filterByNameValue, setFilterByNameValue] = useTableSearch(users, 'name', '');
	const [filteredUsersByRole, filterByRoleValue, setFilterByRoleValue] = useTableFilter(filteredUsersByName, 'role', '');
	const [sortDescriptor, setSortDescriptor] = useState({
		column: 'createdAt',
		direction: 'ascending'
	});
	const sortedItems = useTableSort(filteredUsersByRole, sortDescriptor);

	const renderCell = useCallback((user, columnKey) => {
		const cellValue = user[columnKey];

		switch (columnKey) {
		case 'name':
			return <UserItem user={user} />;
		case 'role':
			return <p className="text-bold text-small capitalize">{cellValue}</p>;
		case 'createdAt':
			return (
				<div className="flex flex-col">
					<p className="text-bold text-sm capitalize">
						{timestampToText(cellValue)}
					</p>
					<p className="text-bold text-sm capitalize text-default-400">
						{timestampToText(user.updatedAt)}
					</p>
				</div>
			);
		case 'actions':
			return (
				<div className="relative flex items-center justify-end gap-2">
					<Dropdown>
						<DropdownTrigger>
							<Button isIconOnly size="sm" variant="light">
								<VerticalDotsIcon className="text-default-300" />
							</Button>
						</DropdownTrigger>
						<DropdownMenu>
							<DropdownItem>Edit</DropdownItem>
							<DropdownItem>Delete</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
			);
		default:
			return cellValue;
		}
	}, []);

	const onSearchChange = useCallback(value => {
		setFilterByNameValue(value || '');
	}, []);

	const topContent = useMemo(() => {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex items-end justify-between gap-3">
					<Input
						size="sm"
						isClearable
						className="w-full sm:max-w-[44%]"
						placeholder="Search by name..."
						startContent={<SearchIcon />}
						value={filterByNameValue}
						onClear={onSearchChange}
						onValueChange={onSearchChange}
					/>
					<div className="flex gap-3">
						<Dropdown>
							<DropdownTrigger className="hidden sm:flex">
								<Button endContent={<ChevronDownIcon className="text-small" />} variant="flat" size="sm">
									Role
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								disallowEmptySelection
								aria-label="Table Columns"
								closeOnSelect={false}
								selectedKeys={filterByRoleValue}
								selectionMode="single"
								onSelectionChange={setFilterByRoleValue}
							>
								{roleOptions.map(role => (
									<DropdownItem key={role.uid} className="capitalize">
										{role.name}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
						<Button color="primary" size="sm" endContent={<PlusIcon />}>
							Add New
						</Button>
					</div>
				</div>
			</div>
		);
	}, [
		filterByNameValue,
		filterByRoleValue,
		users,
		onSearchChange
	]);

	return (
		<Table
			aria-label="Example table with custom cells, pagination and sorting"
			isHeaderSticky
			bottomContentPlacement="outside"
			sortDescriptor={sortDescriptor}
			topContent={topContent}
			topContentPlacement="outside"
			onSortChange={setSortDescriptor}
		>
			<TableHeader columns={columns}>
				{column => (
					<TableColumn
						key={column.uid}
						align={column.uid === 'actions' ? 'center' : 'start'}
						allowsSorting={column.sortable}
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody emptyContent={'No users found'} items={sortedItems}>
				{item => (
					<TableRow key={item.id}>
						{columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};
