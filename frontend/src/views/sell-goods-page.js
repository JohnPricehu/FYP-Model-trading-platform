import React, { useEffect, useState } from "react";
// import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {createGoodsAction} from "../actions/goodsActions";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import projectStyles from '../style.module.css'
import styles from './sell-goods-page.module.css'
import { Helmet } from 'react-helmet'

function CreateGoods({ history }) {
  const [goods_name, setGoods_name] = useState("");
  const [goods_details, setGoods_details] = useState("");
  const [goods_category, setGoods_category] = useState("");
  const [goods_price, setGoods_price] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [goods_pic, setGoods_pic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();

  const goodsCreate = useSelector((state) => state.goodsCreate);
  const { loading, error, goods } = goodsCreate;

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const resetHandler = () => {
    setGoods_name("");
    setGoods_details("");
    setGoods_category("");
    setGoods_price("");
    setGoods_pic("");
    setCountInStock("1");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createGoodsAction(goods_name, goods_details, goods_category, goods_pic,goods_price,countInStock));
    if (!goods_name || !goods_details || !goods_category || !goods_price) return;

    resetHandler();
    history.push("/");
  };
  function previewFile() {
    var preview = document.querySelector('img');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();
  
    reader.onloadend = function () {
      preview.src = reader.result;
    }
  
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
  }
  const postDetails = (pics) => {
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "goods_pic");
      data.append("cloud_name", "fyp2022");
      fetch("https://api.cloudinary.com/v1_1/fyp2022/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setGoods_pic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  useEffect(() => {}, []);

  return (
    // {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          <Form onSubmit={submitHandler}>
      <div className={styles['container']}>
      <Helmet>
        <title>Sell</title>
        <meta property="og:title" content="sellGoodsPage - FYP" />
      </Helmet>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      <input                    
        id={goods_pic}
        type="file"
        label="Upload Model Picture"
        custom
        accept="image/*"
        // placeholder="Upload Profile Picture"
        onChange={(e) => postDetails(e.target.files[0])}      
        className={` ${styles['textinput']} ${projectStyles['input']} `}
      />
      <img
        alt="image"
        src={goods_pic}
        className={styles['image']}
      />
      <span className={styles['text']}>Model name:</span>
      <input
        type="text"
        value={goods_name}
        placeholder="Enter the goods's name"
        onChange={(e) => setGoods_name(e.target.value)}
        className={` ${styles['textinput1']} ${projectStyles['input']} `}
      />
      <span className={styles['text1']}>Model price:</span>
      <input
        type="text"
        value={goods_price}
        placeholder="Enter the goods's price"
        onChange={(e) => setGoods_price(e.target.value)}
        className={` ${styles['textinput2']} ${projectStyles['input']} `}
      />
      <span className={styles['text2']}>Model category:</span>
      <input
        type="text"
        list="categorylist"
        value={goods_category}
        placeholder="Select the  Model Category"
        onChange={(e) => setGoods_category(e.target.value)}
        className={` ${styles['textinput3']} ${projectStyles['input']} `}
      />
      <datalist id="categorylist">
          <option>Ultraman</option>
          <option>Gundam</option>
          <option>Marvel</option>
　　      <option>Other</option>
          {userInfo.isAdmin && <option>Special</option>}
      </datalist>
      <span className={styles['text5']}>Model count:</span>
      <input
        type="text"
        value={countInStock}
        placeholder="Enter the count"
        onChange={(e) => setCountInStock(e.target.value)}
        className={` ${styles['textinput4']} ${projectStyles['input']} `}
      />
      <span className={styles['text3']}>Model details:</span>
      <textarea
        value={goods_details}
        placeholder="Enter the goods more details"
        rows={4}
        onChange={(e) => setGoods_details(e.target.value)}
        className={` ${styles['textarea']} ${projectStyles['textarea']} `}
      ></textarea>
      {/* {goods_details && (
              <Card>
                <Card.Header>Detail Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{goods_details}</ReactMarkdown>
                </Card.Body>
                </Card>
            )} */}
        

            {loading && <Loading size={50} />}
      <button className={` ${styles['button']} ${projectStyles['button']} `}
      type="submit" variant="primary">
          Add a new model
      </button>
      <button className={` ${styles['button1']} ${projectStyles['button']} `}
      onClick={resetHandler} variant="danger">
        Reset Feilds
      </button>
      <span className={styles['text4']}>
        Creating on - {new Date().toLocaleDateString()}
      </span>     
    </div>
    </Form>
  );
}

export default CreateGoods;