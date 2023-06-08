import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export const formatDate = (date: string) => {
    console.log(date);
    return formatDistanceToNow(new Date(date), { addSuffix: true });
};
