import { useEffect, useRef, useState } from "react";
import axios from "axios";
import OrderMoadl from "../../components/OrderModal";
import DeleModal from "../../components/DeleModal";
import Pagenation from "../../components/Pagenation";
import { Modal } from "bootstrap";
import { API_BASE_URL, API_PATH } from "../../config/api";

function AdminOrder() {
  const [order, setOrder] = useState([]);
  const [pagnation, setPagnation ] = useState({});
  const orderModal = useRef(null);
  const delModal = useRef(null);
  const [type, setType] = useState('create');
  const [tmpPData, setTmpPDdata] = useState({});

    useEffect(()=>{
      orderModal.current = new Modal('#productModal', {
        backdrop: "static"
      });
      delModal.current = new Modal('#deleteModal', {
        backdrop: "static"
      });
      
      getOrder();
    }, [])

    const getOrder = async(page = 1) =>{
      const res = await axios.get(`${API_BASE_URL}v2/api/${API_PATH}/admin/orders?page=${page}`);
      
             setOrder(res.data.orders);
             setPagnation(res.data.pagination);
    }
    
    const openNewPDModal = (type, product) => {
      setType(type);
      setTmpPDdata(product);
      orderModal.current.show();
    }
    const closeNewPDModal = () => {
      orderModal.current.hide();
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
          getOrder();
          closeDelPDModal();
        }
      } catch (error) {
        
      }
    }

    return(
        <>
        <div className='p-3'>
          <OrderMoadl closeNewPDModal={closeNewPDModal} getProduct={getOrder}
          tmpPData={tmpPData} type={type}/>
          <DeleModal close={closeDelPDModal} text={tmpPData.title} handledel={delePD} id={tmpPData.id}/>
      <h3>訂單列表</h3>
      <hr />
      <div className='text-end'>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>訂單編號</th>
            <th scope='col'>買方</th>
            <th scope='col'>付款狀態</th>
            <th scope='col'>付款日期</th>
            <th scope='col'>留言備註</th>
            <th scope='col'>編輯</th>
          </tr>
        </thead>
        <tbody>
          {order.map((item)=>{
            return(
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.user.name}</td>
                <td>{item.is_paid ? "已付款" : "未付款"}</td>
                <td>{item.is_paid}</td>
                <td>{item.message}</td>
                <td>
                  <button type='button' className='btn btn-primary btn-sm' onClick={() => openNewPDModal('edit', item)}>
                    編輯
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Pagenation pagnation={pagnation} changePage={getOrder}/>
      
    </div>
        </>
    )
    
}

export default AdminOrder;
