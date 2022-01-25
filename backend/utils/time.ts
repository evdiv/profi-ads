export const getCurrentTimeStamp = ({ operation, resolvedData }: { operation: string, resolvedData: any}) => {
    if (operation === 'create' || !resolvedData.publishedDate) {
        return new Date().toISOString();
    }
    return resolvedData.publishedDate;
}