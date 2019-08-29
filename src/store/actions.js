import * as types from './actionTypes';


//dispatch
export const AddAppName = (appName) =>({
    type: types.APP_NAME,
    appName
})