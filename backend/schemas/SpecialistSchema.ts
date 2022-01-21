import { list } from '@keystone-6/core';
import { relationship, text, timestamp,} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';

export const Specialist = list({
    fields: {
        title: text({ validation: { isRequired: true }}),
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
        user: relationship({ ref: 'User.occupation' }),
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
        dateAdded: timestamp(),
    },

    ui: {
        listView: {
            initialColumns: ['user', 'departments'],
        },
    },
}) 