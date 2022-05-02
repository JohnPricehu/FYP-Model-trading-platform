import asyncHandler from 'express-async-handler'
import Wanted from "../models/wantedModel.js"
import Goods  from "../models/goodsModel.js"

// @desc  create new wanted
// @route POST api/wanteds
// @access  Private
const addToWanted = asyncHandler(async (req, res) => {
    const wantedExists = await Wanted.findOne({product: req.params.id}, { user: req.user._id })
    if (wantedExists) {
        res.status(404);
        throw new Error("Goods already add to wanted");
      }
        
    const wanted = new Wanted({
      user: req.user._id,
      product:req.params.id,
    })

    const createdWanted = await wanted.save()
    res.status(201).json(createdWanted)
    const good = await Goods.findById(req.params.id)
    const alreadyaddedd = await good.wanters.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
    if(alreadyaddedd){
      res.status(400)
      throw new Error('wanter already reviewed')
    }else{
    const wanter = {
      user: req.user._id,
    }
    good.wanters.push(wanter)
    await good.save()
  }
})

// @desc  Get logged in user wanteds
// @route GET api/wanteds/mywanteds
// @access  Private
const getMyWanted = asyncHandler(async (req, res) => {
    const wanted = await Wanted.find({ user: req.user._id }).populate(
      'product'
    )
    res.json(wanted)
  })
  
  
  // @desc  Delete wanted
  // @route DELETE /api/wanteds/:id
  // @access  Private/Admin
  const deleteWanted = asyncHandler(async (req, res) => {
    const wanted = await Wanted.find({product: req.params.id}, { user: req.user._id })
    if (wanted) {
      await Wanted.deleteMany({product: req.params.id}, { user: req.user._id })
      await Goods.updateMany({ _id: req.params.id}, {$pull: {wanters:{ user: req.user._id } } });
      res.json({ message: 'Wanted goods removed' })
    } else {
      res.status(404)
      throw new Error('Wanted goods not found')
    }
  })

  export {
    addToWanted, 
    getMyWanted,
    deleteWanted
}