'use server';

import { formFields } from '@/config';
import { UserGroup, UserRole } from '@/constants';
import { auth, signIn, signOut } from '@/lib/auth';
import * as CommentRepository from '@/lib/db/repositories/CommentRepository';
import * as TaskRepository from '@/lib/db/repositories/TaskRepository';
import * as UserRepository from '@/lib/db/repositories/UserRepository';
import { createLocalUrl } from '@/utils/common';
import { verifySession, verifyUserId, verifyUserRole } from '@/utils/server';
import { redirect } from 'next/navigation';

export const signInWithGoogle = async () => {
	await signIn('google', { callbackUrl: createLocalUrl('/dashboard') });
};

export const signOutFromAccount = async () => {
	await signOut();
};

export const getCurrentUser = async () => {
	const session = await verifySession(auth);

	return UserRepository.getUserByEmail(session.user.email);
};

export const submitAvatarForm = async (prevState, data) => {
	const user = await getCurrentUser();
	verifyUserRole(user, UserGroup.ALL);

	const files = await data.getAll('files');
	const fileData = await files[0].arrayBuffer();
	const formDataEntries = await Promise.all(formFields.map(field => [field.name, data.get(field.name)]));
	const formData = Object.fromEntries(formDataEntries);

	await TaskRepository.createTask({
		createdBy: user.id,
		formData,
		referenceImages: []
	});

	redirect(createLocalUrl('/dashboard'));
};

export const getAllUsersByRole = async role => {
	const user = await getCurrentUser();
	verifyUserRole(user, UserGroup.CAN_VIEW_LIST_OF_USERS);

	const filter = role ? { role } : undefined;

	return UserRepository.getUsers({}, filter);
};

export const getTaskListByRole = async searchCriteria => {
	const user = await getCurrentUser();
	verifyUserRole(user, UserGroup.ALL);
	let filter;

	if (user.role === UserRole.USER)
		filter = { createdBy: user.id };

	return TaskRepository.getTasks(searchCriteria, filter);
};

export const fetchTask = async id => {
	const user = await getCurrentUser();
	verifyUserRole(user, UserGroup.ALL);

	return TaskRepository.getTaskById(id);
};

export const deleteTask = async taskId => {
	const user = await getCurrentUser();
	verifyUserRole(user, UserGroup.ALL);

	const isUserAllowedToDeleteAnyTask = UserGroup.CAN_MANAGE_TASK.includes(user.role);
	if (isUserAllowedToDeleteAnyTask)
		return TaskRepository.deleteTask(taskId);

	const task = await TaskRepository.getTaskById(taskId);
	const isUserTaskCreator = user.id === task.createdBy.id;

	if (isUserTaskCreator)
		return TaskRepository.deleteTask(taskId);

	throw new Error('User is not allowed to delete this task');
};

export const changeTaskAssignees = async (taskId, assigneeIds) => {
	const user = await getCurrentUser();
	verifyUserRole(user, UserGroup.CAN_MANAGE_TASK);

	const updatedTask = await TaskRepository.updateTask(taskId, { assignees: assigneeIds });

	return updatedTask;
};

export const changeTaskStatus = async (taskId, status) => {
	const user = await getCurrentUser();
	verifyUserRole(user, UserGroup.CAN_MANAGE_TASK);

	const updatedTask = await TaskRepository.updateTask(taskId, { status });

	return updatedTask;
};

export const createTaskComment = async (taskId, commentText) => {
	const user = await getCurrentUser();
	verifyUserRole(user, UserGroup.ALL);

	const commentData = {
		createdBy: user.id,
		taskId,
		text: commentText
	};

	await CommentRepository.createComment(commentData);
};

export const getTaskComments = async taskId => {
	const user = await getCurrentUser();
	verifyUserRole(user, UserGroup.ALL);

	return CommentRepository.getComments({order: 'asc'}, { taskId });
};

export const deleteComment = async commentId => {
	const user = await getCurrentUser();
	verifyUserRole(user, UserGroup.ALL);

	const comment = await CommentRepository.getCommentById(commentId);
	verifyUserId(user, comment.createdBy.id);

	await CommentRepository.deleteComment(commentId);
};
