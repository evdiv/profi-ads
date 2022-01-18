import { list } from '@keystone-6/core';

import { text, relationship, password, timestamp,} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';

export const Specialist = list({
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
}) 