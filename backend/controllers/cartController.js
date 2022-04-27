import asyncHandler from 'express-async-handler'
import Cart from '../models/cartModel.js'
import Goods from '../models/goodsModel.js'
import User from '../models/userModel.js'

// @desc  create new cart
// @route POST api/carts
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const {
    qty
  } = req.body

    const cart = new Cart({
      user: req.user._id,
      product:req.params.id,
      qty,
    })

    const createdCart = await cart.save()
    res.status(201).json(createdCart)
  
})


// @desc  Get logged in user carts
// @route GET api/carts/mycarts
// @access  Private
const getMyCart = asyncHandler(async (req, res) => {
  const carts = await Cart.find({ user: req.user._id })
  res.json(carts)
})


// @desc  Delete cart
// @route DELETE /api/carts/:id
// @access  Private/Admin
const deleteCartGoods = asyncHandler(async (req, res) => {
  const cart = await Cart.find({product: req.params.id}, { user: req.user._id })
  if (cart) {
    await Cart.deleteMany({product: req.params.id}, { user: req.user._id })
    res.json({ message: 'Cart goods removed' })
  } else {
    res.status(404)
    throw new Error('Cart goods not found')
  }
})

const cleanCart = asyncHandler(async (req, res) => {
    const carts = await Cart.find({ user: req.user._id })
    if (carts) {
      await Cart.deleteMany({user: req.user._id})
      res.json({ message: 'Cart clean' })
    } else {
      res.status(404)
      throw new Error('Cart not found')
    }
  })

export {
addToCart,
getMyCart,
deleteCartGoods,
cleanCart,
}
