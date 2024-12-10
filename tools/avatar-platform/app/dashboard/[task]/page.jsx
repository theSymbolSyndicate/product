import { changeTaskAssignees, changeTaskStatus, createTaskComment, deleteComment, deleteTask, fetchTask, getAllUsersByRole, getCurrentUser, getTaskComments } from '@/app/actions';
import { CommentSection } from '@/components/CommentSection';
import { TaskDetails } from '@/components/TaskDetails';
import { UserItem } from '@/components/UserItem';
import { UserGroup, UserRole } from '@/constants';
import { createLocalUrl } from '@/utils/common';
import { Button, Card, CardBody, Divider } from '@nextui-org/react';
import { notFound, redirect } from 'next/navigation';
import { MdDelete } from 'react-icons/md';

export const metadata = {
	name: 'Task',
	description: 'Task'
};

export default async function TaskPage({ params }) {
	const taskId = (await params).task;
	const task = await fetchTask(taskId);

	if (!task)
		return notFound();

	let userList;
	try {
		userList = await getAllUsersByRole(UserRole.DESIGNER);
	} catch {
		userList = [];
	}

	const comments = await getTaskComments(taskId);
	const user = await getCurrentUser();
	const isUserCanManageTask = UserGroup.CAN_MANAGE_TASK.includes(user.role);


	const handleAssigneeSelection = async assignees => {
		'use server';
		await changeTaskAssignees(taskId, assignees);
	};
	const handleStatusChange = async status => {
		'use server';
		await changeTaskStatus(taskId, status);
	};
	const handleDeleteTask = async () => {
		'use server';
		await deleteTask(taskId);
		redirect(createLocalUrl('/dashboard'));
	};
	const handleCommentsRefresh = async () => {
		'use server';
		return getTaskComments(taskId);
	};
	const handleCommentPost = async comment => {
		'use server';
		return createTaskComment(taskId, comment);
	};
	const handleTaskRefresh = async () => {
		'use server';
		return fetchTask(taskId);
	};

	return (
		<div className="flex w-full flex-col items-center gap-4 py-4">
			<div className="flex w-full flex-row gap-4 md:max-w-xl">
				<Card className="flex-1">
					<CardBody className="flex w-full flex-col items-start gap-4 p-4">
						<div className="flex w-full flex-row justify-between">
							<UserItem user={task.createdBy} />
							<Button
								color="danger"
								variant="flat"
								startContent={<MdDelete />}
								size="sm"
								onClick={handleDeleteTask}
							>
								Delete Task
							</Button>
						</div>
						<Divider />
						<TaskDetails
							initialTaskData={task}
							isManageable={isUserCanManageTask}
							fetchTask={handleTaskRefresh}
							userList={userList}
							changeTaskAssignees={handleAssigneeSelection}
							changeTaskStatus={handleStatusChange}
						/>
						<Divider />
						<h2 className="text-xl">Comments</h2>
						<CommentSection
							user={user}
							initialComments={comments}
							fetchComments={handleCommentsRefresh}
							postComment={handleCommentPost}
							deleteComment={deleteComment}
						/>
					</CardBody>
				</Card>
			</div>
		</div>
	);
}
