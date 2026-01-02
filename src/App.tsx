import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCoupon from "./pages/admin/AdminCoupon";
import AdminOrder from "./pages/admin/AdminOrder";
import FrontLayout from "./front/FrontLayout";
import Home from "./front/Home";
import Products from "./front/Products";
import ProductDetail from "./front/ProductDetail";
import Cart from "./front/Cart";
import Checkout from "./front/Checkout";
import CheckSuccess from "./front/CheckSuccess";
import { API_BASE_URL, API_PATH} from "./config/api"


function App() {
  
  return (
    <>
     <Routes>
        <Route path="/" element={<FrontLayout/> }>
          <Route path="" element={<Home/> }></Route>
          <Route path="products" element={<Products/> }></Route>
          <Route path="products/:id" element={<ProductDetail/> }></Route>
          <Route path="cart" element={<Cart/> }></Route>
          <Route path="checkout" element={<Checkout/> }></Route>
          <Route path="success/:orderID" element={<CheckSuccess/> }></Route>
        </Route>
        {/* <Route path="/login" element={<Login/> }></Route>
        <Route path="/admin" element={<Dashboard/> }>
            <Route path="product" element={<AdminProducts/> }></Route>
            <Route path="coupon" element={<AdminCoupon/> }></Route>
            <Route path="order" element={<AdminOrder/> }></Route>
        </Route> */}
     </Routes>
    </>
  )
}


export default App
