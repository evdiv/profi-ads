import { list } from '@keystone-6/core'
import { relationship, text} from '@keystone-6/core/fields'
import { document } from '@keystone-6/fields-document'
import { isSignedIn, rules } from '../access'


export const Specialist = list({
    access: {
        item: {
            create: isSignedIn,
            update: rules.canManageSpecialist,
            delete: rules.canManageSpecialist
        },
    },

    fields: {
        title: text({ validation: { isRequired: true }}),
        about: document({
            formatting: true,
            layouts: [
                [1, 1],
                [1, 1, 1],
                [2, 1],
                [1, 2],
                [1, 2, 1],
            ],
            dividers: true,
        }),

        user: relationship({ 
            ref: 'User.occupation', 
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
            ref: 'Department.specialists',
            ui: {
                displayMode: 'cards',
                cardFields: ['name'],
                inlineEdit: { fields: ['name'] },
                linkToItem: true,
                inlineConnect: true
            },
            many: true,
        }),
    },

    ui: {
        listView: {
            initialColumns: ['user', 'departments'],
        },
    },
}) 