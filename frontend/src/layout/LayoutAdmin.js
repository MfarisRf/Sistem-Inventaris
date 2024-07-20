import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Profile from '../user.png';

function LayoutAdmin() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [nama_user, setNama] = useState('');
    const [role, setRole] = useState('');
  
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081')
        .then(res => {
            if (res.data.Status === "Success") {
                setAuth(true);
                setNama(res.data.nama_user);
                setRole(res.data.role);
            } else {
                setAuth(false);
                setMessage(res.data.Error);
            }
        })
        .catch(err => console.log(err));
    }, []);
  
    const handleLogout = () => {
        axios.get('http://localhost:8081/logout')
        .then(res => {
            Swal.fire({
                icon: "success",
                title: "SUCCESS",
                text: "Logout Berhasil"
            });
            navigate('/login');
        })
        .catch(err => console.log(err));
    };

    return (
        <div>
            <div className="main-header" data-background-color="purple">
                <div className="logo-header">
                    <Link to="#" className="logo">
                        <font size="5" style={{ color: "white" }} className="navbar-brand">INVENTORY</font>
                    </Link>
                    <button className="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse" data-target="collapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">
                            <i className="fa fa-bars"></i>
                        </span>
                    </button>
                    <button className="topbar-toggler more"><i className="fa fa-ellipsis-v"></i></button>
                    <div className="navbar-minimize">
                        <button className="btn btn-minimize btn-rounded">
                            <i className="fa fa-bars"></i>
                        </button>
                    </div>
                </div>
                
                <nav className="navbar navbar-header navbar-expand-lg">
                </nav>
            </div>

            <div className="sidebar">
                <div className="sidebar-wrapper scrollbar-inner">
                    <div className="sidebar-content">
                        <div className="user">
                            <div className="avatar-sm float-left mr-2">
                                <img src={Profile} alt="..." className="avatar-img rounded-circle" />
                            </div>
                            <div className="info">
                                <a data-toggle="collapse" href="#collapseExample" aria-expanded="true">
                                    <span>
                                        {nama_user}
                                        <span className="user-level">{role}</span>
                                    </span>
                                </a>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                        <ul className="nav">
                            <li className="nav-item">
                                <Link to="/home">
                                    <i className="fas fa-home"></i>
                                    <p>Dashboard</p>
                                </Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link to="/user">
                                    <i className="fas fa-user"></i>
                                    <p>Data User</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/customer">
                                    <i className="fas fa-users"></i>
                                    <p>Data Customer</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/supplier">
                                    <i className="fas fa-users"></i>
                                    <p>Data Supplier</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/katalog">
                                    <i className="fas fa-box"></i>
                                    <p>Data Catalog</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/barang">
                                    <i className="fas fa-cube"></i>
                                    <p>Data Barang</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/laporanbarangmasuk">
                                    <i className="fas fa-archive"></i>
                                    <p>Laporan Barang Masuk</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/laporanbarangkeluar">
                                    <i className="fas fa-archive"></i>
                                    <p>Laporan Barang Keluar</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={handleLogout}>
                                    <i className="fas fa-lock"></i>
                                    <p>Logout</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LayoutAdmin;
