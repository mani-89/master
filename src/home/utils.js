
function getBasePath(){
    try{
        let scriptElements = document.getElementsByTagName('script');
        for (let i = 0; i < scriptElements.length; i++) {
            let script = scriptElements[i];
            if (script.getAttribute('src') && script.getAttribute('src').indexOf('react.js') > 0) {
                scriptPath = script.getAttribute('src');
                break;
            }
        }
        let scriptPath = scriptPath.substring(0, scriptPath.lastIndexOf("/ReactUI/dist/js/"));
        return scriptPath;
    }catch(err){
        return "/";
    }
}
/*
function getBasePath(){   
    if(process.env.NODE_ENV == "production"){
         /*eslint-disable no-undef 
        return GlobalVars.AppURL; 
    }
    return "";
}*/
export let useMockApi = window.useServerApi ? false : true;

export let apiPath = getBasePath();
if(process.env.NODE_ENV == "production"){
    useMockApi = false;
    apiPath = getBasePath();
}

export const basePath =  getBasePath();

export const navigateTo = (router, path, params) =>{
    router.push({
        pathname: path,
        query:{
            qsparam: params
        }
    });
};