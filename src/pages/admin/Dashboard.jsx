import {Outlet, useNavigate, Link} from 'react-router-dom';
import axios from "axios";
import { useEffect, useReducer } from 'react';
import Message from '../../components/Message';
import { messageReducer, MessageContext, initState } from '../../store/messageStore';
import { API_BASE_URL} from "../../config/api";

function Dashboard() {
    const logouted = useNavigate();
    const handlLogout = () => {
        document.cookie = "hexToken=";
        logouted('/login');
    }
    const reducer = useReducer(messageReducer, initState);
    const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("hexToken="))
            ?.split("=")[1];

    axios.defaults.headers.common['Authorization'] = token;

    useEffect(()=>{
      
      if(!token) {
       return logouted('/login');
      }
      (async()=>{
        try {
          const res = await axios.post(`${API_BASE_URL}v2/api/user/check`);
        } catch (error) {
          if(!error.response.data.success) logouted('/login');
        }
      })()
    }, [logouted, token])



  return (
    <MessageContext.Provider value={reducer}>
    <Message />
      <nav className='navbar navbar-expand-lg bg-info'>
        <div className='container-fluid'>
          <p className='text-white fw-bold fs-4 mb-0'>後台管理系統</p>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon' />
          </button>
          <div
            className='collapse navbar-collapse justify-content-end'
            id='navbarNav'
          >
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <button type='button' className='btn btn-warning' onClick={handlLogout}>
                  登出
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className='d-flex' style={{ minHeight: 'calc(100vh - 56px)' }}>
        <div className='bg-light' style={{ width: '200px' }}>
          <ul className='list-group list-group-flush'>
            <Link
              className='list-group-item list-group-item-action py-3'
              to='/admin/product'
            >
              <i className='bi bi-cup-fill me-2' />
              產品列表
            </Link>
            <Link
              className='list-group-item list-group-item-action py-3'
              to='/admin/coupon'
            >
              <i className='bi bi-ticket-perforated-fill me-2' />
              優惠卷列表
            </Link>
            <Link
              className='list-group-item list-group-item-action py-3'
              to='/admin/order'
            >
              <i className='bi bi-receipt me-2' />
              訂單列表
            </Link>
          </ul>
        </div>
        <div className='w-100'>
          {/* Products */}
          {token && <Outlet/>}
          {/* Products end */}
        </div>
      </div>
    </MessageContext.Provider>
  );
}

export default Dashboard;