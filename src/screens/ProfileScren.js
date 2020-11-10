import React, {useState, useEffect} from 'react'
import { Form, Row, Col, Table,  Button } from 'react-bootstrap'
import { LinkContainer } from'react-router-bootstrap'
import  {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from './../components/Loader'
import { getUserDetails, deleteUserReview, getUserReviews, updateUser } from './../actions/userActions'
import { listUserOrders } from '../actions/orderAction'

function ProfileScreen({location, history}) {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [name, setname] = useState('')
    const [confirmPssw, setconfirmPssw] = useState('')
    const [message, setmessage] = useState('')

     const dispatch = useDispatch()
     
     const userDetail = useSelector(state => state.userDetail)
     const { loading, error, user } = userDetail
     
     const userLogin = useSelector(state => state.userLogin)
     const { userInfo } = userLogin

     const deleteReview = useSelector(state => state.deleteReview)
     const {success: deleteReviewSuccess, error: deleteReviewError} = deleteReview

     const userReviews = useSelector(state => state.userReviews)
     const {loading: loadingReviews, userReviewsList, error: reviewsError} = userReviews

     const userOrdersList = useSelector(state => state.userOrdersList)
     const { loading: loadingOrders, error: errorOrders, orders } = userOrdersList
    

    const success = useSelector(state => state).updateProfile.success === true ? true : false;
     useEffect(() => {
         if(!userInfo){
             history.push('/login')
            }else{
                if(!user.name){
                    dispatch(getUserDetails('profile'))
                    dispatch(listUserOrders())
                   if(!userReviewsList){ dispatch(getUserReviews())}
                }else{
                setname(user.name)
                setemail(user.email)
            }
            if(deleteReviewSuccess){dispatch(getUserReviews())}
        }
     }, [history, userInfo, dispatch, user, deleteReviewSuccess, userReviewsList] )


    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPssw){
            setmessage('passwords not match!')
        }else{
            dispatch(updateUser({name,email,password, _id: user._id, isAdmin: user.isAdmin}))
        }
    }

    const deleteReviewHandler = (productId, reviewId) => {
        if(window.confirm('are you sure to delete this review?')){
        dispatch(deleteUserReview(productId, reviewId))
        }
    }

    return ( <Row>
            <Col md={3}>
            <h2>user profile</h2>
            {
                error 
                &&
                <Message variant='danger'>
                    {error}
                </Message>
                }
            {
                message 
                &&
                <Message variant=''>
                    {message}
                </Message>
                }
            {
                loading 
                &&
                <Loader />
                }
        <Form
            onSubmit={(e) => submitHandler(e)}
            autoComplete='on'
        >
            <Form.Group controlId='name'>
                <Form.Label>
                    name
                </Form.Label>
                <Form.Control 
                    type='name' 
                    placeholder='enter name' 
                    value={name} 
                    onChange={(e) => setname(e.target.value)}
                    />
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>
                    email address
                </Form.Label>
                <Form.Control 
                    type='email' 
                    placeholder='enter email' 
                    value={email} 
                    onChange={(e) => setemail(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>
                    password
                </Form.Label>
                <Form.Control 
                    type='password' 
                    placeholder='enter password' 
                    value={password} 
                    onChange={(e) => setpassword(e.target.value)}
                    autoComplete='on'
                />
            </Form.Group>
            <Form.Group controlId='CONFIRM'>
                <Form.Label>
                    CONFIRM password
                </Form.Label>
                <Form.Control 
                    type='password' 
                    placeholder='confirm password' 
                    value={confirmPssw} 
                    onChange={(e) => setconfirmPssw(e.target.value)}
                    autoComplete='on'
                />
            </Form.Group>
                <button 
                type='submit'
                variant='primary'
                >
                    update
                </button>
                {success && <h3>success!</h3>}
        </Form>
            </Col>
            <Col md={9}>
                <h2>my orders</h2>
                {
                    loadingOrders 
                    ? 
                        <Loader /> 
                    : 
                        errorOrders 
                        ? 
                            <Message variant='danger'>{errorOrders}</Message>
                        :
                        <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders && orders.map((order) => (
                            <tr key={order._id}>
                              <td>{order._id}</td>
                              <td>{order.createdAt.substring(0, 10)}</td>
                              <td>{order.totalPrice}</td>
                              <td>
                                {order.isPaid ? (
                                  order.paidAt.substring(0, 10)
                                ) : (
                                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                              </td>
                              <td>
                                {order.isDelivered ? (
                                  'delivered'
                                ) : (
                                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                              </td>
                              <td>
                                <LinkContainer to={`/orders/${order._id}`}>
                                  <Button className='btn-sm' variant='light'>
                                    Details
                                  </Button>
                                </LinkContainer>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                }
                {
                    (orders && orders.length === 0) && <Message>no orders, make one!</Message>
                }
                {<>
                    <h3>my reviews</h3>
                {
                    (userReviewsList && userReviewsList.length === 0) && <Message>no reviews, make one!</Message>
                }
                            {
                                reviewsError && <Message variant='danger'>{reviewsError}</Message>
                            }
                            {
                                deleteReviewError && <Message variant='danger'>{deleteReviewError}</Message>
                            }
                          {
                              loadingReviews?<Loader/>:(userReviewsList && userReviewsList.map(
                                  (product, i) => 
                                  (
                                    <React.Fragment key={i}>
                                        <h5>{product.productName}</h5>
                                        {
                                            <Table striped bordered hover responsive className='table-sm'>
                                                <thead>
                                                    <tr>
                                                        <th>RATING</th>
                                                        <th>TITLE</th>
                                                        <th>BODY</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>{
                                                (product.userReviews.map(
                                                    (r,i) => (
                                                    <tr key={i}>
                                                        <td>{r.rating}/5</td>
                                                        <td>{r.title}</td>
                                                        <td>{r.body}</td>
                                                        <td><Button variant='danger' onClick={() => deleteReviewHandler(product.productId, r._id)}>
                                                                delete
                                                            </Button></td>
                                                    </tr>)))
                                                    }
                                                </tbody>
                                            </Table>
                                        }
                                    </React.Fragment>
                                  )
                              ))
                          }
                </>
                }
            </Col>
        </Row>
    )
}

export default ProfileScreen

