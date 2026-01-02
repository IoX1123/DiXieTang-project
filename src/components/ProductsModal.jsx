import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { MessageContext, ToastMessage, ToastFailMessage } from "../store/messageStore";
import { API_BASE_URL, API_PATH } from "../config/api";

function ProductsModal ({closeNewPDModal, getProduct, type, tmpPData}) {
    const [tmpData, setTmpData] = useState({
        "title": "",
        "category": "",
        "origin_price": 100,
        "price": 300,
        "unit": "",
        "description": "",
        "content": "",
        "is_enabled": 1,
        "imageUrl": ""
    });

    // const [message, dispatch] = useContext(MessageContext);
    const [, dispatch] = useContext(MessageContext);

    useEffect(()=>{
        if(type === 'create') {
            setTmpData({
                "title": "",
                "category": "",
                "origin_price": 100,
                "price": 300,
                "unit": "",
                "description": "",
                "content": "",
                "is_enabled": 1,
                "imageUrl": ""
            })
        } else if(type === 'edit'){
            setTmpData(tmpPData)
        }
    }, [type, tmpPData])
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        if(['price', 'origin_price'].includes(name)) {
            setTmpData({
                ...tmpData,
                [name]: Number(value)
            })
        } else if(name === "is_enabled") {

            setTmpData({
                ...tmpData,
                [name]: +e.target.checked
            })
        } else {
            setTmpData({
                ...tmpData,
                [name]: value
            })
        }
    }
    const submit = async() => {
        try {
            let api = `${API_BASE_URL}v2/api/${API_PATH}/admin/product`;
            let method = 'post';
            if(type === 'edit') {
                api = `${API_BASE_URL}v2/api/${API_PATH}/admin/product/${tmpPData.id}`;
                method = 'put';
            }
            const res = await axios[method](api, {
                data: tmpData
            })
            closeNewPDModal();
            getProduct();
            ToastMessage(dispatch, res);
        } catch (error) {
            ToastFailMessage(dispatch, error);
        }
    }


    return(
        <div
      className='modal fade'
      tabIndex='-1'
      id='productModal'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='exampleModalLabel'>
              {type === 'create' ? "建立新商品" : `編輯 ${tmpData.title}`}
              
            </h1>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={closeNewPDModal}
            />
          </div>
          <div className='modal-body'>
            <div className='row'>
              <div className='col-sm-4'>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='image'>
                    輸入圖片網址
                    <input
                      type='text'
                      name='imageUrl'
                      id='image'
                      placeholder='請輸入圖片連結'
                      className='form-control'
                      onChange={handleChange}
                      value={tmpData.imageUrl}
                    />
                  </label>
                </div>
                <img src='' alt='' className='img-fluid' />
              </div>
              <div className='col-sm-8'>
                <pre></pre>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='title'>
                    標題
                    <input
                      type='text'
                      id='title'
                      name='title'
                      placeholder='請輸入標題'
                      className='form-control'
                      onChange={handleChange}
                      value={tmpData.title}
                    />
                  </label>
                </div>
                <div className='row'>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='category'>
                      分類
                      <input
                        type='text'
                        id='category'
                        name='category'
                        placeholder='請輸入分類'
                        className='form-control'
                       onChange={handleChange}
                      value={tmpData.category}
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='unit'>
                      單位
                      <input
                        type='unit'
                        id='unit'
                        name='unit'
                        placeholder='請輸入單位'
                        className='form-control'
                        onChange={handleChange}
                        value={tmpData.unit}
                      />
                    </label>
                  </div>
                </div>
                <div className='row'>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='origin_price'>
                      原價
                      <input
                        type='number'
                        id='origin_price'
                        name='origin_price'
                        placeholder='請輸入原價'
                        className='form-control'
                        onChange={handleChange}
                        value={tmpData.origin_price}
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='price'>
                      售價
                      <input
                        type='number'
                        id='price'
                        name='price'
                        placeholder='請輸入售價'
                        className='form-control'
                        onChange={handleChange}
                        value={tmpData.price}
                      />
                    </label>
                  </div>
                </div>
                <hr />
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='description'>
                    產品描述
                    <textarea
                      type='text'
                      id='description'
                      name='description'
                      placeholder='請輸入產品描述'
                      className='form-control'
                      onChange={handleChange}
                      value={tmpData.descriptione}
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='content'>
                    說明內容
                    <textarea
                      type='text'
                      id='content'
                      name='content'
                      placeholder='請輸入產品說明內容'
                      className='form-control'
                      onChange={handleChange}
                      value={tmpData.content}
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <div className='form-check'>
                    <label
                      className='w-100 form-check-label'
                      htmlFor='is_enabled'
                    >
                      是否啟用
                      <input
                        type='checkbox'
                        id='is_enabled'
                        name='is_enabled'
                        placeholder='請輸入產品說明內容'
                        className='form-check-input'
                        onChange={handleChange}
                        checked={!!tmpData.is_enabled}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={closeNewPDModal}
            >
              關閉
            </button>
            <button type='button' className='btn btn-primary' onClick={submit} >
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}

export default ProductsModal;




