import { getAllUsersByRole } from '../actions';
import { UserTable } from '@/components/UserTable';

export const metadata = {
	name: 'Admin',
	description: 'Admin'
};

export default async function AdminPage() {
	const users = await getAllUsersByRole();

	return (
		<div className="flex w-full flex-col gap-4 py-4">
			<UserTable users={users} />
		</div>
	);
}
