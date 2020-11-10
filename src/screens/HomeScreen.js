import React, { useEffect, useState} from 'react'
import { Row, Col, Form, Button, Accordion, Card } from 'react-bootstrap'
import Product from './../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from './../actions/productAction'
import Message from './../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'

function HomeScreen() {

    const dispatch = useDispatch()

    const [query, setQuery] = useState('')
    const [lowPriceFirst, setLowPriceFirst] = useState(true)

    const productList = useSelector(state => state.productList)
    let { loading, error, products } = productList

    let productsQueries
    if(products){
        productsQueries = products
    }
    
    const searchProduct = (query) => {
        if(products){
        query = new RegExp(query, 'i')
        return products.filter(p => 
            p.name.match(query) ||
            p.brand.match(query) ||
            p.category.match(query) ||
            p.description.match(query) ||
            p.createdAt.match(query) 
            )}
        }
        
        products = searchProduct(query).sort((a, b) =>  a.price-b.price)
        if(!lowPriceFirst){
            products = searchProduct(query).reverse()
        }
            
        useEffect(() => {   
            dispatch(listProducts())
        }, [dispatch,])

        const setSearch = newQuery => {
            setQuery('')
            const loop = newQuery.length 
            for (let i = 0; i < loop; i++) {
                ((i) => {
                  setTimeout(() => { 
                    setQuery(q => `${q}${newQuery.charAt(i)}`)
                 }, 100 * i);
                })(i);
              }
        }

    return (
        <>
            <Meta />
            <h1>latest products </h1>
            <Row>

            </Row>
            <Accordion defaultActiveKey="1" style={{width: '100%'}}>
                  <Accordion.Toggle as={Card.Body} variant="link" eventKey="0">
                  <Form.Control 
                style={{ width: '80%'}}
                type='text' 
                placeholder='search product' 
                value={query}
                onChange={e => setQuery(e.target.value)}
                />
                  </Accordion.Toggle>
                
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                <Row>
                  <Col>
                <h5>show first</h5>
                <Accordion.Toggle as={Card.Body} variant="link" eventKey="0">             
                <Button variant='secondary' onClick={() => setLowPriceFirst(true)}>
                    price: low to high
                </Button>
                </Accordion.Toggle>
                <Button variant='secondary' onClick={() => setLowPriceFirst(false)}>
                    price: high to low
                </Button>
            
                    </Col>
                    <Col>
                    <h5>category</h5>
                    {
                    [...new Set(productsQueries.map(p => p.category))]
                        .map((p,i) => 
                            <Button variant='secondary' key={i} onClick={() => setSearch(p)}>
                                {p}
                            </Button>)
                    }</Col>
                    <Col>
                    <h5>brand</h5>
                    {
                    [...new Set(productsQueries.map(p => p.brand))]
                        .map((p,i) => 
                            <Button variant='secondary' key={i} onClick={() => setSearch(p)}>
                                {p}
                            </Button>)
                    }</Col>
                </Row>
                  </Card.Body>
                </Accordion.Collapse>
              
            </Accordion>
            {
            loading 
            ? <Loader/>
            : 
                error
                ? <Message variant='danger' >{error}</Message>
                :   <Row>
                        {
                        (query === '')
                        ?
                        (products.map((p,i) => 
                        <Col sm={12} md={6} lg={4} key={i} as='div'>
                            <Product product={p}/>
                        </Col>))
                        :
                        (searchProduct(query, products).map((p,i) => 
                        <Col sm={12} md={6} lg={4} key={i} as='div'>
                            <Product product={p}/>
                        </Col>
                        ))
                        }
                    </Row>}

        </>
    )
}

export default HomeScreen
