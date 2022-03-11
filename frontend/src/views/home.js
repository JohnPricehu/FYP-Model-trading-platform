import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Goods from "../components/Goods"
import {listGoods} from "../actions/goodsActions"
import NavigationLinks from '../components/navigation-links'
import projectStyles from '../style.module.css'
// import styles from './home.module.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import {
  Row,
  Col,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";

const Home = ({ 
  // match 
}) => {
  
  // useEffect(() => {
  //   dispatch(listProducts(keyword, pageNumber))
  // }, [dispatch, keyword, pageNumber])

  // const history = useHistory();
  // const keyword = match.params.keyword
  // const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const goodsList = useSelector((state) => state.goodsList)
  const { loading, error, goods,
    //  page, pages
    } = goodsList
  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(listGoods(
      // keyword, pageNumber
      ))
  }, [dispatch, 
    // keyword, pageNumber
  ]);
  // console.log(goods)
  return (
    // <div className={styles['container']}>
    //       <header className={styles['Header']}>
    //     <div className={styles['container1']}>
    //       <div className={styles['Nav']}>
    //         <NavigationLinks rootClassName="rootClassName1"></NavigationLinks>
    //       </div>
    //     </div>
    //     <Nav>
    //         {userInfo ? (
    //           <>
    //             <Nav.Link href="/">Home page</Nav.Link>
    //             <NavDropdown.Divider />
    //             <NavDropdown
    //               title={`${userInfo.name}`}
    //               id="collasible-nav-dropdown"
    //             >
    //             <NavDropdown.Divider />
    //               <NavDropdown.Item href="/user-file-page">
    //                 {/* <img
    //                   alt=""
    //                   src={`${userInfo.pic}`}
    //                   width="25"
    //                   height="25"
    //                   style={{ marginRight: 10 }}
    //                 /> */}
    //                 My Profile
    //               </NavDropdown.Item>

    //               <NavDropdown.Divider />
    //               <NavDropdown.Item onClick={logoutHandler}>
    //                 Logout
    //               </NavDropdown.Item>
    //               <NavDropdown.Divider />
    //               <NavDropdown.Item href="/sell-goods-page">
    //               Sell
    //               </NavDropdown.Item>
    //             </NavDropdown>
    //           </>
    //         ) : (
    //           <Nav.Link href="/login-page">Login</Nav.Link>
    //         )}
    //       </Nav>
    //   </header>
    //   {/* <div className={styles['BtnGroup']}> */}
    //   {/* <Typography  className={classes.title}> */}
     
    //   {/* </div> */}
      
    //   <video
    //     src
    //     poster="https://play.teleporthq.io/static/svg/videoposter.svg"
    //     className={styles['video']}
    //   ></video>
    <>
    <Meta />
      <h1 
      // className={styles['text']}
      >Best-selling models</h1>
      {/* <div className={styles['container2']}> */}
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage variant='danger'>{error}</ErrorMessage>
      ) : (
        <>
        <Row>
            {goods.map((goods) => (
              <Col key={goods._id} sm={12} md={6} lg={4} xl={3}>
                <Goods goods={goods} />
              </Col>
            ))}
          </Row>
          </>
        )}

  {/* // ) */}
  </>
  )
}

export default Home