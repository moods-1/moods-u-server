//HTTP Status codes
exports.OK = 200;
exports.SERVER_ERROR = 500;
exports.USER_ERROR = 400;

// Response messages
exports.SUCCESS = 'Success';
exports.FAILED = 'Failed';

// Task states
exports.TASK_STATES = {
	COMPLETE: 'Complete',
	IN_PROGRESS: 'In Progress',
	TO_DO: 'To Do',
	DONE: 'Done',
};

exports.USER_ROLES = {
	DEFAULT: 'default',
};

exports.EMPLOYEE_ROLES = {
	ADMIN: 'admin',
	DEFAULT: 'default',
	MODERATOR: 'moderator',
};

exports.COMPANY_DEPARTMENTS = {
	FINANCE: 'Finance',
	HUMAN_RESOURCES: 'Human Resources',
	SUPPORT: 'Support',
	TEACHING: 'Teaching',
};

exports.DEFAULT_IMAGES = {
	AVATAR:
		'https://res.cloudinary.com/dbh8oqteg/image/upload/v1693330922/e-courses/defaultAvatar_qmtd7v.png',
};

exports.COMPANY_NAME = 'Moods-U Online';
