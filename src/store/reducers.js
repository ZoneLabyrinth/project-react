import * as types from './actionTypes';

const initialState = {
    appName: 'react-project',
};


export const AppStore = (state = initialState, action) => {
    switch (action.type) {
    case types.APP_NAME:
        return { ...state, appName: action.appName };

    default:
        return state;
    }
};
