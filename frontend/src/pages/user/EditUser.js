import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import LayoutAdmin from '../../layout/LayoutAdmin'

function EditUser() {
	
	const navigate = useNavigate();

    const {id} = useParams();
    
    const [values, setValues] = useState({
        nama_user: '',
        username: '',
        password: '',
        role: ''
    })

    useEffect(()=> {
        axios.get('http://localhost:8081/edituser/'+id)
        .then(res => {
            console.log(res)
            setValues({
                ...values, 
                nama_user: res.data[0].nama_user, 
                username: res.data[0].username,
                role: res.data[0].role
            });
        })
        .catch(err => console.log(err));
    }, [])

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8081/updateuser/'+id, values)
        .then(res => {
            Swal.fire({
				icon:"success",
				title:"SUCCESS",
				text:"Data Berhasil Diubah"
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
						<h4 class="page-title">Edit Data User</h4>
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
								<Link href="#">Edit Data</Link>
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
										<h4 class="card-title">Edit Data user</h4>
									</div>
								</div>
								<form onSubmit={handleUpdate}>
								<div class="card-body">
									<div className='form-group'>
										<label>Nama Lengkap</label>
										<input type='text' className='form-control' name='nama_user' placeholder='Nama Lengkap ...' 
										value={values.nama_user} onChange={e => setValues({...values, nama_user: e.target.value})} required />
									</div>
									<div className='form-group'>
										<label>Username</label>
										<input type='text' className='form-control' name='username' placeholder='Username ...' 
										value={values.username} onChange={e => setValues({...values, username: e.target.value})} required />
									</div>
									<div className='form-group'>
										<label>Password</label>
										<input type='password' className='form-control' name='password' placeholder='Password ...' 
										onChange={e => setValues({...values, password: e.target.value})} required />
									</div>
									<div className='form-group'>
										<label>Role</label>
										<select className='form-control' name='role' value={values.role} onChange={e => setValues({...values, role: e.target.value})} required>
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

export default EditUser
