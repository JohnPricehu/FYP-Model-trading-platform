import Goods from "../models/goodsModel.js";
import asyncHandler from "express-async-handler";
import {sendEmail} from '../sendEmail.js'
import User from "../models/userModel.js";

// @desc    Get logged in user notes
// @route   GET /api/goods
// @access  Private
const getGoods = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keword = req.query.keyword
    ? {
      goods_name: {
          $regex: req.query.keyword,
          $options: 'i',
        },goods_category: { $ne: 'special' }
      }
    : {goods_category: { $ne: 'special' }}
      
  const count = await Goods.countDocuments({ ...keword })
  const goods = await Goods.find({ ...keword } ).populate(
    'owner',
    'name'
  )
    .sort({ updatedAt: 'desc' })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  // const goods = await Goods.find({})
  res.json({ goods
    , page, pages: Math.ceil(count / pageSize) 
  })
})


//@description     Fetch single Note
//@route           GET /api/goods/:id
//@access          Public
const getGoodsById = asyncHandler(async (req, res) => {
  const goods = await Goods.findById(req.params.id);

  if (goods) {
    return res.json(goods);
  } else {
    res.status(404).json({ message: "Goods not found" });
  }

  res.json(goods);
});

//@description     Create single Note
//@route           GET /api/goods/create
//@access          Private
const createGoods = asyncHandler(async (req, res) => {
  const { goods_name, goods_details, goods_category, goods_price, goods_pic,countInStock } = req.body;
  if (!goods_name || !goods_details || !goods_category) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const goods = new Goods({ owner: req.user._id, goods_name, goods_details, goods_category, goods_price, goods_pic,countInStock });
    const createdGoods = await goods.save();

    res.status(201).json(createdGoods);
  }
});

const getTopGoods = asyncHandler(async (req, res) => {
  const goods = await Goods.find({}).sort({ rating: -1 }).limit(3)

  res.json(goods)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateGoods = asyncHandler(async (req, res) => {
  const {
    // name,
    // price,
    // description,
    // imageURL,
    // category,
    // countInStock,
    goods_name,
    goods_price,
    goods_pic,
    goods_category,
    goods_details,
    countInStock,
  } = req.body

  const product = await Goods.findById(req.params.id)

  if (product) {
    product.goods_name = goods_name
    product.goods_price = goods_price
    product.goods_details = goods_details
    product.goods_pic = goods_pic
    product.category = goods_category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
    for (let i = 0;i < product.likers.length;i++){
      const user = await User.findById( product.likers[i].user)
    const result = sendEmail(user.email,"Attention","Your favourite "+updatedProduct.goods_name+" has been updated. Hurry up to check it!"
    )
  }
    

    for (let i = 0;i < product.wanters.length;i++){
    const user = await User.findById( product.wanters[i].user)
    const result = sendEmail(user.email,"Attention","Your wanted "+updatedProduct.goods_name+" has been updated. Hurry up to check it!"
    )
  }
    

  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const deleteGoods = asyncHandler(async (req, res) => {
  const goods = await Goods.findById(req.params.id)
  if (goods) {
    await goods.remove()
    res.json({ message: 'Goods removed' })
  } else {
    res.status(404)
    throw new Error('Goods not found')
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/review
// @access  Private
const createdProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Goods.findById(req.params.id)
  // .populate(
  //   {
  //     path: 'reviews.user',
  //     select:
  //       'name',
  //   }
  // )

  if (product) {
    const alreadyReviewed = await product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
  const buyer = await product.buyers.find(
    (r) => r.user.toString() === req.user._id.toString()
    // {buyers: { $elemMatch: { user: req.user._id} }}  )
  )
  if (buyer){
    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('After buy the model you can review')
  }}else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const getBestSalesGoods = asyncHandler(async (req, res) => {
  const goods = await Goods.find({}).sort({ sales: -1 }).limit(4).populate(
    'owner',
    'name'
  )

  res.json(goods)
})

const getSpecialGoods = asyncHandler(async (req, res) => {
  const goods = await Goods.find({goods_category: { $eq: 'special' }}).populate(
    'owner',
    'name'
  )

  res.json(goods)
})

const getMyGoods = asyncHandler(async (req, res) => {
  const goods = await Goods.find({ owner: req.user._id })
  res.json(goods)
})


const getAllGoods = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keword = req.query.keyword
    ? {
      goods_name: {
          $regex: req.query.keyword,
          $options: 'i',
        }
      }
    : {}
      
  const count = await Goods.countDocuments({ ...keword })
  const goods = await Goods.find({ ...keword } ).populate(
    'owner',
    'name'
  )
    .sort({ updatedAt: 'desc' })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  // const goods = await Goods.find({})
  res.json({ goods
    , page, pages: Math.ceil(count / pageSize) 
  })
})

export { getGoods, getGoodsById, createGoods, getTopGoods,updateGoods,deleteGoods, createdProductReview, getBestSalesGoods, getSpecialGoods, getAllGoods,getMyGoods };

