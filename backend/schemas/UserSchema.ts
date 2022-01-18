import { list } from '@keystone-6/core';

import {
    text,
    relationship,
    password,
    checkbox,
} from '@keystone-6/core/fields';

export const User = list({
    fields: {
        name: text({ validation: { isRequired: true } }),
        email: text({
            validation: { isRequired: true },
            isIndexed: 'unique',
            isFilterable: true,
        }),
        admin: checkbox({ defaultValue: false }),

        password: password({ validation: { isRequired: true } }),
        requests: relationship({ ref: 'Request.owner', many: true }),
        posts: relationship({ ref: 'Post.author', many: true }),
    },

    ui: {
        listView: {
            initialColumns: ['name', 'requests'],
        },
    },
}) 