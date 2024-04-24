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
                            <li className="nav-section">
                                <span className="sidebar-mini-icon">
                                    <i className="fa fa-ellipsis-h"></i>
                                </span>
                                <h4 className="text-section">Components</h4>
                            </li>
                            <li className="nav-item">
                                <a data-toggle="collapse" href="#base">
                                    <i className="fas fa-layer-group"></i>
                                    <p>Data Master</p>
                                    <span className="caret"></span>
                                </a>
                                <div className="collapse" id="base">
                                    <ul className="nav nav-collapse">
                                        <li>
                                            <Link to="/user">
                                                <span className="sub-item">Data User</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/customer">
                                                <span className="sub-item">Data Customer</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/supplier">
                                                <span className="sub-item">Data Supplier</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/Katalog">
                                                <span className="sub-item">Data Catalog</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link to="/barang">
                                    <i className="fas fa-briefcase"></i>
                                    <p>Data Barang</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a data-toggle="collapse" href="#laporan">
                                    <i className="fas fa-file"></i>
                                    <p>Data Laporan</p>
                                    <span className="caret"></span>
                                </a>
                                <div className="collapse" id="laporan">
                                    <ul className="nav nav-collapse">
                                        <li>
                                            <Link to="/laporanbarangmasuk">
                                                <span className="sub-item">Laporan Barang Masuk</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/laporanbarangkeluar">
                                                <span className="sub-item">Laporan Barang Keluar</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
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
