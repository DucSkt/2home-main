import {FETCH_IP, FETCH_IP_FAILED, FETCH_IP_SUCCESS} from "../actions/ActionTypes";

export default (ip = "", action) => {
    switch (action.type) {
        case FETCH_IP:
            return {
                ip: "",
                fetching: true,
                sort: action.sort
            };
        case FETCH_IP_SUCCESS:
            return {
                ip: action.ipAddress,
                fetching: false
            };
        case FETCH_IP_FAILED:
            return {
                ip: "",
                error: action.error,
                fetching: false
            };
        default:
            return ip;
    }
}