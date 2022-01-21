import { list } from '@keystone-6/core';
import {text, relationship, timestamp,} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';

export const Request = list({
    fields: {
        title: text(),
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
        owner: relationship({
            ref: 'User.requests',
            ui: {
                displayMode: 'cards',
                cardFields: ['name', 'email'],
                linkToItem: true,
            },
        }),
    },
}) 