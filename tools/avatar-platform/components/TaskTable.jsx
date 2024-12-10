'use client';
import { AssigneeView } from '@/components/AssigneeView';
import { StatusView } from '@/components/StatusView';
import { UserItem } from '@/components/UserItem';
import { createLocalUrl, timestampToText } from '@/utils/common';
import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const columns = [
	{ name: 'CREATED', uid: 'createdBy' },
	{ name: 'DATE', uid: 'createdAt' },
	{ name: 'ASSIGNEES', uid: 'assignees' },
	{ name: 'STATUS', uid: 'status' }
];

export const TaskTable = props => {
	const { initialTaskList } = props;

	const router = useRouter();
	const openTaskDetails = useCallback(taskId => {
		router.push(createLocalUrl(`/dashboard/${taskId}`));
	}, [router]);

	const renderCell = useCallback((row, columnKey) => {
		const cellValue = row[columnKey];

		switch (columnKey) {
		case 'createdBy':
			return <UserItem user={cellValue} />;
		case 'createdAt':
			return (
				<div className="flex flex-col">
					<p className="text-sm capitalize">
						{timestampToText(cellValue)}
					</p>
					<p className="text-sm capitalize text-default-400">
						{timestampToText(row.updatedAt)}
					</p>
				</div>
			);
		case 'assignees':
			return (
				<AssigneeView assignees={cellValue} />
			);
		case 'status':
			return (
				<StatusView status={cellValue} />
			);
		default:
			return `${cellValue}`;
		}
	}, []);

	return (
		<Table aria-label="Example table with custom cells">
			<TableHeader columns={columns}>
				{column => (
					<TableColumn key={column.uid} align="start">
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody items={initialTaskList}>
				{item => (
					<TableRow key={item.id} onClick={() => openTaskDetails(item.id)} className="cursor-pointer">
						{columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};
