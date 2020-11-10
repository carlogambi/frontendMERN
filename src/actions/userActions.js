import axios from "axios"
import { 
    USER_LOGIN_FAIL, 
    USER_LOGIN_LOGOUT, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_REGISTER_REQUEST, 
    USER_REGISTER_FAIL, 
    USER_REGISTER_SUCCESS, 
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
    USER_DETAIL_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_DELETE_REQUEST,
    USER_DELETE_FAIL,
    USER_DELETE_SUCCESS,
    USER_GETBYID_REQUEST,
    USER_GETBYID_SUCCESS,
    USER_GETBYID_FAIL,
    USER_GETREVIEWS_SUCCESS,
    USER_GETREVIEWS_FAIL,
    USER_GETREVIEWS_REQUEST,
    USER_DELETE_REVIEW_REQUEST,
    USER_DELETE_REVIEW_SUCCESS,
    USER_DELETE_REVIEW_FAIL
} from "../constants/userConstants"
import serverUrl from "./serverUrl"

export const login = (email, password) => async( dispatch) =>{
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type':'application/json',
            }
        }
        const { data } = await axios.post(`${serverUrl}/api/users/login`, {email, password}, config)
    
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: 
                (error.response && error.response.data.message) 
                ? error.response.data.message : error.message
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGIN_LOGOUT
    })
    dispatch({
        type: USER_UPDATE_PROFILE_RESET
    })
    dispatch({
        type: USER_DETAIL_RESET
    })
}

export const register = (name, email, password) => async( dispatch) =>{
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type':'application/json',
            }
        }
        const { data } = await axios.post(
            `${serverUrl}/api/users/register`, 
            {name, email, password}, 
            config
        )
    
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: 
                (error.response && error.response.data.message) 
                ? error.response.data.message : error.message
        })
    }
}

export const getUserDetails = (id) => async( dispatch, getState) =>{

    try {
        dispatch({
            type: USER_DETAIL_REQUEST
        })

        const token = getState().userLogin.userInfo.token

        const config = {
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }
        // console.log(`/api/users/${id}`, `Bearer ${getState().userLogin.userInfo.token}`);
        const { data } = await axios.get(
            `${serverUrl}/api/users/profile`, config
        )
    
        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAIL_FAIL,
            payload: 
                (error.response && error.response.data.message) 
                ? error.response.data.message : error.message
        })
    }
}

export const updateUser = (user) => async( dispatch, getState) =>{
    console.log(user);
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const token = getState().userLogin.userInfo.token
        
        const config = {
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        // console.log(`/api/users/${id}`, `Bearer ${getState().userLogin.userInfo.token}`);
        const { data } = await axios.put(
            `${serverUrl}/api/users/update`,user, config
            )
    
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: 
                (error.response && error.response.data.message) 
                ? error.response.data.message : error.message
        })
    }
}

export const listUsers = () => async( dispatch, getState) =>{
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })
        
        const token = getState().userLogin.userInfo.token
        
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const { data } = await axios.get(
            `${serverUrl}/api/users`, config
            ) 
            console.log('action listUsers called', data);
    
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: 
                (error.response && error.response.data.message) 
                ? error.response.data.message : error.message
            })
    }
}

export const deleteUser = (userId) => async( dispatch, getState) =>{
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })

        const token = getState().userLogin.userInfo.token

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const { data } = await axios.delete(
            `${serverUrl}/api/users/delete/${userId}`, config
            ) 
            console.log('action listUsers called', data);
            
        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: 
                (error.response && error.response.data.message) 
                ? error.response.data.message : error.message
        })
    }
}

export const getUserByIdAction = (userId) => async(dispatch, getState) => {
    
    const token = getState().userLogin.userInfo.token

    try{
        dispatch({
          type: USER_GETBYID_REQUEST
        })
        
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const {data: user} = await axios.get(`${serverUrl}/api/users/getById/${userId}`, config)

        dispatch({
            type: USER_GETBYID_SUCCESS,
            payload: user
        })
        
    }catch(error){
        dispatch({
            type: USER_GETBYID_FAIL,
            payload: error
        })
        
    }
    
    
}

export const getUserReviews = () => async( dispatch, getState) =>{

    try {
        dispatch({
            type: USER_GETREVIEWS_REQUEST
        })

        const token = getState().userLogin.userInfo.token

        const config = {
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }
        // console.log(`/api/users/${id}`, `Bearer ${getState().userLogin.userInfo.token}`);
        const { data } = await axios.get(
            `${serverUrl}/api/users/getReviews`, config
        )
    
        dispatch({
            type: USER_GETREVIEWS_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type: USER_GETREVIEWS_FAIL,
            payload: 
                (error.response && error.response.data.message) 
                ? error.response.data.message : error.message
        })
    }
}

export const deleteUserReview = (productId, reviewId) => async( dispatch, getState) =>{

    try {
        dispatch({
            type: USER_DELETE_REVIEW_REQUEST
        })

        const token = getState().userLogin.userInfo.token

        const config = {
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }
         await axios.delete( 
            `${serverUrl}/api/users/deleteReview/${productId}/${reviewId}`, config
        )
    
        dispatch({
            type: USER_DELETE_REVIEW_SUCCESS,
            payload: true
        })

    } catch (error) {
        dispatch({
            type: USER_DELETE_REVIEW_FAIL,
            payload: 
                (error.response && error.response.data.message) 
                ? error.response.data.message : error.message
        })
    }
}