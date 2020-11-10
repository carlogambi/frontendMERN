import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_RESET,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    ORDER_USER_ORDERS_LIST_REQUEST,
    ORDER_USER_ORDERS_LIST_SUCCESS,
    ORDER_USER_ORDERS_LIST_FAIL,
    ORDER_USER_ORDERS_LIST_RESET,
    ADMIN_ALL_ORDERS_REQUEST,
    ADMIN_ALL_ORDERS_SUCCESS,
    ADMIN_ALL_ORDERS_FAIL,
    SET_SHIPPING_DATE_ORDER_REQUEST,
    SET_SHIPPING_DATE_ORDER_SUCCESS,
    SET_SHIPPING_DATE_ORDER_FAIL
} from '../constants/orderConstants'

export const createOrderReducer = (state={  }, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true,
                
            }
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success:true,
                order: action.payload
                
            }
            case ORDER_CREATE_FAIL:
                return {
                    ...state,
                    loading: false,
                    success:true,
                    error:action.payload

            }
        default:
            return state
    }
}

export const orderDetailsReducer = (
    state = { loading: true, orderItems: [], shippingAddres: {} }
    , action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
    
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order:action.payload
                
            }
    
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
                ...state
                
            }
    
        case ORDER_DETAILS_RESET:
            return {
                user: {}
            }
    
        default:
            return state
    }
}

export const orderPayReducer = (
    state = {  }
    , action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {
                loading: true,
            }
    
        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true
                
            }
    
        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload,
                
            }
    
        case ORDER_PAY_RESET:
            return {}
    
        default:
            return state
    }
}

export const userOrdersReducer = (
    state = []
    , action) => {
    switch (action.type) {
        case ORDER_USER_ORDERS_LIST_REQUEST:
            return {
                loading: true,
            }
    
        case ORDER_USER_ORDERS_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
                
            }
    
        case ORDER_USER_ORDERS_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
                
            }
    
        case ORDER_USER_ORDERS_LIST_RESET:
            return {orders: []}
    
        default:
            return state
    }
}

export const adminAllOrdersReducer = (
    state = []
    , action) => {
    switch (action.type) {
        case ADMIN_ALL_ORDERS_REQUEST:
            return {
                loading: true,
            }
    
        case ADMIN_ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
                
            }
    
        case ADMIN_ALL_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload,
                
            }
    
        default:
            return state
    }
}

export const setShippingDateReducer = (
    state = {}
    , action) => {
    switch (action.type) {
        case SET_SHIPPING_DATE_ORDER_REQUEST:
            return {
                loading: true,
            }
    
        case SET_SHIPPING_DATE_ORDER_SUCCESS:
            return {
                loading: false,
                success: action.payload
                
            }
    
        case SET_SHIPPING_DATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload,
                
            }
    
        default:
            return state
    }
}