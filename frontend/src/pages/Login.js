import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login() {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })
  
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/login', values)
        .then(res => {
            if(res.data.Status === "Success") {
                Swal.fire({
                    icon:"success",
                    title:"SUCCESS",
                    text:"Login Berhasil"
                })
                navigate('/home');
            }else {
                alert(res.data.Error);
            }
        })
        .then(err => console.log(err));
    }

  return (
    <div className='login'>
        <div class="wrapper wrapper-login">
            <div class="container container-login animated fadeIn">
                <h3 class="text-center">Silahkan Login</h3>
                <form onSubmit={handleSubmit}>
                <div class="login-form">
                    <div class="form-group form-floating-label">
                        <input id="username" name="username" type="text" onChange={e => setValues({...values, username: e.target.value})} 
                        class="form-control input-border-bottom" required />
                        <label for="username" class="placeholder">Username</label>
                    </div>
                    <div class="form-group form-floating-label">
                        <input id="password" name="password" type="password" onChange={e => setValues({...values, password: e.target.value})} 
                        class="form-control input-border-bottom" required />
                        <label for="password" class="placeholder">Password</label>
                        <div class="show-password">
                            <i class="flaticon-interface"></i>
                        </div>
                    </div>
                    <div class="form-action mb-3">
                        <button type='submit' class="btn btn-primary btn-rounded btn-login">Sign In</button>
                    </div>
                </div>
                </form>
            </div>
	    </div>
    </div>
  )
}

export default Login
