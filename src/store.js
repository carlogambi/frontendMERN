import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, editProductReducer, productDetailsReducer, createProductReducer, productDeleteReducer, newReviewReducer, } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer'
import { getuserByIdReducer,userReviewsReducer, updateUserReducer, userDeleteReducer, userDetailReducer, userListReducer, userLoginReducer, userRegisterReducer, userReviewDeleteReducer }from './reducers/userReducer'
import { adminAllOrdersReducer, createOrderReducer, orderDetailsReducer, orderPayReducer, setShippingDateReducer, userOrdersReducer } from './reducers/orderReducer'


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetail: userDetailReducer,
    userList: userListReducer,
    updateProfile: updateUserReducer,
    orderCreate: createOrderReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    userOrdersList: userOrdersReducer,
    userDelete: userDeleteReducer,
    getUserById: getuserByIdReducer,
    createProduct: createProductReducer,
    editProduct: editProductReducer,
    deleteProduct: productDeleteReducer,
    adminAllOrders: adminAllOrdersReducer,
    shippingDate: setShippingDateReducer,
    newReview: newReviewReducer,
    userReviews: userReviewsReducer,
    deleteReview: userReviewDeleteReducer
})

const cartItemsFromStorage = 
    localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems'))
    : []

const userInfoFromStorage = 
    localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo'))
    : null

const shippingAddressFromStorage = 
    localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress'))
    : {}
const paymentMethodFromStorage = 
    localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('paymentMethod'))
    : {}


const initialState = {
    cart:{
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]


const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store