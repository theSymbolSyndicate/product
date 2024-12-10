import { connectToDatabase } from '..';
import UserModel from '../models/UserModel';
import { documentToObject, documentsToObjects, queryPageWithFilters } from '@/utils/db';

export const getUserByEmail = async email => {
	await connectToDatabase();

	const user = await UserModel
		.findOne({ email })
		.lean()
		.exec();

	return documentToObject(user);
};

export const getUsers = async (searchCriteria, filters) => {
	await connectToDatabase();
	const page = await queryPageWithFilters(UserModel, searchCriteria, filters);

	return documentsToObjects(page);
};

export const createUser = async userData => {
	await connectToDatabase();
	const user = new UserModel(userData);

	return user.save();
};

export const updateUser = async userData => {
	await connectToDatabase();

	return UserModel.findOneAndUpdate({ id: userData.id }, userData).exec();
};

export const deleteUser = async id => {
	await connectToDatabase();
};
