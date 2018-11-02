export const LISTDATA = 'LISTDATA';
export function setlistitemsinstore(listitems) {
    return {
        type: LISTDATA,
        listitems,
    };
}