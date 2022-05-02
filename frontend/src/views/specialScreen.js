import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import Goods from "../components/Goods"
import {listSpecialGoods,listAllGoods} from "../actions/goodsActions"
import { useDispatch,useSelector } from "react-redux";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import {
  Row,
  Col,
} from "react-bootstrap";

const SpecialScreen = ({ 
  match 
}) => {

  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const goodsListAll = useSelector((state) => state.goodsListAll)
  const { loading, error, goods,
     page, pages
    } = goodsListAll;

    useEffect(() => {
      dispatch(listAllGoods(
        keyword, pageNumber
        ))
    }, [dispatch, 
      keyword, pageNumber
    ]);

  const goodsSpecial = useSelector((state) => state.goodsSpecial)
  const {sgoods } = goodsSpecial
  
    useEffect(() => {
      dispatch(listSpecialGoods())
    }, [dispatch])
    
  return (
    <>
    <Meta />
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
            {
            !keyword && (
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
      ))
      )
      }
      {keyword && (
        //  {
        loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage variant='danger'>{error}</ErrorMessage>
      ) : (
        <>
        <h1>Searched models</h1>
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
        )
            // }
     )} 
        
  </>
  )
}

export default SpecialScreen