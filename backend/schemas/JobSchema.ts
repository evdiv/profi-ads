import { list } from '@keystone-6/core'
import {text, relationship, timestamp,} from '@keystone-6/core/fields'
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

        description: text({
            ui: {
                displayMode: 'textarea',
            },
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

        contractor: relationship({
            ref: 'User.completedOrders',
            many: false,
        }),

        departments: relationship({
            ref: 'Department.jobs',
            many: true,
        }),

        responses: relationship({
            ref: 'Response.job',
            many: true,
        }),
    },
}) 