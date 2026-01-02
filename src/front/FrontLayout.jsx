import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";


function FrontLayout() {
    const [cartData, setCartData] = useState({});
    const getCartData = async() => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}v2/api/${import.meta.env.VITE_API_PATH}/cart`)
            setCartData(res.data.data);
            
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        getCartData();
    }, [])
    
    return(
        <>
            <Navbar cartData={cartData}></Navbar>
                <Outlet context={{ getCartData, cartData}}></Outlet>
            <div className="bg-dark">
            <div className="container">
                <div className="d-flex align-items-center justify-content-between text-white py-4">
                <p className="mb-0">© 2020 LOGO All Rights Reserved.</p>
                <ul className="d-flex list-unstyled mb-0 h4">
                    <li><a href="#" className="text-white mx-3"><i className="fab fa-facebook"></i></a></li>
                    <li><a href="#" className="text-white mx-3"><i className="fab fa-instagram"></i></a></li>
                    <li><a href="#" className="text-white ms-3"><i className="fab fa-line"></i></a></li>
                </ul>
                </div>
            </div>
            </div>
        </>
    )
}

export default FrontLayout;