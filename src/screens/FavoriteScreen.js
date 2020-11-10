import React, { useState, useEffect} from 'react'
import {  Button, Card, Col, Row, Accordion } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { listProducts, } from './../actions/productAction'
import Loader from '../components/Loader'
import { updateUser } from '../actions/userActions'
import Product from '../components/Product'

function FavoriteScreen({location, history}) {

     const dispatch = useDispatch()
     
     const userLogin = useSelector(state => state.userLogin)
     const [userInfo, setUserInfo] = useState(userLogin.userInfo)
 
     const updateProfile = useSelector(state => state.updateProfile)

     const productList = useSelector(state => state.productList)
     let { loading, error, products } = productList

     console.log(productList);
 
     useEffect(() => {
        if(!userInfo){
            history.push('/login')
           }else{
            dispatch(listProducts())
         if(updateProfile.success && updateProfile.userInfo){
             setUserInfo(updateProfile.userInfo)
             localStorage.setItem('userInfo', JSON.stringify(updateProfile.userInfo))
         }
        }
     }, [dispatch, updateProfile, history, userInfo])

     const deleteFavoriteHandler  =(favToDel) => {
        if(window.confirm(`are you sure to delete ${favToDel.name}`)){userInfo.favorites = userInfo.favorites.filter(f => f._id !== favToDel._id)
        dispatch(updateUser(userInfo))}
     }

    return ( 
        <Col>
        {error && <p>{JSON.stringify(error)}</p>}
        {
            userInfo.favorites.map((f,i) => (
                 <Accordion key={i} defaultActiveKey="1">
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle  as={Button} variant="link" eventKey="0">
                        <Row>
                        <h3>{f.name}</h3>
                        </Row>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                          <Col>

                            <Row>{
                            loading ? <Loader /> : 
                            (products
                                .filter(p => f.list.includes(p._id))
                                .map((p,i) => 
                        <Col sm={12} md={6} lg={4} key={i} as='div'>
                            <Product product={p}/>
                        </Col>))}
                            </Row>
                            <Button 
                            variant='danger'
                            size="sm"
                            onClick={() => deleteFavoriteHandler(f)}
                        >delete {f.name}</Button>
                          </Col>
                          </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
            ))
        }
        </Col>
    )
}

export default FavoriteScreen

