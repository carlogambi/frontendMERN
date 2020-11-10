import React, {useEffect} from 'react'
import { Table, Button } from 'react-bootstrap'
import  {useDispatch, useSelector} from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from './../components/Loader'
import { deleteUser, listUsers, updateUser} from './../actions/userActions'

const UserListScreen = ({history}) => {

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const  { success: successDelete} = userDelete

    const updateProfile = useSelector(state => state.updateProfile)
    const  { success: updateSuccess} = updateProfile

    useEffect(() => {
        if(userInfo&&userInfo.isAdmin){
            dispatch(listUsers())
        }else{
            history.push('/login')
        }
    }, [successDelete,dispatch, history, userInfo, updateSuccess])

    const deleteHandler = (userId) => {
        window.confirm(`are you sure to delete ${users.find(u => u._id === userId).name} ?`) &&  dispatch(deleteUser(userId))
    }

    const makeAdminHandler = (usrId, alreadyAdmin) => {
        const user = users.find(u => u._id === usrId)
        console.log(user);
        if(
            window.confirm(
                `are you sure to make ${user.name} ${alreadyAdmin?'NORMAL USER':'ADMIN'} ?`)
        ){
            user.isAdmin = !user.isAdmin;
            dispatch(updateUser(user))
        }
    }

    return (
        <>
            <h1>users</h1>   
            {loading ? <Loader /> : 
            error? <Message variant='danger'>{error}</Message> :
            <Table striped bordered hover responsive className='table'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>email</th>
                        <th>role</th>
                        <th>operations</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users && users.map(
                            (usr, id) => 
                            <tr key={usr._id}>
                                <td>
                                    {usr._id}
                                </td>
                                <td>
                                    {usr.name}
                                </td>
                                <td><a href={`mailto:${usr.email}`}>
                                    {usr.email}
                                </a>
                                </td>
                                <td>
                                    {
                                        usr.isAdmin?'admin':'normal'
                                    }
                                </td>
                                <td md={4}>                                    
                                    {
                                    usr.isAdmin
                                    ? 
                                    <>
                                        <Button variant='success'  className='btn-sm' onClick={() => makeAdminHandler(usr._id, true)}>
                                            make not admin
                                        </Button>
                                    </>
                                    :
                                    <>
                                        <Button variant='danger'  className='btn-sm' onClick={() => makeAdminHandler(usr._id, false)}>
                                            make admin
                                        </Button>
                                    </>
                                    }
                                    <LinkContainer to={`/user/${usr._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            EDIT
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(usr._id)}>
                                        DELETE
                                    </Button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
            }
        </>
    )
}

export default UserListScreen
