import { list } from '@keystone-6/core';
import { text, relationship, timestamp, select } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import { isAdmin } from '../access'

export const Post = list({
    access: {
        operation: {
            create: isAdmin,
            update: isAdmin,
            delete: isAdmin,
        }
    },
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
}) 