import { list } from '@keystone-6/core'
import {text, relationship, timestamp,} from '@keystone-6/core/fields'
import { document } from '@keystone-6/fields-document'
import { isSignedIn, rules } from '../access'
import { getCurrentTimeStamp } from '../utils/time'

export const Job = list({
    access: {
        item: {
            create: isSignedIn,
            update: rules.canManageJob,
            delete: rules.canManageJob
        },
    },
    fields: {
        title: text({ validation: { isRequired: true } }),

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

        publishedDate: timestamp({
            hooks: {
                resolveInput: getCurrentTimeStamp
            }
        }),    

        user: relationship({
            ref: 'User.jobs',
            many: false,
            hooks: {
                resolveInput: ({ context, resolvedData }) => {
                    if (context.session?.data.admin) {
                        return resolvedData.user
                    }
                    const userId = parseInt(context.session?.itemId)
                    return { connect: { id: userId } }
                }
            },
        }),
        
        departments: relationship({
            ref: 'Department.jobs',
            ui: {
                displayMode: 'cards',
                cardFields: ['name'],
                linkToItem: true,
                inlineConnect: true
            },
            many: true,
        }),

    },
}) 