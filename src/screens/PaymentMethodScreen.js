import React, {useState} from 'react'
import { Form, Col, Button, } from 'react-bootstrap'
import  {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutStatus from '../components/CheckoutStatus'

const PaymentMethodScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if(!shippingAddress)history.push('/shipping')

    const [paymentMethod, setPaymentMethod] = useState('paypal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutStatus step1 step2 step3/>
            <h1>Payment methods'</h1>
            <Form
            onSubmit={(e) => submitHandler(e)}
            >
                <Form.Group>
                    <Form.Label as='legend'>select method</Form.Label>
                <Col>
                    <Form.Check 
                        type='radio' 
                        label='paypal or credit card' 
                        id='paypal' 
                        name='payment method' 
                        value='paypal' 
                        checked 
                        onChange={e => setPaymentMethod(e.target.value)}>
                    </Form.Check>
                </Col>
                </Form.Group>,
                <Button type='submit' variant='primary'>
                    continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentMethodScreen
