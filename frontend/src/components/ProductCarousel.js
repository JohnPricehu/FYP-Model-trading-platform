import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel, Image } from 'react-bootstrap'
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import { listTopGoods } from '../actions/goodsActions'


const ProductCarousel = () => {
  const dispatch = useDispatch()

  const goodsTopRated = useSelector((state) => state.goodsTopRated)
  const { loading, error, goods } = goodsTopRated

  useEffect(() => {
    dispatch(listTopGoods())
  }, [dispatch])
  return loading ? (
      <Loading />
    ) : error ? (
      <ErrorMessage variant='danger'>{error}</ErrorMessage>
  ) : (
    <Carousel pause='hover' className='bg-dark mt-3 '>
      {goods.map((goods) => (
        <Carousel.Item key={goods._id}>
          <Link to={`/goods/${goods._id}`}>
            <Image src={goods.goods_pic} alt={goods.goods_name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {goods.goods_name} (${goods.goods_price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
