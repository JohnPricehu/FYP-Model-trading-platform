import Goods from "../models/goodsModel.js";
import asyncHandler from "express-async-handler";

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
    name,
    price,
    description,
    imageURL,
    brand,
    category,
    countInStock,
  } = req.body

  const product = await Goods.findById(req.params.id)

  if (product) {
    product.goods_name = name
    product.goods_price = price
    product.goods_details = description
    product.goods_pic = imageURL
    // product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
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

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

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

export { getGoods, getGoodsById, createGoods, getTopGoods,updateGoods,deleteGoods, createdProductReview, getBestSalesGoods, getSpecialGoods };

