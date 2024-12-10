export const verifySession = async auth => {
	const session = await auth();

	if (!session)
		throw new Error('Not authorized');

	return session;
};

export const verifyUserRole = (user, allowedRoles) => {
	if (!user || !allowedRoles.includes(user.role))
		throw new Error('Not authorized');

	return user;
};

export const verifyUserId = (user, userId) => {
	if (!user || user.id !== userId)
		throw new Error('Not authorized');

	return user;
};
