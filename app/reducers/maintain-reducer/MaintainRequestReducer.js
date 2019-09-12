import { FETCH_API_MAINTAIN_REQUEST,
    FETCH_API_MAINTAIN_REQUEST_SUCCESS, 
    FETCH_API_MAINTAIN_REQUEST_FAILED ,
    POST_API_MAINTAIN_SUCCESS , 
    POST_API_MAINTAIN_FAILED,
    REMOVE_ITEM_MAINTAIN_SUCCESS,
    REMOVE_ITEM_MAINTAIN_FAILED,
    RESET_STATE
} from "../../actions/ActionTypes";

const INIT_STATE = {
        data: null,
        error: null,
        fetching: false
};
export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_API_MAINTAIN_REQUEST:
        return {
            data: null,
            error: null,
            fetching: true
          };
        case FETCH_API_MAINTAIN_REQUEST_SUCCESS:
        return {
            data: action.payload,
            error: null,
            fetching: false
          };

        case FETCH_API_MAINTAIN_REQUEST_FAILED:
        return {
        data: null,
        error: action.payload,
        fetching: false
        };

        case POST_API_MAINTAIN_SUCCESS:
            const filterItemPost = state.data.filter(eachApi => {
                return eachApi.requestId !== action.payload;
            });
            return {
                data: filterItemPost,
                error: null,
                fetching: false
                };

        case REMOVE_ITEM_MAINTAIN_SUCCESS:
            const filterItemRemove = state.data.filter(eachApi => {
                 return eachApi.requestId !== action.payload;
            });
             return {
                data: filterItemRemove,
                error: null,
                fetching: false
                };

        case REMOVE_ITEM_MAINTAIN_FAILED:
            return {...state};
        case RESET_STATE:{
            return INIT_STATE
        }
        default:
            return state;
    }
} 