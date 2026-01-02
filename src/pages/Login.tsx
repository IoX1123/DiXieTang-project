
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        "username": "",
        "password": ""
    });
    const [loginState, setLoginState] = useState({})
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({...data, [name]:value})
    }

    const submit = async (e) => {
        if(data.username === "" || data.password === "") {
            setLoginState({"message": "請輸入帳號或密碼"});
        } else {
            try {
                const res = await axios.post(`${import.meta.env.VITE_API_URL}v2/admin/signin`, data);
                const {token, expired} = res.data;
                document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
                if(res.data.success) {
                    setTimeout(()=>{
                        navigate('/admin/product');
                    }, 1000)
                }
            } catch (error) {
                setLoginState(error.response.data);
            }
        }
        setTimeout(()=>{
            setLoginState({"message":""})
        }, 3000)
    }
    return(
        
            <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-info">
            <div className="card shadow mt-3" style={{ width: '100%', maxWidth: '440px' }}>
                <div className="card-body p-4">
                    <h3 className="text-center mb-4">登入帳號</h3>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                        帳號
                        </label>
                        <input
                        type="email"
                        name="username"
                        id="email"
                        className="form-control"
                        placeholder="Email Address"
                        onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                        密碼
                        </label>
                        <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        onChange={handleChange}
                        />
                    </div>

                    <button
                        type="button"
                        className="btn btn-primary w-100 mt-3"
                        onClick={submit}
                    >
                        登入
                    </button>
                    <div className={`alert mt-3 alert-danger ${loginState.message ? 'd-block' : 'd-none'}`}>{loginState.message}</div>
                </div>
            </div>
            </div>
        
    )
}

export default Login;


