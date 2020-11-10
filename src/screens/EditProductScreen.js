import React, {useState, useEffect} from 'react'
import {  Row, Col, Image, Form, Button, Table} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import  {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import { editProductAction, getProductDetails } from '../actions/productAction'
import toBase64 from './utils/imageToBase64'
import Message from '../components/Message'

const EditProduct = ({history, match}) => {

    
    const productId = match.params.id
    
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    
    const editProduct = useSelector(state => state.editProduct)
    const { success, message } = editProduct
    
    const productDetails = useSelector(state => state.productDetails)
    const {product, loading: productLoading, error} = productDetails

    error && alert(error)
    const [name, setName] = useState(undefined)
    const [description, setDescription] = useState(undefined)
    const [brand, setBrand] = useState(undefined)
    const [category, setCategory] = useState(undefined)
    const [image, setImage] = useState(undefined)
    const [countInStock, setCountInStock] = useState(undefined)
    const [price, setPrice] = useState(undefined)
    const [file, setFile] = useState(undefined)

    const [state, setState] = useState('initial')


    const imageHandler = async(e) => {
        const file = e.target.files[0]
        if(file){
        const filePreview = await toBase64(file)
        setImage(filePreview)
        setFile(file)
        }
    }

    
    useEffect(() => {   
        !(userInfo&&userInfo.isAdmin) && history.push('/login')
        message && setState('resRecived')
        !(state === 'initial' 
        || state === 'ready'
        || state === 'sendingReq' 
        || state === 'resRecived') && setState('initial')
        dispatch(getProductDetails(productId))
        if(!productLoading && state === 'initial')setState('ready')
        if(state === 'ready' && !image)setImage(product.image)
        if(state === 'ready' && !name)setName(product.name)
        if(state === 'ready' && !description)setDescription(product.description)
        if(state === 'ready' && !brand)setBrand(product.brand)
        if(state === 'ready' && !category)setCategory(product.category)
        if(state === 'ready' && !countInStock)setCountInStock(product.countInStock)
        if(state === 'ready' && !price)setPrice(product.price)
    }, [history, userInfo, productId, state,
         setState, message, dispatch, productLoading
         , image, product,  name, description, 
         brand, category, countInStock, price,])

    const submitHandler = (e) => {
        e.preventDefault()
        if(name === '' || price === 0 || !image){
            alert('unable to create new product without a IMAGE, a PRICE and a NAME')
        }else{
            const formData= new FormData()
            formData.append('image', file?file:'not changed')
            formData.append('name',name)
            formData.append('description',description)
            formData.append('brand',brand)
            formData.append('category',category)
            formData.append('countInStock',countInStock)
            formData.append('price',price)
            formData.append('user',userInfo._id)
            formData.append('productId',product._id)
            console.log(formData.get('image'));
            dispatch(editProductAction(formData, product._id))
            setState('sendingReq')
        }

    } 

    return (
        productLoading?<Loader />:(<><Row>

            <Col md={4}>
            <Form
            onSubmit={(e) => submitHandler(e)}
                autoComplete='on'
                >
        <Form.Group controlId='name'>
            <LinkContainer to={`/admin/productList`}>
                <Button variant='dark' className='btn-sm'>
                    back to list
                </Button>
            </LinkContainer><br/><br/>
                <h3>edit product</h3>
        <Button 
            type='submit'
            variant='success'
            className='btn-sm'
            >
                <h3>update</h3>
            </Button><br/>
            <Form.Label>name
            </Form.Label>
            <Form.Control 
                type='name' 
                placeholder='new name' 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                />
        </Form.Group>
        <Form.Group controlId='description'>
            <Form.Label>description
            </Form.Label>
            <Form.Control  
                as='textarea' 
                placeholder='new description' 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                />
        </Form.Group>
        <Form.Group controlId='brand'>
            <Form.Label>brand
            </Form.Label>
            <Form.Control  
                as='textarea' 
                placeholder='new brand' 
                value={brand} 
                onChange={(e) => setBrand(e.target.value)}
                />
        </Form.Group>
        <Form.Group controlId='category'>
            <Form.Label>category
            </Form.Label>
            <Form.Control  
                as='textarea' 
                placeholder='new category' 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                />
        </Form.Group>
        <Form.Group controlId='image'>
            <Form.Label>
                image
            </Form.Label>
            <Form.File 
                accept="image/*"
                label='image-file'
                customid='image-file'
                name='image'
                custom
                onChange={imageHandler}
                />
        </Form.Group>
        <Form.Group controlId='price'>
            <Form.Label>
            </Form.Label>
            <Form.Control 
                type='number' 
                placeholder='number' 
                value={price} 
                onChange={(e) => setPrice(Math.abs(e.target.value))}
                />
        </Form.Group>
        <Form.Group controlId='countInStock'>
            <Form.Label>
            </Form.Label>
            <Form.Control 
                type='number' 
                placeholder='number' 
                value={countInStock} 
                onChange={(e) => setCountInStock(Math.abs(e.target.value))}
                />
        </Form.Group>
       

    </Form>
    </Col>
    <Col md={3}>
    </Col>
    <Col md={3}>
    <h1>{name}</h1>
    <p>current image</p>
        {image?<Image src={image} alt='product image preview' fluid rounded />:'No image uploaded'}         
        {state === 'sendingReq' && <Loader />}<br/>
        {state === 'resRecived' &&(
            success
            ?<Message variant='success'>{message}</Message>
            :<Message variant='danger'>{message}</Message>
            )
        }
    </Col>
        </Row>
        <h3>manage comments</h3>
        <Table striped bordered hover responsive>
            <thead><tr>
                <th>rating</th>
                <th>user</th>
                <th>date</th>
                <th>title</th>
                <th>comment</th>
                <th>actions</th>
            </tr>
            </thead>
            <tbody>
        {
            product.reviews.map((r,i) => 
            // <p>{JSON.stringify(p)}</p>
            <tr key={i}>
                <td>{r.rating}/5</td>
                <td>{r.userName}</td>
                <td>{
                    r.createdAt
                    .replace(/T/gm, ', h:')
                    .replace(/Z|(\.\d\d\d)/gm, ' ')
                    }</td>
                <td>{r.title}</td>
                <td>{r.comment}</td>
                <td><Button variant='danger'>delete</Button></td>
            </tr>
            )
        }
            </tbody>
        </Table>
        </>
        )
    )
}

export default EditProduct
