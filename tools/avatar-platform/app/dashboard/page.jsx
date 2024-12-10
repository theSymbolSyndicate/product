import { getTaskListByRole } from '@/app/actions';
import { TaskTable } from '@/components/TaskTable';
import { createLocalUrl } from '@/utils/common';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { FaPlus as AddIcon } from 'react-icons/fa';

export const metadata = {
	name: 'Dashboard',
	description: 'Dashboard'
};

export default async function DashboardPage() {
	const initialTaskList = await getTaskListByRole({ pageSize: 10 });

	return (
		<div className="flex w-full flex-col gap-4 py-4">
			<div className="flex w-full flex-row justify-between">
				<h2>Dashboard</h2>
				<Link href={createLocalUrl('/form')}>
					<Button color="primary" startContent={<AddIcon />}>Create Task</Button>
				</Link>
			</div>
			<TaskTable initialTaskList={initialTaskList} />
		</div>
	);
}
