import { connectToDatabase } from '..';
import CommentModel from '../models/CommentModel';
import { documentToObject, documentsToObjects, queryPageWithFilters } from '@/utils/db';

export const getCommentById = async id => {
	await connectToDatabase();
	const comment = await CommentModel
		.findById(id)
		.populate('createdBy')
		.lean()
		.exec();

	return documentToObject(comment);
};

export const getComments = async (searchCriteria, filters) => {
	await connectToDatabase();
	const page = await queryPageWithFilters(CommentModel, searchCriteria, filters, ['createdBy']);

	return documentsToObjects(page);
};

export const createComment = async commentData => {
	await connectToDatabase();
	const comment = new CommentModel(commentData);

	return comment.save();
};

export const deleteComment = async id => {
	await connectToDatabase();

	return CommentModel.deleteOne({ _id: id }).exec();
};

export const deleteCommentsByTaskId = async taskId => {
	await connectToDatabase();

	return CommentModel.deleteMany({ taskId }).exec();
};
