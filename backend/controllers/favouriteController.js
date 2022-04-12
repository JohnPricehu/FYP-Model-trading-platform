import asyncHandler from 'express-async-handler'
import Favourite from '../models/favouriteModel.js'

// @desc  create new order
// @route POST api/orders
// @access  Private
const addToFavourite = asyncHandler(async (req, res) => {
    const favouriteExists = await Favourite.findOne({product: req.params.id}, { user: req.user._id })
    if (favouriteExists) {
        res.status(404);
        throw new Error("Goods already add to favourite");
      }
        
    const favourite = new Favourite({
      user: req.user._id,
      product:req.params.id,
    })

    const createdfavourite = await favourite.save()
    res.status(201).json(createdfavourite)
  
})


// @desc  Get logged in user orders
// @route GET api/orders/myorders
// @access  Private
const getMyFavourite = asyncHandler(async (req, res) => {
  const favourites = await Favourite.find({ user: req.user._id })
  res.json(favourites)
})


// @desc  Delete order
// @route DELETE /api/orders/:id
// @access  Private/Admin
const deleteFavouriteGoods = asyncHandler(async (req, res) => {
  const favourite = await Favourite.find({product: req.params.id}, { user: req.user._id })
  if (favourite) {
    await Favourite.deleteMany({product: req.params.id}, { user: req.user._id })
    res.json({ message: 'Favourite goods removed' })
  } else {
    res.status(404)
    throw new Error('Favourite goods not found')
  }
})

const cleanFavourite = asyncHandler(async (req, res) => {
    const favourites = await Favourite.find({ user: req.user._id })
    if (favourites) {
      await Favourite.deleteMany({user: req.user._id})
      res.json({ message: 'Favourite clean' })
    } else {
      res.status(404)
      throw new Error('Favourite not found')
    }
  })

export {
addToFavourite,
getMyFavourite,
deleteFavouriteGoods,
cleanFavourite,
}
