import Goods from "../models/goodsModel.js";
import asyncHandler from "express-async-handler";

// @desc    Get logged in user notes
// @route   GET /api/goods
// @access  Private
const getGoods = asyncHandler(async (req, res) => {
  // const pageSize = 10
  // const page = Number(req.query.pageNumber) || 1

  // const keword = req.query.keyword
  //   ? {
  //       name: {
  //         $regex: req.query.keyword,
  //         $options: 'i',
  //       },
  //     }
  //   : {}

  // const count = await Goods.countDocuments({ ...keword })
  // const goods = await Goods.find({ ...keword })
  //   .sort({ updatedAt: 'desc' })
  //   .limit(pageSize)
  //   .skip(pageSize * (page - 1))
  const goods = await Goods.find({})
  res.json({ goods
    // , page, pages: Math.ceil(count / pageSize) 
  })
})


//@description     Fetch single Note
//@route           GET /api/notes/:id
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
//@route           GET /api/notes/create
//@access          Private
const createGoods = asyncHandler(async (req, res) => {
  const { goods_name, goods_details, goods_category, goods_price, goods_pic } = req.body;

  if (!goods_name || !goods_details || !goods_category) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const goods = new Goods({ owner: req.user._id, goods_name, goods_details, goods_category, goods_price, goods_pic });
    // const goods = await Goods.create({
    //     owner: req.user._id,
    //     goods_name, 
    //     goods_details, 
    //     goods_category, 
    //     goods_pic
    //   });
    const createdGoods = await goods.save();

    res.status(201).json(createdGoods);
  }
});

export { getGoods, getGoodsById, createGoods };