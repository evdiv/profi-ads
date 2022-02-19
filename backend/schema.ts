import { Lists } from '.keystone/types';

import { User } from './schemas/UserSchema';
import { Job } from './schemas/JobSchema';
import { Response } from './schemas/ResponseSchema';
import { Specialist } from './schemas/SpecialistSchema';
import { Department } from './schemas/DepartmentSchema';
import { Post } from './schemas/PostSchema';
import { Tag } from './schemas/TagSchema';

export const lists: Lists = {
	User,
	Job,
	Response,
	Specialist,
	Department,
	Post,
    Tag
};