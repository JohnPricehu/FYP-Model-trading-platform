import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {listGoodsDetails} from "../actions/goodsActions"
import { Helmet } from 'react-helmet'
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import NavigationLinks from '../components/navigation-links'
import projectStyles from '../style.module.css'
import styles from './goods-details-page.module.css'
import { useParams } from "react-router-dom";

const GoodsDetailsPage = (history) => {
  const dispatch = useDispatch()

  const listDetails = useSelector((state) => state.goodsDetails)
  const { loading,  error, goods } = listDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const params = useParams()
  useEffect(() => {
    // if (successProductReview) {
    //   alert('Review Submitted!')
    //   setRating(0)
    //   setComment('')
    //   dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    // }
    dispatch(listGoodsDetails(params.id))
  }, [dispatch, goods, 
    // successProductReview
  ])
  
  return (
    <div className={styles['container']}>
      <div className={styles['container1']}>
      {loading && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <img
          alt="image"
          src={goods.goods_pic}
          className={styles['image']}
        />
        <h1 className={styles['text']}>{goods.goods_name}</h1>
        <span className={styles['text01']}>
          <span>{goods.goods_details}</span>
          <br></br>
          <span></span>
        </span>
        <button className={` ${styles['button']} ${projectStyles['button']} `}>
          add to favourite
        </button>
        <button className={` ${styles['button1']} ${projectStyles['button']} `}>
          add to shopping cart
        </button>
        <span className={styles['text10']}>Price：${goods.goods_price}</span>
      </div>
      <div className={styles['container2']}>
        <span>Similar goods</span>
        <Link to="/goods-details-page" className={styles['navlink']}>
          <img
            alt="image"
            src={goods.goods_pic}
            className={styles['image1']}
          />
        </Link>
        <span className={styles['text06']}>
          <span className={styles['text07']}>$999</span>
          {/* <span className={styles['text08']}>&amp;</span> */}
        </span>
        <span className={styles['text09']}>goods name</span>
      </div>
    </div>
  )
}

export default GoodsDetailsPage