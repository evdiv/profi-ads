import { list } from '@keystone-6/core'
import { text, relationship, password, checkbox } from '@keystone-6/core/fields'
import { isAdmin, isCurrentUser, rules } from '../access'

export const User = list({
    access: {
        item: {
            update: rules.canManageUser,
            delete: rules.canManageUser
        },
    },
    fields: {
        name: text({ validation: { isRequired: true } }),

        email: text({
            validation: { isRequired: true },
            isIndexed: 'unique',
            isFilterable: true,
            access: { read: rules.canManageUser }
        }),

        admin: checkbox({ 
            defaultValue: false,
            access: {
                read: isAdmin,
                update: isAdmin,
            }
        }),

        password: password({ 
            validation: { isRequired: true } ,
            access: {
                read: rules.canManageUser,
                update: isCurrentUser,
            }
        }),
        requests: relationship({ ref: 'Request.owner', many: true }),
        posts: relationship({ ref: 'Post.author', many: true }),
        occupation: relationship({ ref: 'Specialist.user'})
    },

    ui: {
        listView: {
            initialColumns: ['name', 'requests', 'occupation'],
        },
    },
}) 