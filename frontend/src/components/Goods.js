import React from 'react'
import { Link } from 'react-router-dom'
// import Rating from './Rating'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
// import User from '../../../backend/models/userModel.js'
import {
  addToHistoryAction
} from '../actions/historyAction.js'



const Goods = ({ goods }) => {

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // const addHistory = useSelector((state) => state.addHistory);
  // const { 
  //   success: successaddhistory,
  //   error: erroraddhistory 
  // } = addHistory;

  const addToHistoryHandler = async (id, user) => {
    dispatch(addToHistoryAction(id,user))
  }

  return (
    userInfo ? (
    <Card
      className='my-3 rounded'
      style={{
        backgroundColor: '#F1F1F1',
        // backgroundColor: 'red',
        marginLeft: '0.2rem',
        paddingBottom: '0px',
        boxShadow: '3px 3px 10px 3px #888888',
        borderRadius: '10px',
      }}
    >
      <Link to={`/goods/${goods._id}`} 
      onClick={() => addToHistoryHandler(goods._id,userInfo._id)}
      >
        <Card.Img
          src={goods.goods_pic}
          variant='top'
          style={{
            height: '250px',
          }}
        />
      </Link>

      <Card.Body>
        <Link to={`/goods/${goods._id}`}
        onClick={() => addToHistoryHandler(goods._id,userInfo._id)}
        >
          <Card.Title as='div'>
            <strong style={{ color: 'black' }}>{goods.goods_name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='h4'>Sales: {goods.sales}</Card.Text>
        <Card.Text as='h4'>owner: {goods.owner && goods.owner.name}</Card.Text>
        <Card.Text as='h3'>${goods.goods_price}</Card.Text>
      </Card.Body>
    </Card>):(
      <Card
          className='my-3 rounded'
            style={{
              backgroundColor: '#F1F1F1',
              // backgroundColor: 'red',
              marginLeft: '0.2rem',
              paddingBottom: '0px',
              boxShadow: '3px 3px 10px 3px #888888',
              borderRadius: '10px',
            }}
          >
            <Link to={`/goods/${goods._id}`} 
            
            >
              <Card.Img
                src={goods.goods_pic}
                variant='top'
                style={{
                  height: '250px',
                }}
              />
            </Link>
      
            <Card.Body>
              <Link to={`/goods/${goods._id}`}
              
              >
                <Card.Title as='div'>
                  <strong style={{ color: 'black' }}>{goods.goods_name}</strong>
                </Card.Title>
              </Link>
              <Card.Text as='h4'>Sales: {goods.sales}</Card.Text>
              <Card.Text as='h4'>owner: {goods.owner && goods.owner.name}</Card.Text>
              <Card.Text as='h3'>${goods.goods_price}</Card.Text>
            </Card.Body>
            </Card>
    )
    
    
  )
}

export default Goods