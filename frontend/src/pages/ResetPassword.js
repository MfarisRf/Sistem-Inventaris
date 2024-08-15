import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function ResetPassword() {
    const [values, setValues] = useState({
        token: new URLSearchParams(window.location.search).get('token') || '',
        newPassword: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Submitting values:', values);

        if (values.newPassword !== values.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Passwords do not match'
            });
            return;
        }

        try {
            const response = await axios.post('http://localhost:8081/reset-password', values);
            console.log('Response:', response.data);

            if (response.data.Status === 'Password updated successfully') {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Password reset successful'
                });
                navigate('/login');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.data.Error || 'An unknown error occurred'
                });
            }
        } catch (err) {
            console.error('Error:', err.response ? err.response.data : err.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong. Please try again.'
            });
        }
    }

    return (
        <div className='login'>
            <div className="wrapper wrapper-login">
                <div className="container container-login animated fadeIn">
                    <h3 className="text-center">Reset Password</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="login-form">
                            <div className="form-group form-floating-label">
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    value={values.newPassword}
                                    onChange={e => setValues({ ...values, newPassword: e.target.value })}
                                    className="form-control input-border-bottom"
                                    required
                                />
                                <label htmlFor="newPassword" className="placeholder">New Password</label>
                            </div>
                            <div className="show-password">
                                <i className="flaticon-interface"></i>
                            </div>
                            <div className="form-group form-floating-label">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={values.confirmPassword}
                                    onChange={e => setValues({ ...values, confirmPassword: e.target.value })}
                                    className="form-control input-border-bottom"
                                    required
                                />
                                <label htmlFor="confirmPassword" className="placeholder">Confirm Password</label>
                            </div>
                            <div className="show-password">
                                <i className="flaticon-interface"></i>
                            </div>
                            <div className="form-action mb-3">
                                <button type='submit' className="btn btn-primary btn-rounded btn-login">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
