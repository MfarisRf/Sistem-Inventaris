import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/forgot-password', { email })
        .then(res => {
            if (res.data.Status === "Reset link sent to your email") {
                Swal.fire({
                    icon: "success",
                    title: "SUCCESS",
                    text: "Check your email for password reset instructions."
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: res.data.Error
                });
            }
        })
        .catch(err => {
            console.error("Error:", err); // Log error untuk debugging
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong. Please try again."
            });
        });
    }

    return (


<div className='login'>
        <div class="wrapper wrapper-login">
            <div class="container container-login animated fadeIn">
                <h3 class="text-center">Masukan Email</h3>
                <form onSubmit={handleSubmit}>
                <div class="login-form">
                    <div class="form-group form-floating-label">
                        <input id="email" name="email" type="email" onChange={e => setEmail(e.target.value)} 
                        class="form-control input-border-bottom" required />
                        <label for="password" class="placeholder">Email</label>
                    </div>
                    <div class="form-action mb-3">
                        <button type='submit' class="btn btn-primary btn-rounded btn-login">Submit</button>
                    </div>
                </div>
                </form>
            </div>
	    </div>
    </div>
  )
}
export default ForgotPassword;
