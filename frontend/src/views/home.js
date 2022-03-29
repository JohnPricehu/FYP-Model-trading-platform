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
import ProductCarousel from '../components/ProductCarousel'
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
  match 
}) => {

  // const history = useHistory();
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const goodsList = useSelector((state) => state.goodsList)
  const { loading, error, goods,
     page, pages
    } = goodsList
  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(listGoods(
      keyword, pageNumber
      ))
  }, [dispatch, 
    keyword, pageNumber
  ]);
  // console.log(goods)
  return (
    <>
    <Meta />
    {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Best-selling models</h1>
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
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
          </>
        )}
  </>
  )
}

export default Home