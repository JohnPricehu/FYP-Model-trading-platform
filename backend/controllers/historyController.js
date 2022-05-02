import asyncHandler from "express-async-handler"
import History from "../models/historyModel.js"

// @desc  create new history
// @route POST api/historys
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

// @desc  Get logged in user historys
// @route GET api/historys/myhistory
// @access  Private
const getMyHistory = asyncHandler(async (req, res) => {
    const history = await History.find({ user: req.user._id }).sort({'createdAt':-1}).populate(
      'product'
    )
    res.json(history)
  })

export {
    addToHistory,
    getMyHistory
}