import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";


function ProductDetail() {
    const [product, setProduct] = useState([]);
    const { id } = useParams();
    const [cartqty, setCartqty] = useState(1);
    const [isLoading , setIsLoading] = useState(false);
    const { getCartData } = useOutletContext();
    const navigate = useNavigate();

    const getProduct = async(id) =>{
      const res = await axios.get(`${import.meta.env.VITE_API_URL}v2/api/${import.meta.env.VITE_API_PATH}/product/${id}`);
             setProduct(res.data.product);
           
    }


    const goBack = () => {
        navigate(-1);
    }

    const addToCart = async() => {
        const data = {
            data: {
                product_id: product.id,
                qty: cartqty
            }
        }
        setIsLoading(true);
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}v2/api/${import.meta.env.VITE_API_PATH}/cart`, 
                data
            )
            setIsLoading(false);
            getCartData();
        } catch (error) {
            setIsLoading(true);
        }
    }

    useEffect(()=>{
        getProduct(id);
    }, [id])

    return(
        <>
            <div className="container">
            {/* <div style={{minHeight: "700px", 
            backgroundImage: `url(${product.imageUrl})`,
            backgroundPosition: "center center"}}>
            </div> */}
            <div>
                {/* <i className="bi bi-box-arrow-left" onClick={goBack}></i> */}
                <button type="button" className="btn btn-outline-secondary" onClick={goBack}>回到上一頁</button>
            </div>
            <div className="row justify-content-between mt-4 mb-7">
                <div className="col-md-7">
                    <img src={product.imageUrl} alt="..." className="product-detail"/>
                
                
                <div className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3" id="accordionExample">
                    <div className="card border-0">
                    <div className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                        <div className="d-flex justify-content-between align-items-center pe-1">
                        <h4 className="mb-0">
                            產品成分
                        </h4>
                        <i className="fas fa-minus"></i>
                        </div>
                    </div>
                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="card-body pb-5">
                            {product.content}
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-md-4">
                    <div>
                        <h2 className="mb-0">{product.title}</h2>
                        <p className="fw-bold">NT$ {product.price}</p>
                    </div>
                <div className="input-group mb-3 border mt-3">
                    <div className="input-group-prepend">
                    <button className="btn btn-outline-dark rounded-0 border-0 py-3" type="button" id="button-addon1"
                        onClick={()=>{setCartqty((pre)=>pre === 1 ? pre : pre-1)}}
                    >
                        <i className="bi bi-dash"></i>
                    </button>
                    </div>
                    <input type="number" 
                        className="form-control border-0 text-center my-auto shadow-none" 
                        placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"  
                        readOnly
                        value={cartqty}
                    />
                    <div className="input-group-append">
                    <button className="btn btn-outline-dark rounded-0 border-0 py-3" type="button" id="button-addon2"
                        onClick={()=>{setCartqty((pre)=>pre+1)}}
                    >
                        <i className="bi bi-plus"></i>
                    </button>
                    </div>
                </div>
                <button type="button" className="btn btn-dark w-100 rounded-0 py-3" 
                onClick={()=>addToCart()}
                disabled={isLoading}
                >加入購物車</button>
                </div>
            </div>
            </div>
        
        </>
    )
}

export default ProductDetail;