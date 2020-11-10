import React, { useEffect} from 'react'
import { Link } from 'react-router-dom'
import {  Row, Col, Button, ListGroup, Image, } from 'react-bootstrap'
import  {useDispatch, useSelector} from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
// import {  getUserByIdAction, updateUser } from '../actions/userActions'
import { listProducts, deleteProductAction } from './../actions/productAction'


const AdminProductList = ({history}) => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {   
        if(userInfo&&userInfo.isAdmin){
            dispatch(listProducts())
        }else{
            history.push('/login')
        }
    }, [dispatch, history, userInfo, ])

    const deleteProductHandler = (productId, name) => {
        window.confirm(`are you sure to delete ${name} ?`) && dispatch(deleteProductAction(productId))
        dispatch(listProducts())
    }

    return (
        <div>{
            loading 
            ? <Loader/>
            : 
                error
                ? <Message variant='danger' >{error}</Message>
                :    products.length === 0 
                ?
                <Message>your cart is empty</Message>
                :<>
                <h5>total: {products.length}</h5>
                <LinkContainer to={`/newProduct`}>
                <Button variant='dark' className='btn-sm'>
                    new Product
                </Button>
                </LinkContainer>
                <ListGroup variant='flush'>
                    {
                        products.map((i, indx) => (
                            <ListGroup.Item key={indx}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={i.image} alt={i.name} fluid rounded />
            
                                    </Col>
                                    <Col>
                                        <Link to={`/products/${i._id}`}>
                                             {i.name}
                                        </Link>
                                    </Col>
                                    <Col md={2}>
                                        ${i.price}
                                    </Col>
                                    <Col md={2}>
                                     {i.countInStock} in stock
                                    </Col>
                                    <Col md={4}>
                                    <LinkContainer to={`/product/${i._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            edit
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteProductHandler(i._id, i.name)}>
                                        delete
                                    </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
                </>
            }
        </div>
    )
}

export default AdminProductList
