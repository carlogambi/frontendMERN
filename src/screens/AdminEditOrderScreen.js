
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {  Row, Col,  ListGroup, Image, Card, Button, Form} from 'react-bootstrap'
import  { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {  getOrderDetails, setShippingDateAction } from '../actions/orderAction'

let ready = false

const AdminEditOrderScreen = ({ match, history }) => {

    const orderId = match.params.id

    const date = new Date()

    const dispatch = useDispatch()

    //shippingField
    const [day, setDay] = useState(date.getDate())
    const [month, setMonth] = useState(date.getMonth()+1)
    const [year, setYear] = useState(date.getFullYear())

    const [agency, setAgency] = useState('')
    const [trakingNumber, setTrakingNumber] = useState('')

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading, error} = orderDetails

    const shippingDate = useSelector(state => state.shippingDate)
    const { success, error: setDateError} = shippingDate

    if(setDateError)alert(setDateError)
    console.log(shippingDate)

        const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if(!ready && (order && (trakingNumber === '' || agency === ''))){
        if(order.deliveredAt){
            if(order.deliveredAt.trakingNumber)setTrakingNumber(order.deliveredAt.trakingNumber)
            if(order.deliveredAt.agency)setAgency(order.deliveredAt.agency)
            ready = true
        }
    }
    
    if(!loading){
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
            if(!(userInfo&&userInfo.isAdmin))history.push('/login')
            dispatch(getOrderDetails(orderId))
            if(success)dispatch(getOrderDetails(orderId))
        }, [dispatch, orderId, success, userInfo, history])

        const setShippingDate = () => {
            const shippingData = {day, month, year }
            if(trakingNumber !== ''){shippingData.trakingNumber = trakingNumber}
            if(agency !== ''){shippingData.agency = agency}
            dispatch(setShippingDateAction(
                shippingData,
                order._id
            ))
        }
        
        const dayHandler = value => {
            const months = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]                                      
            if(value >= months[month -1]){
                setDay(months[month -1])
            }else if(value <= 1){
                setDay(1)
            }else{
                setDay(Number(value))
            }
            
        }

        const monthHandler = value => {
            if(value >= 12){
                setMonth(12)
            }else if(value <= 1){
                setDay(1)
            }else{
                setMonth(value)
            }
        }

        const yearHandler = value => {
            if(value < date.getFullYear()){
                setYear(date.getFullYear())
            }else if(value > ((date.getFullYear())+4)){
                setYear(date.getFullYear()+4)
            }else{
                setYear(value)
            }
            dayHandler(day)
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
            
                    <h2>order {order._id}</h2>
                    <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h4>
                            Shipping to
                        </h4>
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
                            ?<>
                            <Message variant='success'>order delivered </Message>
                            <Message variant='light'>

                                <h4>change shipping date</h4>
                                <Row>
                                agency (optional)
                                <Form.Control 
                                    type='text' 
                                    placeholder='enter agency' 
                                    value={agency} 
                                    onChange={e => setAgency(e.target.value)}
                                    />  
                                    traking number (optional)
                                    <Form.Control 
                                    type='text' 
                                    placeholder='enter traking number' 
                                    value={trakingNumber} 
                                    onChange={e => setTrakingNumber(e.target.value)}
                                    />  

                                </Row>
                                <Row align='right'>
                                    <Col>day
                                    <Form.Control 
                                    type='number' 
                                    placeholder='enter password' 
                                    value={day}
                                    onChange={e => dayHandler(e.target.value)}
                                    />  
                                    </Col>
                                    <Col>month
                                <Form.Control 
                                    type='number' 
                                    placeholder='enter password' 
                                    value={month} 
                                    onChange={e => monthHandler(e.target.value)}
                                    />  
                                    </Col>
                                    <Col>year
                                <Form.Control 
                                    type='number' 
                                    placeholder='enter password' 
                                    value={year} 
                                    onChange={e => yearHandler(e.target.value)}
                                    />  
                                    </Col>
                                    <Col>
                                    <Button 
                                        type='submit'
                                        variant='success'
                                        onClick={e => setShippingDate()}
                                        >
                                           change shipping
                                        </Button>
                                    </Col>
                                </Row>

                                {
                                    (
                                        day<date.getDate()
                                        || month<date.getDay()
                                        || year<date.getFullYear()
                                    ) && 'warning, you set shipping date older than today'
                                }
                                </Message>
                            </>
                                :
                                <>
                                <Message variant='danger'>
                                    order not delivered
                                </Message>
                                <Message variant='danger'>

                                <h4>set shipping date</h4>
                                <Row>
                                agency (optional)
                                <Form.Control 
                                    type='text' 
                                    placeholder='enter agency' 
                                    value={agency} 
                                    onChange={e => setAgency(e.target.value)}
                                    />  
                                    traking number (optional)
                                    <Form.Control 
                                    type='text' 
                                    placeholder='enter traking number' 
                                    value={trakingNumber} 
                                    onChange={e => setTrakingNumber(e.target.value)}
                                    />  

                                </Row>
                                <Row align='right'>
                                    <Col>day
                                    <Form.Control 
                                    type='number' 
                                    placeholder='enter password' 
                                    value={day}
                                    onChange={e => dayHandler(e.target.value)}
                                    />  
                                    </Col>
                                    <Col>month
                                <Form.Control 
                                    type='number' 
                                    placeholder='enter password' 
                                    value={month} 
                                    onChange={e => monthHandler(e.target.value)}
                                    />  
                                    </Col>
                                    <Col>year
                                <Form.Control 
                                    type='number' 
                                    placeholder='enter password' 
                                    value={year} 
                                    onChange={e => yearHandler(e.target.value)}
                                    />  
                                    </Col>
                                    <Col>
                                    <Button 
                                        type='submit'
                                        variant='danger'
                                        onClick={e => setShippingDate()}
                                        >
                                           set as shipped
                                        </Button>
                                    </Col>
                                </Row>
                                {
                                    (
                                        day<date.getDate()
                                        || month<date.getDay()
                                        || year<date.getFullYear()
                                    ) && 'warning, you set shipping date older than today'
                                }
                                </Message>
                                </>
                            }
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>ordered items:</h2>
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

                    </ListGroup>
                </Card>
            </Col>
        </Row>
                </>   
}

export default AdminEditOrderScreen

