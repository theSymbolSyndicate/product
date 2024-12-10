import { deleteCommentsByTaskId } from './CommentRepository';
import { connectToDatabase } from '..';
import TaskModel from '../models/TaskModel';
import { documentToObject, documentsToObjects, queryPageWithFilters } from '@/utils/db';

export const getTaskById = async id => {
	await connectToDatabase();
	const task = await TaskModel
		.findById(id)
		.populate('createdBy')
		.populate('assignees')
		.lean()
		.exec();

	return documentToObject(task);
};

export const getTasks = async (searchCriteria, filters) => {
	await connectToDatabase();
	const page = await queryPageWithFilters(TaskModel, searchCriteria, filters, ['createdBy', 'assignees']);

	return documentsToObjects(page);
};

export const createTask = async taskData => {
	await connectToDatabase();
	const task = new TaskModel(taskData);

	return task.save();
};

export const updateTask = async (taskId, taskData) => {
	await connectToDatabase();

	const updatedTask = await TaskModel.findByIdAndUpdate(
		{ _id: taskId },
		taskData,
		{ new: true }
	)
		.populate('createdBy')
		.populate('assignees')
		.lean()
		.exec();
	return documentToObject(updatedTask);
};

export const updateTaskAssignees = async (taskId, assigneeIds) => {
	await connectToDatabase();

	const updatedTask = await TaskModel.findByIdAndUpdate(
		taskId,
		{ assignees: assigneeIds },
		{ new: true }
	)
		.populate('createdBy')
		.populate('assignees')
		.lean()
		.exec();

	return documentToObject(updatedTask);
};

export const deleteTask = async id => {
	await connectToDatabase();
	await deleteCommentsByTaskId(id);

	return TaskModel.deleteOne({ _id: id }).exec();
};
