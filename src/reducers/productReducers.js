import { 
        PRODUCT_LIST_FAIL, 
        PRODUCT_LIST_SUCCESS, 
        PRODUCT_LIST_REQUEST,
        PRODUCT_DETAILS_REQUEST,
        PRODUCT_DETAILS_SUCCESS,
        PRODUCT_DETAILS_FAIL,
        PRODUCT_CREATE_REQUEST,
        PRODUCT_CREATE_SUCCESS,
        PRODUCT_CREATE_FAIL,
        PRODUCT_EDIT_REQUEST,
        PRODUCT_EDIT_SUCCESS,
        PRODUCT_EDIT_FAIL,
        PRODUCT_DELETE_FAIL,
        PRODUCT_DELETE_SUCCESS,
        PRODUCT_DELETE_REQUEST,
        PRODUCT_DETAILS_RESET,
        PRODUCT_NEW_REVIEW_REQUEST,
        PRODUCT_NEW_REVIEW_SUCCESS,
        PRODUCT_NEW_REVIEW_FAIL
} from './../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
                return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
                return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAIL:
                return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
                return { loading: true, ...state }
        case PRODUCT_DETAILS_SUCCESS:
                return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
                return { loading: false, error: action.payload }
        case PRODUCT_DETAILS_RESET:
                return { loading: true,  product: { reviews: [] }}
        default:
            return state
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
                return { loading: true, ...state }
        case PRODUCT_DELETE_SUCCESS:
                return { loading: false, success: true }
        case PRODUCT_DELETE_FAIL:
                return { loading: false, error: action.payload, success: false }
        default:
            return state
    }
}

export const createProductReducer = (state = { }, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
                return { loading: true, success:false}
        case PRODUCT_CREATE_SUCCESS:
                return { loading: false, success: true, message: action.payload}
        case PRODUCT_CREATE_FAIL:
                return { loading: false, success: false, message: action.payload}
        default:
            return state
    }
}

export const editProductReducer = (state = { }, action) => {
    switch (action.type) {
        case PRODUCT_EDIT_REQUEST:
                return { loading: true, success:false}
        case PRODUCT_EDIT_SUCCESS:
                return { loading: false, success: true, message: action.payload}
        case PRODUCT_EDIT_FAIL:
                return { loading: false, success: false, message: action.payload}
        default:
            return state
    }
}


export const newReviewReducer = (state = {}, action) => {
        switch (action.type) {
            case PRODUCT_NEW_REVIEW_REQUEST:
                    return { loading: true,  }
            case PRODUCT_NEW_REVIEW_SUCCESS:
                    return { loading: false, success: true }
            case PRODUCT_NEW_REVIEW_FAIL:
                    return { loading: false, error: action.payload, success: false }
            default:
                return state
        }
    }
