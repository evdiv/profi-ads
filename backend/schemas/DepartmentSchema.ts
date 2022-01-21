import { list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';

export const Department = list({
    fields: {
        name: text({ validation: { isRequired: true } }),
        specialists: relationship({ ref: 'Specialist.departments', many: true }),
    },
    ui: {
        listView: {
            initialColumns: ['name'],
        },
    },
}) 