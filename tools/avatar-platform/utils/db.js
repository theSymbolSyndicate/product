/* eslint-disable no-underscore-dangle */
export const queryPageWithFilters = async (Model, searchCriteria = {}, filters = {}, populateWith = []) => {
	const { pageNumber = 1, order = 'desc', orderBy = 'createdAt' } = searchCriteria;
	const sort = { [orderBy]: order === 'desc' ? -1 : 1 };

	let query = Model.find(filters);

	if (populateWith.length) {
		populateWith.forEach(populate => {
			query = query.populate(populate);
		});
	}

	if (searchCriteria.pageSize) {
		query = query
			.limit(searchCriteria.pageSize)
			.skip((pageNumber - 1) * searchCriteria.pageSize);
	}

	return query
		.sort(sort)
		.lean()
		.exec();
};

export const documentToObject = doc => {
	if (!doc)
		return null;

	const obj = { ...doc };

	if (obj._id)
		obj.id = obj._id.toString();

	if (obj.createdAt)
		obj.createdAt = obj.createdAt.toISOString();

	if (obj.updatedAt)
		obj.updatedAt = obj.updatedAt.toISOString();

	delete obj._id;
	delete obj.__v;

	Object.keys(obj).forEach(key => {
		if (Array.isArray(obj[key]))
			obj[key] = obj[key].map(documentToObject);
		else if (obj[key] && typeof obj[key] === 'object')
			obj[key] = documentToObject(obj[key]);
	});

	return obj;
};

export const documentsToObjects = docs => docs.map(documentToObject);
