import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LayoutAdmin from '../../layout/LayoutAdmin'
import axios from 'axios'
import Swal from 'sweetalert2'

function CreateSupplier() {

	const [values, setValues] = useState({
        nama_supplier: '',
        nohp_supplier: '',
        email_supplier: '',
        alamat_supplier: ''
    })

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/tambahsupplier', values)
        .then(res => {
            Swal.fire({
				icon:"success",
				title:"SUCCESS",
				text:"Data Berhasil Disimpan"
			})
            navigate('/supplier')
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
						<h4 class="page-title">Create Data Supplier</h4>
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
								<Link href="#">Supplier</Link>
							</li>
						</ul>
					</div>
					<div class="row">
						<div class="col-md-12">
							<div class="card">
								<div class="card-header">
									<div class="d-flex align-items-center">
										<h4 class="card-title">Create Data Supplier</h4>
									</div>
								</div>
								<form onSubmit={handleSubmit}>
								<div class="card-body">
									<div className='form-group'>
										<label>Nama Supplier</label>
										<input type='text' className='form-control' name='nama_supplier' placeholder='Nama Supplier ...' 
										onChange={e => setValues({...values, nama_supplier: e.target.value})} required />
									</div>
									<div className='form-group'>
										<label>No Handphone</label>
										<input type='number' className='form-control' name='nohp_supplier' placeholder='No Handphone ...' 
										onChange={e => setValues({...values, nohp_supplier: e.target.value})} required />
									</div>
									<div className='form-group'>
										<label>Email</label>
										<input type='email' className='form-control' name='email_supplier' placeholder='Email ...' 
										onChange={e => setValues({...values, email_supplier: e.target.value})} required />
									</div>
									<div className='form-group'>
										<label>Alamat</label>
										<textarea className='form-control' rows='5' name='alamat_supplier' placeholder='Alamat ...' 
                                        onChange={e => setValues({...values, alamat_supplier: e.target.value})} required ></textarea>
									</div>
								</div>
								<div className='card-footer'>
									<button type='submit' className='btn btn-primary'><i className='fa fa-save'></i> Save Changes</button> &nbsp;
									<Link to="/supplier" className='btn btn-danger'><i className='fa fa-undo'></i> Kembali</Link>
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

export default CreateSupplier
