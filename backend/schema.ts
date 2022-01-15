import { list } from '@keystone-6/core';

import {
  text,
  relationship,
  password,
  timestamp,
  select,
} from '@keystone-6/core/fields';

import { document } from '@keystone-6/fields-document';
import { Lists } from '.keystone/types';

export const lists: Lists = {

	User: list({
		fields: {
		name: text({ validation: { isRequired: true } }),
		email: text({
			validation: { isRequired: true },
			isIndexed: 'unique',
			isFilterable: true,
		}),

		password: password({ validation: { isRequired: true } }),
		requests: relationship({ ref: 'Request.owner', many: true }),
		},

		ui: {
		listView: {
			initialColumns: ['name', 'requests'],
		},
		},
	}),





	Specialist: list({
		fields: {
			name: text({ validation: { isRequired: true } }),
			email: text({
				validation: { isRequired: true },
				isIndexed: 'unique',
				isFilterable: true,
			}),

			about: document({
				formatting: true,
				layouts: [
					[1, 1],
					[1, 1, 1],
					[2, 1],
					[1, 2],
					[1, 2, 1],
				],
				dividers: true,
			}),
			registrationDate: timestamp(),

			password: password({ validation: { isRequired: true } }),
			departments: relationship({
				ref: 'Department.specialists',
				ui: {
					displayMode: 'cards',
					cardFields: ['name'],
					inlineEdit: { fields: ['name'] },
					linkToItem: true,
					inlineConnect: true
				},
				many: true,
			}),
		},

		ui: {
			listView: {
				initialColumns: ['name', 'departments'],
			},
		},
	}),

  Post: list({
    fields: {
      title: text(),
      status: select({
        options: [
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
        ],
        defaultValue: 'draft',
        ui: {
          displayMode: 'segmented-control',
        },
      }),

      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      publishDate: timestamp(),
      author: relationship({
        ref: 'User.posts',
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email'],
          inlineEdit: { fields: ['name', 'email'] },
          linkToItem: true,
          inlineCreate: { fields: ['name', 'email'] },
        },
      }),

      tags: relationship({
        ref: 'Tag.posts',
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          inlineEdit: { fields: ['name'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name'] },
        },
        many: true,
      }),
    },
  }),

  Tag: list({
    ui: {
      isHidden: true,
    },
    fields: {
      name: text(),
      posts: relationship({ ref: 'Post.tags', many: true }),
    },
  }),


};
