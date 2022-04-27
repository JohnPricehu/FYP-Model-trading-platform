import React, { useEffect } from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {} from "react-router-dom";
import { logout } from "../actions/userActions";
import SearchBox from './SearchBox'
import MemberSearchBox from './memberSearchBox'
import { useHistory } from "react-router-dom";

const Header= (
  // {history}
  ) => {

  const dispatch = useDispatch();
  let history = useHistory();
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/');
  };

  useEffect(() => {}, [userInfo]);

  return (
    <div>
    <header>
    <Navbar
      style={{ backgroundColor: '#2E2E2E' }}
      variant='dark'
      fixed='top'
      expand='lg'
      collapseOnSelect
    >
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Model Trading System</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          {userInfo && userInfo.isMember ? (
            <Route render={({ history }) => <MemberSearchBox history={history} />} />
          ) : (
            <Route render={({ history }) => <SearchBox history={history} />} />
          )}
          
          <Nav className='ml-auto' sticky="true">
          {/* <LinkContainer to='/sell-goods'>
              <Nav.Link>
                <i className='fas fa-sell-goods'></i>Sell
              </Nav.Link>
            </LinkContainer> */}
            {/* <LinkContainer to='/cart'>
              <Nav.Link>
                <i className='fas fa-shopping-cart'></i>Cart
              </Nav.Link>
            </LinkContainer> */}
            {userInfo && userInfo.isMember && (
              <LinkContainer to='/special'>
                <Nav.Link>
                  <i className='fas fa-user'>Special</i>
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/sell-goods'>
                  <NavDropdown.Item>Sell</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/cart'>
                  <NavDropdown.Item>Shopping Cart</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/favourite'>
                  <NavDropdown.Item>Favourites</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/wanted'>
                  <NavDropdown.Item>Wanted</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/history'>
                  <NavDropdown.Item>History</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link>
                  <i className='fas fa-user'>Login</i>
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminmenu'>
                <LinkContainer to='/admin/userlist'>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/productlist'>
                  <NavDropdown.Item>Models</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to='/admin/orderlist'>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
  </div>
  );
}

export default Header;