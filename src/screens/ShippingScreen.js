import React, { useState } from 'react'
import { Form,  Button, } from 'react-bootstrap'
import  {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutStatus from '../components/CheckoutStatus'

const ShippingScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address?shippingAddress.address:'')
    const [city, setCity] = useState(shippingAddress.city?shippingAddress.city:'')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode?shippingAddress.postalCode:'')
    const [country, setCountry] = useState(shippingAddress.country?shippingAddress.country:'')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutStatus step1 step2 />
            <h1>shippin'</h1>
            <Form
            onSubmit={(e) => submitHandler(e)}
            >
                <Form.Group controlId='address'>
                <Form.Label>
                    address
                </Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='enter address' 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    />
                </Form.Group>
                <Form.Group controlId='city'>
                <Form.Label>
                    city
                </Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='enter city' 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)}
                    required
                    />
                </Form.Group>
                <Form.Group controlId='postalCode'>
                <Form.Label>
                    postalCode
                </Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='enter postalCode' 
                    value={postalCode} 
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                    />
                </Form.Group>
                <Form.Group controlId='country'>
                <Form.Label>
                    postalCode
                </Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='enter country' 
                    value={country} 
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    />
                </Form.Group>
                <Button type='submit' variant='primary'>
                    proceed in payment
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
