import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Row, Col, } from 'react-bootstrap'
import  {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from './../components/Loader'
import { register } from './../actions/userActions'
import FormContainer from '../components/FormContainer'

function RegisterScreen({location, history}) {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [name, setname] = useState('')
    const [confirmPssw, setconfirmPssw] = useState('')
    const [message, setmessage] = useState('')

     const dispatch = useDispatch()

     const userRegister = useSelector(state => state.userRegister)

     const { loading, error, userInfo } = userRegister
     
     const redirect = location.search ? location.search.split('=')[1] : '/'

     useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
     }, [history, userInfo, redirect] )


    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPssw){
            setmessage('passwords not match!')
        }else{
            dispatch(register(name, email, password))
        }
    }
    return (
        <FormContainer>
            <h1>sign up</h1>
            {
                error 
                &&
                <Message variant='danger'>
                    {error}
                </Message>
                }
            {
                message 
                &&
                <Message variant='danger'>
                    {message}
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
            <Form.Group controlId='name'>
                <Form.Label>
                    name
                </Form.Label>
                <Form.Control 
                    type='name' 
                    placeholder='enter name' 
                    value={name} 
                    onChange={(e) => setname(e.target.value)}
                    />
                </Form.Group>
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
            <Form.Group controlId='password'>
                <Form.Label>
                    password
                </Form.Label>
                <Form.Control 
                    type='password' 
                    placeholder='enter password' 
                    value={password} 
                    onChange={(e) => setpassword(e.target.value)}
                    />
            </Form.Group>
            <Form.Group controlId='CONFIRM'>
                <Form.Label>
                    CONFIRM password
                </Form.Label>
                <Form.Control 
                    type='password' 
                    placeholder='confirm password' 
                    value={confirmPssw} 
                    onChange={(e) => setconfirmPssw(e.target.value)}
                    />
            </Form.Group>
                <button 
                type='submit'
                variant='primary'
                >
                    sign in
                </button>
        </Form>
        <Row>
            <Col>
            have an account? 
            <Link to={redirect ? `/login/login=${redirect}` : '/login'}>
                 login here
            </Link>
            </Col>
        </Row>
        </FormContainer>
    )
}

export default RegisterScreen
