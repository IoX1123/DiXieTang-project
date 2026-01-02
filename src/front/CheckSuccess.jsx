import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL, API_PATH } from "../config/api";

function CheckSuccess() {
    const {orderID} = useParams();
    const [orderData, setOrderData] = useState({});
    const getCart = async(orderID) => {
        const res = await axios.get(
                `${API_BASE_URL}v2/api/${API_PATH}/order/${orderID}`,
                
        );
        
        setOrderData(res.data.order)
    }
    useEffect(()=>{
        getCart(orderID)
    }, [orderID])
    return(
        <>
        <div className="container">
     
      <div className="mt-5 mb-7">
        <div className="row">
          <div className="col-md-4">
            <h2>訂購成功!!</h2>
            
            <Link to="/" className="btn btn-outline-dark me-2 rounded-0 mb-4">回首頁</Link>
          </div>
          <div className="col-md-8">
            <div className="card rounded-0 py-4">
              <div className="card-header border-bottom-0 bg-white px-4 py-0">
                <h2>訂單明細</h2>
              </div>
              <div className="card-body px-4 py-0">
                <ul className="list-group list-group-flush">
                    {Object.values(orderData?.products || {}).map((item) => {
                        return (
                        <li className="list-group-item px-0" key={item.id}>
                            <div className="d-flex mt-2">
                            <img src={item.product.imageUrl} alt="" className="me-2" style={{width: "60px", height: "60px", objectFit: "cover"}} />
                            <div className="w-100 d-flex flex-column">
                                <div className="d-flex justify-content-between fw-bold">
                                <h5>{item.product.title}</h5>
                                <p className="mb-0">x{item.qty}</p>
                                </div>
                                <div className="d-flex justify-content-between mt-auto">
                                <p className="text-muted mb-0"><small>NT${item.product.price}</small></p>
                                <p className="mb-0">NT${item.final_total}</p>
                                </div>
                            </div>
                            </div>
                        </li>
                        )
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    )
}

export default CheckSuccess;