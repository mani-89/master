export const CHARTDATA = 'CHARTDATA';
export function setdatainstore(serverdata) {
    return {
        type: CHARTDATA,
        serverdata,
    };
}
export const FORMATEDCHARTDATA = 'FORMATEDCHARTDATA';
export function setformateddatainstore(data,datakey) {
    return {
        type: FORMATEDCHARTDATA,
        data,
        datakey
    };
}

export const SELECTEDDAYS = 'SELECTEDDAYS';
export function selecteddayvalueinstore(selecteddayvalue) {
    return {
        type: SELECTEDDAYS,
        selecteddayvalue,
    };
}


