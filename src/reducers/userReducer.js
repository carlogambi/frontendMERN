import { 
        USER_LOGIN_FAIL, 
        USER_LOGIN_LOGOUT, 
        USER_LOGIN_REQUEST, 
        USER_LOGIN_SUCCESS, 
        USER_REGISTER_REQUEST,
        USER_REGISTER_SUCCESS,
        USER_REGISTER_FAIL, 
        USER_DETAIL_REQUEST,
        USER_DETAIL_SUCCESS,
        USER_UPDATE_PROFILE_REQUEST,
        USER_UPDATE_PROFILE_SUCCESS,
        USER_UPDATE_PROFILE_FAIL,
        USER_UPDATE_PROFILE_RESET,
        USER_LIST_REQUEST,
        USER_LIST_SUCCESS,
        USER_LIST_FAIL,
        USER_DELETE_REQUEST,
        USER_DELETE_SUCCESS,
        USER_DELETE_FAIL,
        USER_GETBYID_REQUEST,
        USER_GETBYID_SUCCESS,
        USER_GETBYID_FAIL,
        USER_GETREVIEWS_REQUEST,
        USER_GETREVIEWS_FAIL,
        USER_GETREVIEWS_SUCCESS,
        USER_DELETE_REVIEW_REQUEST,
        USER_DELETE_REVIEW_SUCCESS,
        USER_DELETE_REVIEW_FAIL
} from "../constants/userConstants"

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
                return { loading: true }
        case USER_LOGIN_SUCCESS:
                return { loading: false, userInfo: action.payload }
        case USER_LOGIN_LOGOUT:
                return {  }
        case USER_LOGIN_FAIL:
                return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
                return { loading: true }
        case USER_REGISTER_SUCCESS:
                return { loading: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
                return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userDetailReducer = (state = { user: {}}, action) => {
    switch (action.type) {
        case USER_DETAIL_REQUEST:
                return { ...state, loading: true }
        case USER_DETAIL_SUCCESS:
                return { loading: false, user: action.payload }
        case USER_LOGIN_FAIL:
                return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const updateUserReducer = (state = { }, action) => {
        switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
                return { ...state, loading: true }
        case USER_UPDATE_PROFILE_SUCCESS:
                return { loading: false, success: true, userInfo: action.payload }
                case USER_UPDATE_PROFILE_FAIL:
                        return { loading: false, error: action.payload }
                        case USER_UPDATE_PROFILE_RESET:
                return { loading: false, error: action.payload }
                default:
            return state
        }
}

export const userListReducer = (state = [], action) => {
    switch (action.type) {
            case USER_LIST_REQUEST:
                return { loading: true }
                case USER_LIST_SUCCESS:
                        return { loading: false, users: action.payload }
                        case USER_LIST_FAIL:
                return { loading: false, error: action.payload }
                default:
            return state
        }
}

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
            case USER_DELETE_REQUEST:
                    return { loading: true }
        case USER_DELETE_SUCCESS:
                return { loading: false, success: true }
                case USER_DELETE_FAIL:
                        return { loading: false, error: action.payload }
        default:
                return state
        }
}

export const getuserByIdReducer = (state = {}, action) => {
        switch (action.type) {
                case USER_GETBYID_REQUEST:
                        return { loading: true }
        case USER_GETBYID_SUCCESS:
                return { loading: false, user: action.payload }
        case USER_GETBYID_FAIL:
                return { loading: false, error: action.payload }
                default:
                        return state
    }
}

export const userReviewsReducer = (state = { user: {}}, action) => {
    switch (action.type) {
        case USER_GETREVIEWS_REQUEST:
                return { ...state, loading: true }
        case USER_GETREVIEWS_SUCCESS:
                return { loading: false, userReviewsList: action.payload }
        case USER_GETREVIEWS_FAIL:
                return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userReviewDeleteReducer = (state = {success:false}, action) => {
    switch (action.type) {
        case USER_DELETE_REVIEW_REQUEST:
                return { ...state }
        case USER_DELETE_REVIEW_SUCCESS:
                console.log(action);
                return { success: action.payload }
        case USER_DELETE_REVIEW_FAIL:
                return { error: action.payload }
        default:
            return state
    }
}