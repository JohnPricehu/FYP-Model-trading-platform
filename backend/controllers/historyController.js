import asyncHandler from 'express-async-handler'
import History from '../models/HistoryModel.js'

// @desc  create new order
// @route POST api/orders
// @access  Private
const addToHistory = asyncHandler(async (req, res) => {
    const historyExists = await History.findOne({product: req.params.id}, { user: req.user._id })
    if (historyExists) {
        await History.deleteMany({product: req.params.id}, { user: req.user._id })
      } 
    const history = new History({
      user: req.user._id,
      product:req.params.id,
    })

    const createdHistory = await history.save()
    res.status(201).json(createdHistory)
  
})

// @desc  Get logged in user orders
// @route GET api/orders/myorders
// @access  Private
const getMyHistory = asyncHandler(async (req, res) => {
    const history = await History.find({ user: req.user._id }).populate(
      'product'
    )
    res.json(history)
  })

export {
    addToHistory,
    getMyHistory
}