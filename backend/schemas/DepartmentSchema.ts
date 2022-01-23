import { list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';
import { isAdmin } from '../access'

export const Department = list({
    access: {
        operation: {
            create: isAdmin,
            update: isAdmin,
            delete: isAdmin,
        },
    },
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