import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import Profile from '../user.png'

function LayoutAdmin() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [nama_user, setNama] = useState('');
    const [role, setRole] = useState('');
  
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();

    useEffect(()=> {
        axios.get('http://localhost:8081')
        .then(res => {
          if(res.data.Status === "Success") {
              setAuth(true)
              setNama(res.data.nama_user)
              setRole(res.data.role)
          }else {
            setAuth(false)
            setMessage(res.data.Error)
          }
        })
        .then(err => console.log(err));
    }, [])
  
    const handleLogout = () => {
        axios.get('http://localhost:8081/logout')
        .then(res => {
            Swal.fire({
                icon:"success",
                title:"SUCCESS",
                text:"Logout Berhasil"
            })
            navigate('/login');
        }).catch(err => console.log(err));
    }


    return (
        <div>
            <div class="main-header" data-background-color="purple">
                <div class="logo-header">
                    
                    <Link href="#" class="logo">
                        <font size="5" style={{color: "white"}} class="navbar-brand">INVENTORY</font>
                    </Link>
                    <button class="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse" data-target="collapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon">
                            <i class="fa fa-bars"></i>
                        </span>
                    </button>
                    <button class="topbar-toggler more"><i class="fa fa-ellipsis-v"></i></button>
                    <div class="navbar-minimize">
                        <button class="btn btn-minimize btn-rounded">
                            <i class="fa fa-bars"></i>
                        </button>
                    </div>
                </div>
                
                <nav class="navbar navbar-header navbar-expand-lg">
                    
                </nav>
            </div>

            <div class="sidebar">
                
                <div class="sidebar-wrapper scrollbar-inner">
                    <div class="sidebar-content">
                        <div class="user">
                            <div class="avatar-sm float-left mr-2">
                                <img src={Profile} alt="..." class="avatar-img rounded-circle" />
                            </div>
                            <div class="info">
                                <a data-toggle="collapse" href="#collapseExample" aria-expanded="true">
                                    <span>
                                        {nama_user}
                                        <span class="user-level">{role}</span>
                                    </span>
                                </a>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <ul class="nav">
                            <li class="nav-item">
                                <Link to="/home">
                                    <i class="fas fa-home"></i>
                                    <p>Dashboard</p>
                                </Link>
                            </li>
                            <li class="nav-section">
                                <span class="sidebar-mini-icon">
                                    <i class="fa fa-ellipsis-h"></i>
                                </span>
                                <h4 class="text-section">Components</h4>
                            </li>
                            <li class="nav-item">
                                <a data-toggle="collapse" href="#base">
                                    <i class="fas fa-layer-group"></i>
                                    <p>Data Master</p>
                                    <span class="caret"></span>
                                </a>
                                <div class="collapse" id="base">
                                    <ul class="nav nav-collapse">
                                        <li>
                                            <Link to="/user">
                                                <span class="sub-item">Data User</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/customer">
                                                <span class="sub-item">Data Customer</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/supplier">
                                                <span class="sub-item">Data Supplier</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/Katalog">
                                                <span class="sub-item">Data Catalog</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="nav-item">
                                <Link to="/barang">
                                    <i class="fas fa-briefcase"></i>
                                    <p>Data Barang</p>
                                </Link>
                            </li>
                            <li class="nav-item">
                                <a data-toggle="collapse" href="#laporan">
                                    <i class="fas fa-file"></i>
                                    <p>Data Laporan</p>
                                    <span class="caret"></span>
                                </a>
                                <div class="collapse" id="laporan">
                                    <ul class="nav nav-collapse">
                                        <li>
                                            <Link to="/laporanbarangmasuk">
                                                <span class="sub-item">Laporan Barang Masuk</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/laporanbarangkeluar">
                                                <span class="sub-item">Laporan Barang Keluar</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="nav-item">
                                <Link onClick={handleLogout}>
                                    <i class="fas fa-lock"></i>
                                    <p>Logout</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default LayoutAdmin
