type SessionContext = {
    session?: {
        itemId: string,
        data: {
            name: string
            admin: boolean
            occupation: {
                id: number
            }
        };
    };
};

type ItemContext = { item: any } & SessionContext

export const isSignedIn = ({ session }: SessionContext) => {
    return !!session
};

export const isAdmin = ({ session }: SessionContext) => {
    return !!session?.data.admin
};

export const isCurrentUser = ({ session, item }: ItemContext) => {
    return session?.itemId === item.id.toString()
}

export const isProfi = ({ session }: SessionContext) => {
    return !!session?.data.occupation?.id
};

export const isJobOwner = ({ session, item }: ItemContext) => {
    return session?.itemId === item.userId.toString()
};

export const isCurrentSpecialist = ({ session, item }: ItemContext) => {
    return session?.itemId === item.userId.toString()
};

export const rules = {
    canManageUser: ({ session, item }: ItemContext) => {
        if (isAdmin({ session })) return true
        return isCurrentUser({ session, item })
    },

    canManageJob: ({ session, item }: ItemContext) => {
        if (isAdmin({ session })) return true
        return isJobOwner({ session, item })
    },

    canManageSpecialist: ({ session, item }: ItemContext) => {
        if (isAdmin({ session })) return true
        if (!isProfi({ session })) return false
        return isCurrentSpecialist({ session, item })
    },
};