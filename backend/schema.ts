import { Lists } from '.keystone/types';

import { User } from './schemas/UserSchema';
import { Request } from './schemas/RequestSchema';
import { Specialist } from './schemas/SpecialistSchema';
import { Department } from './schemas/DepartmentSchema';
import { Post } from './schemas/PostSchema';
import { Tag } from './schemas/TagSchema';

export const lists: Lists = {
	User,
	Request,
	Specialist,
	Department,
	Post,
    Tag
};