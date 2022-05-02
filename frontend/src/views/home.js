import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import Goods from "../components/Goods"
import {listGoods,listBestSalesGoods} from "../actions/goodsActions"
import { useDispatch,useSelector } from "react-redux";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import ProductCarousel from '../components/ProductCarousel'
import {
  Row,
  Col,
  // Container,
  // Form,
  // FormControl,
  // Nav,
  // Navbar,
  // NavDropdown,
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
    } = goodsList;

    useEffect(() => {
      dispatch(listGoods(
        keyword, pageNumber
        ))
    }, [dispatch, 
      keyword, pageNumber
    ]);

  const goodsBestSales = useSelector((state) => state.goodsBestSales)
  const {bsgoods } = goodsBestSales
  
    useEffect(() => {
      dispatch(listBestSalesGoods())
    }, [dispatch])

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
      {!keyword && (
        loading ? (
                <Loading />
              ) : error ? (
                <ErrorMessage variant='danger'>{error}</ErrorMessage>
              ) : (
                <>
                <h1>Best-Sales models</h1>
                <Row>
                    {bsgoods.map((goods) => (
                      <Col key={goods._id} sm={12} md={6} lg={4} xl={3}>
                        <Goods goods={goods} />
                      </Col>
                    ))}
                  </Row>
                  </>
                  // )}
      ))}
            {/* {!keyword && (
              userInfo && userInfo.isMember  && (
              loading ? (
                <Loading />
              ) : error ? (
                <ErrorMessage variant='danger'>{error}</ErrorMessage>
              ) : (
                <>
                <h1>Special models</h1>
                <Row>
                    {sgoods.map((goods) => (
                      <Col key={goods._id} sm={12} md={6} lg={4} xl={3}>
                        <Goods goods={goods} />
                      </Col>
                    ))}
                  </Row>
                  </>
                  // )}
      )))} */}
      {!keyword ? (
      <h1>All models</h1>
      ) : (
        <h1>Searched models</h1>
        )}
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