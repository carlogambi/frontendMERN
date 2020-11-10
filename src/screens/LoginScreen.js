import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Row, Col, } from 'react-bootstrap'
import  {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from './../components/Loader'
import { login } from './../actions/userActions'
import FormContainer from '../components/FormContainer'

function LoginScreen({location, history}) {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

     const dispatch = useDispatch()

     const userLogin = useSelector(state => state.userLogin)

     const { loading, error, userInfo } = userLogin
     
     const redirect = location.search ? location.search.split('=')[1] : '/'

     useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
     }, [history, userInfo, redirect] )


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    return (
        <FormContainer>
            <h1>sign in</h1>
            {
                error 
                &&
                <Message variant='danger'>
                    {error}
                </Message>
                }
            {
                loading 
                &&
                <Loader />
                }
        <Form
            onSubmit={(e) => submitHandler(e)}
        >
            <Form.Group controlId='email'>
                <Form.Label>
                    email address
                </Form.Label>
                <Form.Control 
                    type='email' 
                    placeholder='enter email' 
                    value={email} 
                    onChange={(e) => setemail(e.target.value)}
                />
                </Form.Group>
                <Form.Group controlId='pssw'>
                <Form.Label>
                    password
                </Form.Label>
                <Form.Control 
                    type='password' 
                    placeholder='enter password' 
                    value={password} 
                    onChange={(e) => setpassword(e.target.value)}
                    />
                <button 
                type='submit'
                variant='primary'
                >
                    sign in
                </button>
                </Form.Group>
        </Form>
        <Row>
            <Col>
            new Costumer? 
            <Link to={redirect ? `/register/redirct=${redirect}` : '/register'}>
                register here
            </Link>
            </Col>
        </Row>
        </FormContainer>
    )
}

export default LoginScreen
