import { wsConn } from "..";

const initialStore = {
    user: null,
}

export const auth = (store = initialStore, action) => {
    switch(action.type){
        case "LOGIN":
            wsConn.activateNotifications(action.user)
            store = {
                ...store,
                user: action.user
            }
        break;
        case "LOGOUT":
            store = {
                ...store,
                user: null
            }
        break;
        default: return store
    }
    // For now, don't handle any actions
    // and just return the store given to us.
    return store
}