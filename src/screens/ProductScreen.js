import React, { useState, useEffect} from 'react'
import { Badge, Button, Card, Col, Form, Image, ListGroup, Row, Accordion } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import Rating from './../components/Rating'
import { getProductDetails, newReviewAction } from './../actions/productAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_DETAILS_RESET } from '../constants/productConstants'
import SetRating from '../components/SetRating'
import { updateUser } from '../actions/userActions'
import Meta from '../components/Meta'

function ProductScreen({history, match}) {


    const [quantity, setquantity] = useState(1)

    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewBody, setReviewBody] = useState('')
    const [newFavoritesName, setNewFavoritesName] = useState('')
    const [reviewRating, setReviewRating] = useState(0)

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    
    const userLogin = useSelector(state => state.userLogin)
    const [userInfo, setUserInfo] = useState(userLogin.userInfo)

    const updateProfile = useSelector(state => state.updateProfile)

    useEffect(() => {
        
        dispatch(getProductDetails(match.params.id))  
        if(updateProfile.success && updateProfile.userInfo){
            setUserInfo(updateProfile.userInfo)
            localStorage.setItem('userInfo', JSON.stringify(updateProfile.userInfo))
        }
    }, [dispatch, match, updateProfile])

    const buyableQuantityList = () => {
        let buyableList = []
        buyableList.length = product.countInStock
        return buyableList.fill().map((n,i) => <option key={i+1} value={i+1}>{i+1}</option>)
    }
    
    const addToCart = (e) => {
        history.push(`/cart/${match.params.id}?quantity=${quantity}`)
    }


    const addreviewHandler = () => {
        const review = {
            userName: userInfo.name,
            userId: userInfo._id,
            rating: reviewRating
        }
        if(reviewTitle !== ''){review.title = reviewTitle}
        if(reviewBody !== ''){review.comment = reviewBody}
        dispatch(newReviewAction(product._id, review))
        window.location.reload()
    }

    const createNewFavouritesHandler = () => {
        if(!userInfo.favorites)userInfo.favorites=[]
        userInfo.favorites.push({
            name: newFavoritesName,
            list: [product._id]

        })
        dispatch(updateUser(userInfo))
        // setFavoritesList(userInfo.favorites)
    }

    const addToFavoritesHandler = (favId) => {
        
        userInfo.favorites.forEach(f => {
            if(f._id === favId){
                if(!f.list.includes(product._id)){
                    f.list.push(product._id)
                    dispatch(updateUser(userInfo))
                }
            }
        })
    }
    return (
        <>
            <Link className='btn btn-white my-3' to='/' onClick={() => dispatch({type: PRODUCT_DETAILS_RESET})}>
                back
            </Link>
            {
                loading ? 
                <Loader /> 
                : error ? 
                <Message variant='danger'>{error}</Message>
                :
                <>
                    <Row>
                <Meta title={product.name}/>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid/>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>{product.name}</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {product.rating && (<Rating value={product.rating} text={`${product.numReviews} reviews`} />)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            price:
                                        </Col>
                                        <Col>
                                        <strong>
                                            {product.price}
                                        </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            status:
                                        </Col>
                                        <Col>
                                        <strong>
                                            {product.countInStock>0?'in stock':'out of stock'}
                                        </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock >0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                            quantity
                                            </Col>
                                            <Col>
                                            <Form.Control as='select' value={quantity} onChange={e => setquantity(e.target.value)}>
                                                {buyableQuantityList()}
                                            </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}

                                <ListGroup.Item>
                                    <Button 
                                        onClick={(e) => addToCart(e)}
                                        className='btn-block' 
                                        type='button' 
                                        disabled={product.countInStock === 0}
                                    >
                                        Add to Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                        {
                            userInfo && (
                                <Card>
                                    <Accordion defaultActiveKey="1">
                                      <Card>
                                        <Card.Header>
                                          <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                            <h3>favorites</h3>
                                          </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                          <Card.Body>
                                            {userInfo.favorites.length > 0 && <h5>current in</h5>} 
                                                <Col style={{marginBottom: '20px'}}>
                                                    {
                                                        userInfo.favorites && userInfo.favorites.filter(
                                                            f => f.list.includes(product._id)
                                                        ).map((f, i) => <Badge variant='dark' key={i}>{f.name.toUpperCase()}</Badge>)
                                                    }
                                                </Col>
                                              { !loading && 
                                              ( userInfo
                                                    .favorites
                                                    .filter
                                                    (f => {
                                                        console.log(f.list.includes(product._id))
                                                    return (f.list.includes(product._id))
                                                    })
                                                    .length === 0 
                                                || 
                                                userInfo.favorites.length < 0 ) 
                                            && <h5>add to list</h5>
                                            } 
                                              
                                              <Col>
                                                  {userInfo.favorites && userInfo.favorites.map((f,i) => 
                                                    f.list.includes(product._id)?<></>:
                                                    <Button 
                                                        key={i} 
                                                        onClick={() => addToFavoritesHandler(f._id)}
                                                        variant='outline-dark'
                                                        size="sm"
                                                        style={{margin: '10px'}}
                                                    >
                                                        add to {f.name}
                                                    </Button>
                                                  )}
                                              </Col>
                                              <h5>add to new list</h5>
                                              <Row>
                                                <Form.Control
                                                type='text'
                                                style={{width: '70%'}}
                                                placeholder= 'new favorite list'
                                                value={newFavoritesName}
                                                onChange={e => setNewFavoritesName(e.target.value)}
                                                />
                                                <Button
                                                    size="sm"
                                                    onClick={() => createNewFavouritesHandler()}
                                                >
                                                    +
                                                </Button>
                                                </Row>
                                                <Col>

                                                </Col>
                                          </Card.Body>
                                        </Accordion.Collapse>
                                      </Card>
                                    </Accordion>
                                </Card>
                            )
                        }
                    </Col>
                </Row>
                
                <ListGroup.Item style={{borderTop: 'solid 1px white',borderRight: 'solid 1px white', mrginTop: '50px'}}>
                                {
                                    product.reviews.map((p,i) => 
                                    <Row key={i} style={{margin: '20px', marginBottom: '30px'}}>
                                        <ListGroup.Item>
                                        <Col>
                                        <Row><p>
                                        <Rating value={Number(p.rating)} text={``} /><br/> 
                                        <i>{p.userName}</i><br/>
                                        <small>{
                                            p.createdAt
                                            .replace(/T/gm, ', h:')
                                            .replace(/Z|(\.\d\d\d)/gm, ' ')}
                                        </small> 
                                        </p>
                                        
                                        </Row>
                                        {p.title && <Row>
                                        <span>{p.title.toUpperCase()}</span>
                                        </Row>}
                                        {p.comment && <Row>
                                        <p>{p.comment}</p>
                                        </Row>}
                                        </Col>
                                        {/* {JSON.stringify(p)} */}
                                        </ListGroup.Item>
                                    </Row>
                                    )
                                }
                                    </ListGroup.Item>
                                {userInfo && 
                                <Form>  
                                    <ListGroup.Item>
                                        <h3>add revew </h3>
                                        <p>
                                            <SetRating whenClicked={n => setReviewRating(n)} />
                                        </p>
                                        <Row>
                                            <Col>
                                            
                                                <Form.Control 
                                                    type='text' 
                                                    placeholder='title(optional)' 
                                                    value={reviewTitle} 
                                                    onChange={e => setReviewTitle(e.target.value)}
                                                    style={{marginBottom: '10px'}}
                                                />
                                            </Col>
                                            <Col md={2}>
                                                <Button 
                                                    onClick={() => addreviewHandler()}
                                                    className='btn-block' 
                                                    type='button' 
                                                >
                                                    add review
                                                </Button>
                                            </Col>
                                        </Row>
                                        
                                        <Form.Control  
                                            as='textarea' 
                                            placeholder='comment(optional)' 
                                            value={reviewBody} 
                                            onChange={e => setReviewBody(e.target.value)}
                                        />
                                    </ListGroup.Item>
                                    </Form>
                                }
                </>
            }
        </>
    )
}

export default ProductScreen
