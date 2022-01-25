import { list } from '@keystone-6/core'
import { text, relationship, password, checkbox, timestamp } from '@keystone-6/core/fields'
import { isAdmin, isCurrentUser, rules } from '../access'
import { getCurrentTimeStamp } from '../utils/time'

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

        publishedDate: timestamp({
            hooks: {
                resolveInput: getCurrentTimeStamp
            }
        }),

        posts: relationship({ 
            ref: 'Post.author', 
            many: true 
        }),

        occupation: relationship({ 
            ref: 'Specialist.user',
            many: false,
        }),

        jobs: relationship({
            ref: 'Job.user',
            many: true,
        })
    },

    ui: {
        listView: {
            initialColumns: ['name', 'occupation'],
        },
    },
}) 