import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ProductsModal from "../../components/ProductsModal";
import DeleModal from "../../components/DeleModal";
import Pagenation from "../../components/Pagenation";
import { Modal } from "bootstrap";
import { API_BASE_URL, API_PATH } from "../config/api";


function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [pagnation, setPagnation ] = useState({});
  const productsModal = useRef(null);
  const delModal = useRef(null);
  const [type, setType] = useState('create');
  const [tmpPData, setTmpPDdata] = useState({});

    useEffect(()=>{
      productsModal.current = new Modal('#productModal', {
        backdrop: "static"
      });
      delModal.current = new Modal('#deleteModal', {
        backdrop: "static"
      });
      
      getProduct();
    }, [])

    const getProduct = async(page = 1) =>{
      const product = await axios.get(`${API_BASE_URL}v2/api/${API_PATH}/admin/products?page=${page}`);
             
             setProducts(product.data.products);
             setPagnation(product.data.pagination);
    }
    
    const openNewPDModal = (type, product) => {
      setType(type);
      setTmpPDdata(product);
      productsModal.current.show();
    }
    const closeNewPDModal = () => {
      productsModal.current.hide();
    }

    const openDelPDModal = (product) => {
      
      setTmpPDdata(product);
      delModal.current.show();
    }
    const closeDelPDModal = () => {
      delModal.current.hide();
    }

    const delePD = async(id) => {
      try {
        const res = await axios.delete(`${API_BASE_URL}v2/api/${API_PATH}/admin/product/${id}`)
        if(res.data.success){
          getProduct();
          closeDelPDModal();
        }
      } catch (error) {
        
      }
    }

    return(
        <>
        <div className='p-3'>
          <ProductsModal closeNewPDModal={closeNewPDModal} getProduct={getProduct}
          tmpPData={tmpPData} type={type}/>
          <DeleModal close={closeDelPDModal} text={tmpPData.title} handledel={delePD} id={tmpPData.id}/>
      <h3>產品列表</h3>
      <hr />
      <div className='text-end'>
        <button type='button' className='btn btn-primary btn-sm' onClick={()=>openNewPDModal('create', {})}>
          建立新商品
        </button>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>分類</th>
            <th scope='col'>名稱</th>
            <th scope='col'>售價</th>
            <th scope='col'>啟用狀態</th>
            <th scope='col'>編輯</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item)=>{
            return(
              <tr key={item.id}>
                <td>{item.category}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.is_enabled ? "啟用" : "未啟用"}</td>
                <td>
                  <button type='button' className='btn btn-primary btn-sm' onClick={() => openNewPDModal('edit', item)}>
                    編輯
                  </button>
                  <button
                    type='button'
                    className='btn btn-outline-danger btn-sm ms-2' onClick={()=> openDelPDModal(item)}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Pagenation pagnation={pagnation} changePage={getProduct}/>
      
    </div>
        </>
    )
    
}

export default AdminProducts;
