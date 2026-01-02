import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { API_BASE_URL, API_PATH } from "../config/api";

function Cart() {
    const {cartData, getCartData} = useOutletContext();
    const [loadingItems, setloadingItem] = useState([]);
    const [noItem, setNoItem] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    
    const removeCartItem = async(id) => {
        try {
            const res = await axios.delete(`${API_BASE_URL}v2/api/${API_PATH}/cart/${id}`)
                getCartData()
        } catch (error) {
            console.log(error)
        }
    }


    const updateCartItem = async(item, cartqrty) => {
        const data = {
            data: {
                product_id:  item.product_id,
                qty: cartqrty
            }
        }
        
        setloadingItem([...loadingItems, item.id]);
        try {
            const res = await axios.put(`${API_BASE_URL}v2/api/${API_PATH}/cart/${item.id}`, data)
                getCartData()
                setloadingItem(loadingItems.filter((i) => i !== item.id))
        } catch (error) {
            console.log(error)
        }
    }
    const addCoupon = async(couponCode) => {
        const cpdata = {
             data: {
                code: couponCode
            }
        }
        try {
            const res = await axios.post(`${API_BASE_URL}v2/api/${API_PATH}/coupon`, cpdata)
                getCartData()
                setloadingItem(loadingItems.filter((i) => i !== item.id))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        if(cartData?.carts?.length === 0) setNoItem(true);
        else setNoItem(false);
    }, [])
    

    return (
        <>
             <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 bg-white py-5" style={{minHeight: "calc(100vh - 56px - 76px)"}}>
                    <div className="d-flex justify-content-between">
                        <h2 className="mt-2">訂單明細</h2>
                    </div>
                    {cartData?.carts?.map((item) => {
                        return (
                            <div className="d-flex mt-4 bg-light" key={item.id}>
                                <img src={item.product.imageUrl} alt="" style={{width: "120px", height: "120px", objectFit: "cover"}} />
                                <div className="w-100 p-3 position-relative">
                                <button type="button" href="#" className="btn position-absolute" style={{top: "16px", right: "16px"}} onClick={()=> removeCartItem(item.id)}><i className="bi bi-x-circle"></i></button>
                                <p className="mb-0 fw-bold">{item.product.title}</p>
                                
                                <div className="d-flex justify-content-between align-items-center w-100">
                                    <div className="input-group w-50 align-items-center">
                                        <select name="" className="form-select" id=""
                                        disabled={loadingItems.includes(item.id)}
                                        value={item.qty}
                                        onChange={(e)=>{
                                            updateCartItem(item, e.target.value * 1)
                                        }}>
                                            {
                                                [...(new Array(20))].map((_, num) => {
                                                    return(
                                                        <option value={num+1} key={num}>{num+1}</option>

                                                    )
                                                })

                                            }

                                        </select>
                                    </div>
                                    <p className="mb-0 ms-auto">NT$ {item.final_total}</p>
                                </div>
                                </div>
                            </div>
                        )

                    })}

                    <table className="table mt-4 text-muted">
                        <tbody>
                        <tr>
                            <th scope="row" className="border-0 px-0 font-weight-normal">優惠碼</th>
                            <td className="text-end border-0 px-0">
                                <input type="text" id="coupon" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                                <button type="button" className="btn" onClick={()=> addCoupon(couponCode)}>套用</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <p className='mt-2 text-end text-muted'><del>NT$ {cartData.total}</del></p>
                    <div className="d-flex justify-content-between mt-4">
                        <p className="mb-0 h4 fw-bold">總金額</p>
                        <p className="mb-0 h4 fw-bold">NT$ {cartData.final_total}</p>
                    </div>
                    <Link to="/checkout" className={`btn btn-dark w-100 mt-4 rounded-0 py-3 ${noItem ? "disable-link" : ""} `}>確認訂單正確</Link>
                    </div>
                </div>
                </div>
        
        </>
    )
}

export default Cart;