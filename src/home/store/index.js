import {configureStore} from './configureStore';


let storeInstance = null;

class Store{
    constructor(){
    }
    getInstance(){
        if(!storeInstance){
            storeInstance = configureStore({});
        }
        return storeInstance;
    }
}
export default new Store().getInstance();