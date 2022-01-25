import { Lists } from '.keystone/types';

import { User } from './schemas/UserSchema';
import { Job } from './schemas/JobSchema';
import { Specialist } from './schemas/SpecialistSchema';
import { Department } from './schemas/DepartmentSchema';
import { Post } from './schemas/PostSchema';
import { Tag } from './schemas/TagSchema';

export const lists: Lists = {
	User,
	Job,
	Specialist,
	Department,
	Post,
    Tag
};