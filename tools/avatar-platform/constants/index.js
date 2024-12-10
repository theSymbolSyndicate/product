export const TaskStatus = {
	OPEN: 'OPEN',
	IN_PROGRESS: 'IN_PROGRESS',
	DONE: 'DONE',
	CLOSED: 'CLOSED'
};

export const UserRole = {
	USER: 'USER',
	DESIGNER: 'DESIGNER',
	ADMIN: 'ADMIN'
};

export const UserGroup = {
	ALL: [UserRole.ADMIN, UserRole.DESIGNER, UserRole.USER],
	CAN_MANAGE_TASK: [UserRole.ADMIN, UserRole.DESIGNER],
	CAN_VIEW_LIST_OF_USERS: [UserRole.ADMIN, UserRole.DESIGNER],
	ADMIN: [UserRole.ADMIN]
};
