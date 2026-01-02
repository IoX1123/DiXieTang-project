import { useEffect, useRef, useState } from "react";
import axios from "axios";
import CouponModal from "../../components/CouponModal";
import DeleModal from "../../components/DeleModal";
import Pagenation from "../../components/Pagenation";
import { Modal } from "bootstrap";


function AdminCoupon() {
  const [coupon, setCoupon] = useState([]);
  const [pagnation, setPagnation ] = useState({});
  const couponsModal = useRef(null);
  const delModal = useRef(null);
  const [type, setType] = useState('create');
  const [tmpCPata, setTmpCPdata] = useState({});

    useEffect(()=>{
      couponsModal.current = new Modal('#productModal', {
        backdrop: "static"
      });
      delModal.current = new Modal('#deleteModal', {
        backdrop: "static"
      });
      
      getCoupon();
    }, [])

    const getCoupon = async(page = 1) =>{
      const res = await axios.get(`${import.meta.env.VITE_API_URL}v2/api/${import.meta.env.VITE_API_PATH}/admin/coupons?page=${page}`);
             
             setCoupon(res.data.coupons);
             setPagnation(res.data.pagination);
    }
    
    const openNewCPModal = (type, product) => {
      setType(type);
      setTmpCPdata(product);
      couponsModal.current.show();
    }
    const closeNewCPModal = () => {
      couponsModal.current.hide();
    }

    const openDelModal = (product) => {
      
      setTmpCPdata(product);
      delModal.current.show();
    }
    const closeDelModal = () => {
      delModal.current.hide();
    }

    const deleCP = async(id) => {
      try {
        const res = await axios.delete(`${import.meta.env.VITE_API_URL}v2/api/${import.meta.env.VITE_API_PATH}/admin/coupon/${id}`)
        if(res.data.success){
          getCoupon();
          closeDelModal();
        }
      } catch (error) {
        
      }
    }

    return(
        <>
        <div className='p-3'>
          <CouponModal closeNewCPModal={closeNewCPModal} getCoupon={getCoupon}
          tmpCPata={tmpCPata} type={type}/>
          <DeleModal close={closeDelModal} text={tmpCPata.title} handledel={deleCP} id={tmpCPata.id}/>
      <h3>優惠券列表</h3>
      <hr />
      <div className='text-end'>
        <button type='button' className='btn btn-primary btn-sm' onClick={()=>openNewCPModal('create', {})}>
          建立新優惠券
        </button>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>標題</th>
            <th scope='col'>折扣</th>
            <th scope='col'>到期日</th>
            <th scope='col'>優惠碼</th>
            <th scope='col'>啟用狀態</th>
            <th scope='col'>編輯</th>
          </tr>
        </thead>
        <tbody>
          {coupon.map((item)=>{
            return(
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.percent}</td>
                <td>{new Date(item.due_date).toDateString()}</td>
                <td>{item.code}</td>
                <td>{item.is_enabled ? "啟用" : "未啟用"}</td>
                <td>
                  <button type='button' className='btn btn-primary btn-sm' onClick={() => openNewCPModal('edit', item)}>
                    編輯
                  </button>
                  <button
                    type='button'
                    className='btn btn-outline-danger btn-sm ms-2' onClick={()=> openDelModal(item)}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Pagenation pagnation={pagnation} changePage={getCoupon}/>
      
    </div>
        </>
    )
    
}

export default AdminCoupon;
