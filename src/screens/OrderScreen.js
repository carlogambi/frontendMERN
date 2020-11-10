import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import {  Row, Col,  ListGroup, Image, Card} from 'react-bootstrap'
import  { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {  getOrderDetails, payOrder } from '../actions/orderAction'
import { ORDER_DETAILS_RESET, ORDER_PAY_RESET } from '../constants/orderConstants'
import serverUrl from '../actions/serverUrl'



const OrderScreen = ({ match }) => {

    const [SDKready, setSDKready] = useState(false)

    const orderId = match.params.id

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading, error} = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay, success: successPay} = orderPay
    
    if(!loading && order){
    const addDecimals = num  => ((Math.round(num *100))/100).toFixed(2)
    //calculate prices
    order.itemsPrice = order.orderItems.reduce((acc, item) => acc+item.price*item.quantity, 0)
    order.shippingPrice = addDecimals(order.itemsPrice > 100 ? 0 : 100)
    order.taxPrice = addDecimals(Number((0.15*order.itemsPrice).toFixed(2)))
    order.totalPrice = (
        Number(order.itemsPrice) 
        + Number(order.shippingPrice) 
        + Number(order.taxPrice)).toFixed(2)

}
        useEffect(() => {
            console.log(order);
            if(!loading && (orderId !== order._id)){
                dispatch(getOrderDetails(orderId))
            }
            const addPaypalScript = async() => {
                const clientId  = (await axios.get(`${serverUrl}/api/config/paypal`)).data
                const script = document.createElement('script')
                script.type = 'text/javascript'
                script.async = true
                script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
                script.onload = () => setSDKready(true)
                let presentScripts = document.getElementsByTagName('script')
                presentScripts = Array.from(presentScripts).map(s => s.src);
                if((presentScripts.includes(script.src)))document.body.appendChild(script)
                }
                if(!order || successPay){
                    dispatch({type: ORDER_PAY_RESET})
                    dispatch(getOrderDetails(orderId))
                }else if(!order.isPaid){
                    try{addPaypalScript()}catch(e){console.log(e);}
                setSDKready(true)
            }
        }, [dispatch, orderId, order, successPay, loading])

        if(successPay)dispatch({
            type: ORDER_DETAILS_RESET
        })
        
        const successPaymentHandler = (paymentResult) => {
            console.log(paymentResult)
            dispatch(payOrder(order._id, paymentResult))
        }


    return loading 
            ? 
                <Loader /> 
            : 
                error 
                ? 
                <Message variant='danger'>{error}</Message>
                :
                <>
                    {order && <h2>order {order._id}</h2>}
                    <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>
                            Shipping
                        </h2>
                        <p>
                            <strong>Address:</strong>
                            {order.shippingAddress.address},
                            {order.shippingAddress.city},
                            {order.shippingAddress.postalCode},
                            {order.shippingAddress.country},
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>payment method</h2>
                        <p>
                        <strong>method: </strong>
                        {order.paymentMethod}
                        </p>
                        {order.isPaid
                            ?
                                <Message variant='success'>order payed on {order.paidAt}</Message>
                            :
                                <Message variant='danger'>order not payed</Message>
                            }
                        {order.isDelivered
                            ?
                            <Message variant='success'>
                                    <h5>
                                    {order.deliveredAt.day}/{order.deliveredAt.month}/{order.deliveredAt.year}, order delivered
                                    </h5> 
                                    <span>
                                        {order.deliveredAt.agency && <h5>{order.deliveredAt.agency}</h5>}
                                        {order.deliveredAt.trakingNumber && <i>traking: {order.deliveredAt.trakingNumber}</i>}
                                    </span>
                                </Message>
                                :
                                <Message variant='danger'>order not delivered</Message>
                            }
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>order items:</h2>
                        {
                            order.orderItems.length === 0 
                            ?
                            <Message>your order is empty</Message>
                            :
                            <ListGroup variant='flush'>
                                {
                                    order.orderItems.map((i, indx) => (
                                        <ListGroup.Item key={indx}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={i.image} alt={i.name} fluid rounded />

                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${i.product}`}>
                                                         {i.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {i.quantity} x ${i.price} = ${i.quantity * i.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        }
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Items
                                </Col>
                                <Col>
                                    $ {order.itemsPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Shipping
                                </Col>
                                <Col>
                                    $ {order.shippingPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Tax
                                </Col>
                                <Col>
                                    $ {order.taxPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Total
                                </Col>
                                <Col>
                                    $ {order.totalPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader />}
                                {!SDKready ? <Loader />: (
                                    <PayPalButton 
                                        amount={order.totalPrice}
                                        onSuccess={successPaymentHandler}
                                    />
                                )}
                            </ListGroup.Item>
                        )}
                        {/* <ListGroup.Item>
                            {
                                error && <Message variant='danger'>{error}</Message>
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button 
                            type='button' 
                            className='btn-block' 
                            disabled={
                                order.orderItems.length === 0 
                            }
                            onClick={(e) =>placeOrderHandler(e)}>
                                place order
                            </Button>
                        </ListGroup.Item> */}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
                </>   
}

export default OrderScreen
