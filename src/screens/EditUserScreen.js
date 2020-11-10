import React, {useState, useEffect} from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import  {useDispatch, useSelector} from 'react-redux'
// import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {  getUserByIdAction, updateUser } from '../actions/userActions'

const EdituserScreen = ({match, history}) => {

    const currentId = match.params.id
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const getUserById = useSelector(state => state.getUserById);
    const { user, loading, error } = getUserById

    const success = useSelector(state => state).updateProfile.success === true ? true : false;
    
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [name, setname] = useState('')
    const [confirmPssw, setconfirmPssw] = useState('')
    const [message, setmessage] = useState('')
    console.log(message);
    if(user && email === '')setemail(user.email)
    if(user && name === '')setname(user.name)

    console.log({user}, {userInfo})

    useEffect(() => {
        if(userInfo&&userInfo.isAdmin){
            dispatch(getUserByIdAction(currentId))
        }else{
            history.push('/login')
        }
    }, [dispatch, userInfo, history, currentId])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password !== confirmPssw){
            setmessage('passwords not match!')
        }else{
            dispatch(updateUser({name,email,password, _id: user._id}))
        }
    }
    
    return <Row>
        <Col md={3}>
        <h2>user profile</h2>
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
                autoComplete='on'
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
                autoComplete='on'
            />
        </Form.Group>
            <button 
            type='submit'
            variant='primary'
            >
                update
            </button>
            {success && <h3>success!</h3>}
    </Form>
    </Col>
    </Row>
    
}

export default EdituserScreen
