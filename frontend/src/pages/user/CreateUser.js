import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LayoutAdmin from '../../layout/LayoutAdmin'
import axios from 'axios'
import Swal from 'sweetalert2'

function CreateUser() {

	const [values, setValues] = useState({
        nama_user: '',
        username: '',
        password: '',
        role: ''
    })

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/tambahuser', values)
        .then(res => {
            Swal.fire({
				icon:"success",
				title:"SUCCESS",
				text:"Data Berhasil Disimpan"
			})
            navigate('/user')
        })
        .catch(err => console.log(err));
    }

  return (
    <div class="wrapper">
        <LayoutAdmin />
        
        <div class="main-panel">
			<div class="content">
				<div class="page-inner">
					<div class="page-header">
						<h4 class="page-title">Create Data User</h4>
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
								<Link href="#">Create Data</Link>
							</li>
							<li class="separator">
								<i class="flaticon-right-arrow"></i>
							</li>
							<li class="nav-item">
								<Link href="#">User</Link>
							</li>
						</ul>
					</div>
					<div class="row">
						<div class="col-md-12">
							<div class="card">
								<div class="card-header">
									<div class="d-flex align-items-center">
										<h4 class="card-title">Create Data user</h4>
									</div>
								</div>
								<form onSubmit={handleSubmit}>
								<div class="card-body">
									<div className='form-group'>
										<label>Nama Lengkap</label>
										<input type='text' className='form-control' name='nama_user' placeholder='Nama Lengkap ...' 
										onChange={e => setValues({...values, nama_user: e.target.value})} required />
									</div>
									<div className='form-group'>
										<label>Username</label>
										<input type='text' className='form-control' name='username' placeholder='Username ...' 
										onChange={e => setValues({...values, username: e.target.value})} required />
									</div>
									<div className='form-group'>
										<label>Password</label>
										<input type='password' className='form-control' name='password' placeholder='Password ...' 
										onChange={e => setValues({...values, password: e.target.value})} required />
									</div>
									<div className='form-group'>
										<label>Role</label>
										<select className='form-control' name='role' onChange={e => setValues({...values, role: e.target.value})} required>
											<option value="" hidden>-- Pilih Role --</option>
											<option value="admin">Admin</option>
											<option value="gudang">Gudang</option>
										</select>
									</div>
								</div>
								<div className='card-footer'>
									<button type='submit' className='btn btn-primary'><i className='fa fa-save'></i> Save Changes</button> &nbsp;
									<Link to="/user" className='btn btn-danger'><i className='fa fa-undo'></i> Kembali</Link>
								</div>
								</form>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
    </div>
  )
}

export default CreateUser
