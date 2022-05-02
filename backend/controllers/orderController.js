import asyncHandler from 'express-async-handler'
import Order from "../models/orderModel.js"
import Goods from "../models/goodsModel.js"
import User from "../models/userModel.js"
import {sendEmail} from "../sendEmail.js"

// @desc  create new order
// @route POST api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No orders items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

// @desc  Cet order by Id
// @route GET api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found! ')
  }
})

// @desc  Update order to pait
// @route GET api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  const user = await User.findById(order.user)  
  if (order) {
    if(user.wallet >= order.totalPrice ){
    user.wallet = user.wallet - order.totalPrice
    await user.save()
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      // email_address: req.body.payer.email_address,    
    }
    
    
    const result = sendEmail(user.email,"Transaction Record","Your Order "+order._id+" has been processed. "+" You have paid "+order.totalPrice+" ."
    )
    if(result === 0) {
    console.log('邮件发送失败')
    }
    else if(result === 1) {
    console.log('邮件发送成功')
  }
  const updatedOrder = await order.save()
  for (let i = 0;i < order.orderItems.length;i++){
    const good = await Goods.findById(order.orderItems[i].product)
    good.countInStock =  good.countInStock - order.orderItems[i].qty
    good.sales = good.sales + order.orderItems[i].qty
    // const buyer = await Goods.find({ buyers.user: req.user._id })
    const buyer = {
      user: req.user._id,
    }
    good.buyers.push(buyer)
    await good.save()
    const owner = await User.findById(good.owner)
  const result = sendEmail(owner.email,"Transaction Record","Your Model "+good.goods_name+" solded "
  +order.orderItems[i].qty+" ."
  )
  if(result === 0) {
  console.log('邮件发送失败')
  }
  else if(result === 1) {
  console.log('邮件发送成功')
}
  }
  res.json(updatedOrder)
    }else {
      res.status(404)
      throw new Error('Payment Failed')
    }
  } else {
    res.status(404)
    throw new Error('Order not found! ')
  }


})


// @desc  Update order to delivered
// @route GET api/orders/:id/delivered
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found! ')
  }
})

// @desc  Get logged in user orders
// @route GET api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

// @desc  Get all orders orders
// @route GET api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})

// @desc  Delete order
// @route DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    await order.remove()
    res.json({ message: 'Order removed' })
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  deleteOrder,
}
