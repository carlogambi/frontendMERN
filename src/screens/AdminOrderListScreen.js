import React, { useEffect} from 'react'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import  {useDispatch, useSelector} from 'react-redux'
import { getAllUsersOrders } from '../actions/orderAction'
import Loader from '../components/Loader'
import Message from '../components/Message'


const AdminOrderListScreen = ({history}) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const adminAllOrders = useSelector(state => state.adminAllOrders)
    let { loading, orders, error } = adminAllOrders

    useEffect(() => {
        if(!(userInfo&&userInfo.isAdmin))history.push('/login')
        dispatch(getAllUsersOrders())
        
    }, [dispatch, history, userInfo])
    if(orders){
    const toDeliver = orders.filter(o => !o.isDelivered)
    const toPay = orders.filter(o => !o.isPaid)
    const otherOrders = orders.filter(o => o.isPaid && o.isDelivered)
    toDeliver.concat(toPay)
    const acc = toDeliver.concat(toPay, otherOrders);
    console.log(acc);
    orders = acc
}

    return (
        <div>
            admin order list
            {
            loading
            ? 
                <Loader />
            :
                error ? 
                    <Message variant="danger">
                        {JSON.stringify(error)}
                    </Message>
                    :
                    <Table striped bordered hover responsive className='table'>
                                        <thead>
                    <tr>
                        <th>order id</th>
                        <th>user</th>
                        <th>paid</th>
                        <th>shipped</th>
                        <th>edit</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        orders && orders.map((o, i) => (
                            <tr key={i}>
                                <td>
                                    {o._id}
                                </td>
                                <td>
                                    {o.user.name}
                                </td>
                                <td>
                                    {o.isPaid?<Message variant='success'>paid</Message>:<Message variant='danger'>NOT PAID</Message>}
                                </td>
                                <td>
                                    {o.isDelivered?<Message variant='success'>shipped</Message>:<Message variant='danger'>NOT SHIPPED</Message>}
                                </td>
                                <td md={4}>                                    
                                    <LinkContainer to={`/orders/${o._id}`}>
                                        <Button variant='light' className='btn-sm'>
                                            DETAIL
                                        </Button>
                                    </LinkContainer>
                                    <LinkContainer to={`/order/${o._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            EDIT
                                        </Button>
                                    </LinkContainer>

                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                    </Table>
                    }
        </div>
    )
}

export default AdminOrderListScreen
