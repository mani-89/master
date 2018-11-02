import { CHARTDATA, FORMATEDCHARTDATA, SELECTEDDAYS } from '../actions/ChartActions';
import { LISTDATA } from '../actions/TableActions';

const intitialstate = {
    serverdata: [],
    data: [],
    xaxisdates: 7,
    datakey: [],
    selecteddayvalue: 7,
    listitems: []
};

export default function reducer(state = intitialstate, action) {
    switch (action.type) {
        case CHARTDATA :
            return {
                ...state,
                serverdata: action.serverdata
            };
        case FORMATEDCHARTDATA:
            return {
                ...state,
                data: action.data,
                datakey: action.datakey,
            };
        case SELECTEDDAYS:
            return {
                ...state,
                selecteddayvalue: action.selecteddayvalue,
                xaxisdates: action.selecteddayvalue
            };
        case LISTDATA:
            return {
                ...state,
                listitems: action.listitems
            };
        default:
        return state;
    }
}