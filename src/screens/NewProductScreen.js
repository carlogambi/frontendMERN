import React, {useState, useEffect} from 'react'
import {  Row, Col, Image, Form} from 'react-bootstrap'
import  {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import { createProductAction } from '../actions/productAction'
import toBase64 from './utils/imageToBase64'
import Message from '../components/Message'

const NewProduct = ({history}) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let actionResult

    const createProduct = useSelector(state => state.createProduct)
    const { loading, success, message } = createProduct

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState(undefined)
    const [countInStock, setCountInStock] = useState(0)
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(undefined)

    const [state, setState] = useState('initial')
    
    useEffect(() => {   
        !(userInfo&&userInfo.isAdmin) && history.push('/login')
        message && setState('resRecived')
        !(state === 'initial' 
            || state === 'sendingReq' 
            || state === 'resRecived') && setState('initial')
        
    }, [history, userInfo, loading,  state, setState, message])

    const submitHandler = (e) => {
        e.preventDefault()
        if(name === '' || price === 0 || !image){
            alert('unable to create new product without a IMAGE, a PRICE and a NAME')
        }else{
            const formData= new FormData()
            formData.append('image', file)
            formData.append('name',name)
            formData.append('description',description)
            formData.append('brand',brand)
            formData.append('category',category)
            formData.append('countInStock',countInStock)
            formData.append('price',price)
            formData.append('user',userInfo._id)
            dispatch(createProductAction(formData))
            setState('sendingReq')
        }

    } 

    const imageHandler = async(e) => {
        const file = e.target.files[0]
        if(file){
        const filePreview = await toBase64(file)
        setImage(filePreview)
        setFile(file)
        }
    }

    return (
        <Row>
            <Col md={4}>
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
                onChange={(e) => setName(e.target.value)}
                />
        </Form.Group>
        <Form.Group controlId='description'>
            <Form.Label>
            description
            </Form.Label>
            <Form.Control  
                as='textarea' 
                placeholder='enter name' 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                />
        </Form.Group>
        <Form.Group controlId='brand'>
            <Form.Label>
            brand
            </Form.Label>
            <Form.Control  
                as='textarea' 
                placeholder='enter name' 
                value={brand} 
                onChange={(e) => setBrand(e.target.value)}
                />
        </Form.Group>
        <Form.Group controlId='category'>
            <Form.Label>
            category
            </Form.Label>
            <Form.Control  
                as='textarea' 
                placeholder='enter name' 
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
                price
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
                count in stock
            </Form.Label>
            <Form.Control 
                type='number' 
                placeholder='number' 
                value={countInStock} 
                onChange={(e) => setCountInStock(Math.abs(e.target.value))}
                />
        </Form.Group>
       
            <button 
            type='submit'
            variant='primary'
            >
                update
            </button>
            {actionResult}
    </Form>
    </Col>
    <Col md={3}>
    </Col>
    <Col md={3}>
    <h1>new product</h1>
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
    )
}

export default NewProduct
