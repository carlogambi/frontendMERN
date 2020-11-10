import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from './../components/Message'
import { addToCart, removeFromCart } from './../actions/cartActions'

const CartScreen = ({match, location, history}) => {

    const productId = match.params.id;

    const quantity = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch();

    const state = useSelector(state => state.cart);
    const {cartItems} = state;

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, quantity))
        }
    }, [dispatch, productId, quantity])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
        
    }
    const checkOut = () => {
        history.push('/login?redirect=shipping')
    }

    console.log(cartItems);

    return (
        <Row>
            <Col md={8}>
                <h1>shopping cart</h1>
                {cartItems.length === 0
                ? <Message>
                    your cart is empty 
                    <Link to='/'> go back</Link>
                    </Message>
                :   (
                    <ListGroup variant='flush'>
                        {
                            cartItems.map((p,i) => 
                                (<ListGroup.Item key={i}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={p.image} alt={p.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${p.product}`} >{p.name}</Link>
                                        </Col>
                                        <Col md={2}>
                                            ${p.price}
                                        </Col>
                                        <Col d={2}>
                                            <Form.Control as='select' value={p.quantity} onChange={e => {console.log(p.product, Number(e.target.value));dispatch(addToCart(p.product, Number(e.target.value)))}}>
                                                 {
                                                     [...Array(p.countInStock).keys()].map((num,i) => <option key={i+1} value={i+1}>{i+1}</option>)
                                                  }
                                             </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button variant='light' onClick={() => removeFromCartHandler(p.product)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>)
                            )
                        }
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>SubTotal {cartItems.reduce((acc, prod) => acc + prod.quantity, 0)} items</h2>
                            ${cartItems.reduce((acc,prod) => acc + prod.quantity * prod.price, 0)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={() => checkOut()}>
                            go to checkout
                            </button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
