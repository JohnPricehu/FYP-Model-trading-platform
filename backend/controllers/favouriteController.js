import asyncHandler from 'express-async-handler'
import Favourite from "../models/favouriteModel.js"
import Goods  from "../models/goodsModel.js"

// @desc  create new favourite
// @route POST api/favourites
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
    const good = await Goods.findById(req.params.id)
    const alreadyaddedd = await good.likers.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
    if(alreadyaddedd){
      res.status(400)
      throw new Error('liker already reviewed')
    }else{
      const liker = {
        user: req.user._id,
      }
      good.likers.push(liker)
      await good.save() 
    }



})


// @desc  Get logged in user favourites
// @route GET api/favourites/myfavourites
// @access  Private
const getMyFavourite = asyncHandler(async (req, res) => {
  const favourites = await Favourite.find({ user: req.user._id }).populate(
    'product'
  )
  res.json(favourites)
})


// @desc  Delete favourite
// @route DELETE /api/favourites/:id
// @access  Private/Admin
const deleteFavouriteGoods = asyncHandler(async (req, res) => {
  const favourite = await Favourite.find({product: req.params.id}, { user: req.user._id })
  if (favourite) {
    await Favourite.deleteMany({product: req.params.id}, { user: req.user._id })
    // const good = await Goods.findById(req.params.id)
    
    // db.collection.update({_id: ObjectId( "4f8dcb06ee21783d7400003c" )}, 
    //                  {$pull: {attendees: {_id: ObjectId( "4f8dfb06ee21783d7134503a" )}}})
    // // const liker = await good.buyers.find(
    // //   (r) => r.user.toString() === req.user._id.toString()
    // // )
    // good.likers.deleteOne({user : req.user._id})
  // const good =  
  await Goods.updateMany({ _id: req.params.id}, {$pull: {likers:{ user: req.user._id } } });
  // await good.save()
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
