import React, {useEffect, useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import LayoutAdmin from '../layout/LayoutAdmin'
import LayoutGudang from '../layout/LayoutGudang'
import axios from 'axios'

function Home() {
	const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [nama_user, setNama] = useState('');
    const [role, setRole] = useState('');
  
    axios.defaults.withCredentials = true;

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

  return (
    <div class="wrapper">
		{role === "admin" && <LayoutAdmin />}
        {role === "gudang" && <LayoutGudang />}
        
        <div class="main-panel">
			<div class="content">
				<div class="page-inner">
					<div class="page-header">
						<h4 class="page-title">Dashboard</h4>
						<ul class="breadcrumbs">
							<li class="nav-home">
								<Link href="#">
									<i class="flaticon-home"></i>
								</Link>
							</li>
							<li class="separator">
								<i class="flaticon-right-arrow"></i>
							</li>
							<li class="nav-item">
								<Link href="#">Dashboard</Link>
							</li>
							<li class="separator">
								<i class="flaticon-right-arrow"></i>
							</li>
							<li class="nav-item">
								<Link href="#">Dashboard</Link>
							</li>
						</ul>
					</div>
					<div class="row">
						<div class="col-md-12">
							<div class="card">
								<div class="card-body">
									<center>
										<h2><strong>SISTEM INVENTORY REACT JS & NODE JS</strong></h2><br/>
										<h3><strong>SELAMAT DATANG ({nama_user})</strong></h3>
									</center>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
    </div>
  )
}

export default Home
