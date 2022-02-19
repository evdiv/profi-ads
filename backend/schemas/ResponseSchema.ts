import { list } from '@keystone-6/core'
import {text, relationship, timestamp, checkbox} from '@keystone-6/core/fields'
import { isProfi, rules } from '../access'
import { getCurrentTimeStamp } from '../utils/time'

export const Response = list({
    access: {
        item: {
            create: isProfi,
            update: rules.canManageSpecialist,
            delete: rules.canManageSpecialist
        },
    },
    fields: {
        description: text({
            validation: { isRequired: true },
            ui: {
                displayMode: 'textarea',
            },
        }),

        isAccepted: checkbox({}),

        publishedDate: timestamp({
            hooks: {
                resolveInput: getCurrentTimeStamp
            }
        }),    

        user: relationship({
            ref: 'User.responses',
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
        
        job: relationship({
            ref: 'Job.responses',
            many: false,
        }),
    },
}) 