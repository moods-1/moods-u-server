//HTTP Status codes
exports.OK = 200;
exports.SERVER_ERROR = 500;

// Response messages
exports.SUCCESS = 'Success';
exports.FAILED = 'Failed';

// Task states
exports.TASK_STATES = {
    COMPLETE: 'Complete',
    IN_PROGRESS: 'In Progress',
    TO_DO: 'To Do',
    DONE: 'Done',
}

exports.USER_ROLES = {
    ADMIN: 'admin',
    DEFAULT: 'default',
}

exports.DEFAULT_IMAGES = {
    AVATAR: 'https://res.cloudinary.com/dbh8oqteg/image/upload/v1693330922/e-courses/defaultAvatar_qmtd7v.png',
}
