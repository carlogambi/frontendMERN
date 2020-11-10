import axios from "axios"
import { 
    ORDER_CREATE_FAIL, 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS, 
    ORDER_DETAILS_FAIL, 
    ORDER_DETAILS_REQUEST, 
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_USER_ORDERS_LIST_REQUEST,
    ORDER_USER_ORDERS_LIST_SUCCESS,
    ORDER_USER_ORDERS_LIST_FAIL,
    ADMIN_ALL_ORDERS_REQUEST,
    ADMIN_ALL_ORDERS_SUCCESS,
    ADMIN_ALL_ORDERS_FAIL, 
    SET_SHIPPING_DATE_ORDER_REQUEST,
    SET_SHIPPING_DATE_ORDER_SUCCESS,
    SET_SHIPPING_DATE_ORDER_FAIL
} from "../constants/orderConstants"
import serverUrl from "./serverUrl"

export const createOrder = (order) => async( dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const token = getState().userLogin.userInfo.token

        const config = {
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const { data } = await axios.post(
            `${serverUrl}/api/orders`,order, config
        )
    
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: 
                (error.response && error.response.data.message) 
                ? error.response.data.message : error.message
        })
    }
}

export const getOrderDetails = (orderId) => async( dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const token = getState().userLogin.userInfo.token

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const { data } = await axios.get(
            `${serverUrl}/api/orders/getOrder/${orderId}`, config
        )
    
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: 
                (error.response && error.response.data.message) 
                ? error.response.data.message : error.message
        })
    }
}

export const payOrder = (orderId, paymentResult) => async( dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })
        console.log(paymentResult);
        const token = getState().userLogin.userInfo.token

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const { data } = await axios.put(
            `${serverUrl}/api/orders/getOrder/${orderId}/pay`, paymentResult, config
        )
            
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: 
                (error.response && error.response.data.message) 
                ? error.response.data.message : error.message
        })
    }
}
export const listUserOrders = () => async( dispatch, getState) =>{
    try {
        dispatch({
            type: ORDER_USER_ORDERS_LIST_REQUEST
        })

        const token = getState().userLogin.userInfo.token

        const config = {
            headers: {
                'Content-Type': 'application.json',
                'Authorization': `Bearer ${token}`
            }
        }
        const { data } = await axios.get(
            `${serverUrl}/api/orders/userOrders`, config
        )
    
        dispatch({
            type: ORDER_USER_ORDERS_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_USER_ORDERS_LIST_FAIL,
            payload: 
                (error.response && error.response.data.message) 
                ? error.response.data.message : error.message
        })
    }
}

export const getAllUsersOrders = () => async( dispatch, getState) =>{
    try {
        dispatch({
            type: ADMIN_ALL_ORDERS_REQUEST
        })

        const token = getState().userLogin.userInfo.token

        const config = {
            headers: {
                'Content-Type': 'application.json',
                'Authorization': `Bearer ${token}`
            }
        }
        const { data } = await axios.get(
            `${serverUrl}/api/orders/allUsersOrders`, config
        )
    
        dispatch({
            type: ADMIN_ALL_ORDERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_ALL_ORDERS_FAIL,
            payload: 
                (error.response && error.response.data.message) 
                ? error.response.data.message : error.message
        })
    }
}

export const setShippingDateAction = (date, orderId) => async( dispatch, getState) =>{
    try {
        dispatch({
            type: SET_SHIPPING_DATE_ORDER_REQUEST
        })

        const token = getState().userLogin.userInfo.token

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        console.log(date, orderId);

        const { data } = await axios.put(
            `${serverUrl}/api/orders/setShippingDate`,{date, orderId}, config
        )
    
        dispatch({
            type: SET_SHIPPING_DATE_ORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SET_SHIPPING_DATE_ORDER_FAIL,
            payload: 
                (error.response && error.response.data.message) 
                ? error.response.data.message : error.message
        })
    }
}
