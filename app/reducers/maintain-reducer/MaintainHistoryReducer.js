import { 
    FETCH_API_MAINTAIN_HISTORY,
    FETCH_API_MAINTAIN_HISTORY_SUCCESS,
    FETCH_API_MAINTAIN_HISTORY_FAILED,
    RESET_STATE
     } from "../../actions/ActionTypes";
import moment from 'moment';
import _ from 'lodash'

const INIT_STATE = {
    data: [],
    error: null,
    fetching: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_API_MAINTAIN_HISTORY:
        return {
            ...state,
            fetching: true
        };
        case FETCH_API_MAINTAIN_HISTORY_SUCCESS:{
            let result = action.payload
            result = result.map((element,index)=>{
                let isRenderTime = false
                if (index===0) {
                    isRenderTime = true
                } else {
                    isRenderTime = !moment(element.modifiedDate).isSame(result[index-1].modifiedDate,'date')
                }
                return {
                    ...element,
                    isRenderTime,  
                }
            })
            let data
            if (action.from === 0){
                data = result
            } else{
                data = _.unionBy(state.data,result,'requestId')
            }
            

            return {
                data: data,
                error: null,
                fetching: false
            };
        }
        case FETCH_API_MAINTAIN_HISTORY_FAILED:
            return {
                data: state.data,
                error: action.payload,
                fetching: false
            };
        case RESET_STATE:{
            return INIT_STATE
        }
        default:
            return state;
    }
}