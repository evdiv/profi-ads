import { list } from '@keystone-6/core'
import { text, relationship } from '@keystone-6/core/fields'
import { isAdmin } from '../access'

export const Tag = list({
    access: {
        operation: {
            create: isAdmin,
            update: isAdmin,
            delete: isAdmin,
        },
    },    
    ui: {
        isHidden: true,
    },
    fields: {
        name: text(),
        posts: relationship({ ref: 'Post.tags', many: true }),
    },
}) 