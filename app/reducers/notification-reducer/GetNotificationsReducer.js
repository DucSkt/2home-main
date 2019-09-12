import {
    FETCH_API_POST_NOTIFICATIONS_SUCCESS,
    FETCH_API_GET_NOTIFICATIONS_REQUEST,
    FETCH_API_GET_NOTIFICATIONS_FAILED,
    FETCH_API_DELETE_NOTIFICATIONS_SUCCESS,
    RESET_STATE,
    FETCH_API_GET_NOTIFICATIONS_SUCCESS} from "../../actions/ActionTypes";
import _ from 'lodash'
import NotifyConstant from '../../containers/notification/Constant'

const INIT_STATE = {
    data:[],
    error:null,
    fetching: false,
    isChange:false
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_API_GET_NOTIFICATIONS_REQUEST:
            return {
                ...state,
                error:null,
                fetching: true,
                isChange: false
            };
        case FETCH_API_GET_NOTIFICATIONS_SUCCESS:
        {
            // handle refresh
            console.log('Notification Dataaa - reducer:',action.data)
            if (action.page===0) {
                return {
                    error:null,
                    data:action.data,
                    fetching: false,
                    isChange: true
                };
            }
            console.log("load more in reducer :",[...state.data,...action.data])
            //load more
            return {
                data:[...state.data,...action.data],
                error:null,
                fetching: false,
                isChange:true
            };
        }
        case FETCH_API_GET_NOTIFICATIONS_FAILED:
            return {
                ...state,
                error:action.error,
                fetching: false,
                isChange: false
            };

        case FETCH_API_POST_NOTIFICATIONS_SUCCESS:{

            /*
                this is using for set status notification to "read"
            */
            
           state.data = state.data.map(element=>{
                if (action.idArr.includes(element.notificationId)){
                    element.status =  NotifyConstant.statusRead
                }
                return element
            })
            return {
                ...state,
                data:[...state.data],
                isChange: true
            }
        }
        case FETCH_API_DELETE_NOTIFICATIONS_SUCCESS:{
            let index = state.data.findIndex(element=>{
                return element.notificationId === action.notificationId
            })
            if (index!=-1){
                state.data.splice(index,1)
            } 
            return {
                ...state,
                data:[...state.data],
                isChange:true
            }
        }
        case RESET_STATE:{
            return INIT_STATE
        }
        default:
            return state;
    }
}
