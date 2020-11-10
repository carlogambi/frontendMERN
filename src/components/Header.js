import React from 'react'
import  { useDispatch, useSelector } from 'react-redux'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {

    const dispatch = useDispatch()

    const state = useSelector(state => state.userLogin)
    const  { userInfo } = state

    const cart = useSelector(state => state.cart)

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="light" expand="lg">

                <LinkContainer to='/'>
                    <Navbar.Brand >
                        mern shop
                    </Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="mr-auto">

                        <LinkContainer to='/cart'>
                            <Nav.Link >
                                <i className='fas fa-shopping-cart'></i>
                                cart({cart && <>{cart.cartItems.length}</>})
                            </Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                            //user dropdown if logged in
                            <NavDropdown title={userInfo.name} id='userName'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>
                                        profile
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/favorites'>
                                    <NavDropdown.Item>
                                    favorites
                                    </NavDropdown.Item>
                                </LinkContainer>
                                    <NavDropdown.Item onClick={() => logoutHandler()}>
                                        logout
                                    </NavDropdown.Item>
                            </NavDropdown>
                        ):(
                            //login page if not logged in
                            <LinkContainer to='/login'>
                            <Nav.Link >
                                sign in
                            </Nav.Link>
                        </LinkContainer>
                        )}
                        
                            {
                                (userInfo && userInfo.isAdmin) && (
                                    <NavDropdown title={'admin'} id='admiMenu'>
                                    <LinkContainer to='/admin/userList'>
                                        <NavDropdown.Item>
                                            users
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productList'>
                                        <NavDropdown.Item>
                                            products
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>
                                            orders
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                                )
                            }
                    </Nav>

                </Navbar.Collapse>

            </Navbar>
        </header>
    )
}

export default Header
