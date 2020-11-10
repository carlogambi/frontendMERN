import { 
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_REQUEST,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_EDIT_REQUEST,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_EDIT_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_NEW_REVIEW_REQUEST,
    PRODUCT_NEW_REVIEW_SUCCESS,
    PRODUCT_NEW_REVIEW_FAIL
} from './../constants/productConstants'


import axios from 'axios'
import serverUrl from './serverUrl'
// import { encodeBase64 } from 'bcryptjs'

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST
        })
        console.log(`${serverUrl}/api/products`)
        const  { data } = await axios.get(serverUrl+'/api/products')

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: 
                (error.response && error.response.data.message) 
                ? error.response.data.message : error.message
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        })
        const  { data } = await axios.get(`${serverUrl}/api/products/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: 
                (error.response && error.response.data.message) 
                ? error.response.data.message : error.message
        })
    }
}

export const createProductAction = (formData) => async (dispatch, getState) => {

        dispatch({
            type: PRODUCT_CREATE_REQUEST,
        })

        const token = getState().userLogin.userInfo.token

        const config = {
            headers: {
                "Content-Type": `multipart/form-data`,
                'Authorization': `Bearer ${token}`
            }
        }

        var object = {};
        formData.forEach((value, key) => {object[key] = value});
        const  {data}  = await axios.post(
            `${serverUrl}/api/products/newProduct`,formData, config
        )

            data.success
            ?
            dispatch({
                type: PRODUCT_CREATE_SUCCESS,
                payload: data.message
            })
            :
            dispatch({
                type: PRODUCT_CREATE_FAIL,
                payload: data.message
            })

}

export const editProductAction = (formData, productId) => async (dispatch, getState) => {

        dispatch({
            type: PRODUCT_EDIT_REQUEST,
            success: false
        })

        const token = getState().userLogin.userInfo.token

        const config = {
            headers: {
                "Content-Type": `multipart/form-data`,
                'Authorization': `Bearer ${token}`
            }
        }
        const  {data}  = await axios.put(
            `${serverUrl}/api/products/edit/${productId}`,formData, config
        )

            data.success
            ?
            dispatch({
                type: PRODUCT_EDIT_SUCCESS,
                payload: data.message,
                success: true
            })
            :
            dispatch({
                type: PRODUCT_EDIT_FAIL,
                payload: data.message,
                success: false
            })

}

export const deleteProductAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const token = getState().userLogin.userInfo.token

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        
         await axios.delete(`${serverUrl}/api/products/delete/${id}`, config)
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: 
                (error.response && error.response.data.message) 
                ? error.response.data.message : error.message
        })
    }
}

export const newReviewAction = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_NEW_REVIEW_REQUEST
        })

        const token = getState().userLogin.userInfo.token

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        
        const {data} = await axios.put(`${serverUrl}/api/products/newReview/${productId}`,review, config)
        console.log(data);

        dispatch({
            type: PRODUCT_NEW_REVIEW_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_NEW_REVIEW_FAIL,
            payload: 
                (error.response && error.response.data.message) 
                ? error.response.data.message : error.message
        })
    }
}
