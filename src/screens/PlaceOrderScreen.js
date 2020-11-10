import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import {  Row, Col, Button, ListGroup, Image, Card} from 'react-bootstrap'
import  { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import CheckoutStatus from '../components/CheckoutStatus'
import { createOrder } from '../actions/orderAction'



const PlaceOrderScreen = ({ history }) => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {paymentMethod} = cart
    
    const addDecimals = num  => ((Math.round(num *100))/100).toFixed(2)
    //calculate prices
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc+item.price*item.quantity, 0)
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
    cart.taxPrice = addDecimals(Number((0.15*cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (
        Number(cart.itemsPrice) 
        + Number(cart.shippingPrice) 
        + Number(cart.taxPrice)).toFixed(2)

        const orderCreate = useSelector(state => state.orderCreate)
        const { order, success, error } = orderCreate

        useEffect(() => {
            if(success)history.push(`/orders/${order._id}`)
            // eslint-disable-next-line
        }, [history, success])

    const placeOrderHandler = (e) => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
            shippingPrice: cart.shippingPrice
        }))
    }

    return (
        <>
            <CheckoutStatus step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>
                                Shipping
                            </h2>
                            <p>
                                <strong>Address:</strong>
                                {cart.shippingAddress.address},
                                {cart.shippingAddress.city},
                                {cart.shippingAddress.postalCode},
                                {cart.shippingAddress.country},
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>payment method</h2>
                            <strong>method: </strong>
                            {paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>order items:</h2>
                            {
                                cart.cartItems.length === 0 
                                ?
                                <Message>your cart is empty</Message>
                                :
                                <ListGroup variant='flush'>
                                    {
                                        cart.cartItems.map((i, indx) => (
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
                                        $ {cart.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Shipping
                                    </Col>
                                    <Col>
                                        $ {cart.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Tax
                                    </Col>
                                    <Col>
                                        $ {cart.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total
                                    </Col>
                                    <Col>
                                        $ {cart.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {
                                    error && <Message variant='danger'>{error}</Message>
                                }
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button 
                                type='button' 
                                className='btn-block' 
                                disabled={
                                    cart.cartItems.length === 0 
                                }
                                onClick={(e) =>placeOrderHandler(e)}>
                                    place order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>   
        </>
    )
}

export default PlaceOrderScreen
