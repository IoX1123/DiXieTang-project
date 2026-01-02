import { useEffect, useRef, useState, useMemo } from "react";
import axios from "axios";
import Pagenation from "../components/Pagenation";
import { Link } from "react-router-dom";
import { API_BASE_URL, API_PATH } from "../config/api";


function Products() {
    const [products, setProducts] = useState([]);
    const [pagnation, setPagnation ] = useState({});
    const [allproduct, setAllProducts] = useState([]);
    const categories = useMemo(() => {
        return [...new Set(allproduct.map(item => item.category))];
    }, [allproduct]);

    const [activeCategory, setActiveCategory] = useState(null);


    const getProduct = async(page = 1) =>{
      const product = await axios.get(`${API_BASE_URL}v2/api/${API_PATH}/products?page=${page}`);
             setProducts(product.data.products);
             setPagnation(product.data.pagination);
    }
    const getAllProduct = async() =>{
      const allproduct = await axios.get(`${API_BASE_URL}v2/api/${API_PATH}/products/all`);
             setAllProducts(allproduct.data.products);
    }

    const getCategoryProduct = async(category) =>{
      const categoryproduct = await axios.get(`${API_BASE_URL}v2/api/${API_PATH}/products?category=${category}`);
            setProducts(categoryproduct.data.products);
            setPagnation(categoryproduct.data.pagination);
            setActiveCategory(category);
    }

    useEffect(()=>{
        // getCategoryProduct()
        getProduct();
        getAllProduct();
    }, [])
    const product_enable = products.filter((item)=> item.is_enabled === 1)
    
    return(
        <>
                <div className="container mt-md-5 mt-3 mb-7">
                <div className="row">
                    <div className="col-md-2">
                    <ul className="list-group">
                        {categories.map(category => (
                            <li className={`list-group-item list-group-item-action ${activeCategory === category ? "active" : ""} `} key={category} onClick={() => getCategoryProduct(category)}>{category}</li>
                        ))}
                    </ul>
                    </div>
                    <div className="col-md-10">
                        <div className="row">
                            {product_enable.map((item) => (
                                
                                <div className="col-md-4" key={item.id}>
                                        <div className="card border-0 mb-4 position-relative">

                                            <Link to={`/products/${item.id}`} className="product-img-link">
                                            <img
                                                src={item.imageUrl}
                                                className="card-img-top rounded-0 product-img"
                                                alt={item.title}
                                            />
                                            </Link>

                                            <div className="card-body p-0">
                                            <h4 className="mb-0 mt-3">
                                                <Link
                                                to={`/products/${item.id}`}
                                                className="text-decoration-none text-dark"
                                                >
                                                {item.title}
                                                </Link>
                                            </h4>

                                            <p className="text-muted mt-3">NT$ {item.price}</p>
                                            </div>

                                        </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <nav className="d-flex justify-content-center">
                    <Pagenation pagnation={pagnation} changePage={getProduct}></Pagenation>
                </nav>
                </div>
        </>
    )
    
}

export default Products;