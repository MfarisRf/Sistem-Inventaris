import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import LayoutAdmin from '../../layout/LayoutAdmin'

function EditCustomer() {
	
	const navigate = useNavigate();

    const {id} = useParams();
    
    const [values, setValues] = useState({
        nama_customer: '',
        nohp_customer: '',
        email_customer: '',
        alamat_customer: ''
    })

    useEffect(()=> {
        axios.get('http://localhost:8081/editcustomer/'+id)
        .then(res => {
            console.log(res)
            setValues({
                ...values, 
                nama_customer: res.data[0].nama_customer, 
                nohp_customer: res.data[0].nohp_customer,
                email_customer: res.data[0].email_customer,
                alamat_customer: res.data[0].alamat_customer
            });
        })
        .catch(err => console.log(err));
    }, [])

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8081/updatecustomer/'+id, values)
        .then(res => {
            Swal.fire({
				icon:"success",
				title:"SUCCESS",
				text:"Data Berhasil Diubah"
			})
            navigate('/customer')
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
						<h4 class="page-title">Edit Data Customer</h4>
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
								<Link href="#">Customer</Link>
							</li>
						</ul>
					</div>
					<div class="row">
						<div class="col-md-12">
							<div class="card">
								<div class="card-header">
									<div class="d-flex align-items-center">
										<h4 class="card-title">Edit Data Customer</h4>
									</div>
								</div>
								<form onSubmit={handleUpdate}>
								<div class="card-body">
                                    <div className='form-group'>
										<label>Nama Customer</label>
										<input type='text' className='form-control' name='nama_customer' placeholder='Nama Customer ...' 
										value={values.nama_customer} onChange={e => setValues({...values, nama_customer: e.target.value})} required />
									</div>
									<div className='form-group'>
										<label>No Handphone</label>
										<input type='number' className='form-control' name='nohp_customer' placeholder='No Handphone ...' 
										value={values.nohp_customer} onChange={e => setValues({...values, nohp_customer: e.target.value})} required />
									</div>
									<div className='form-group'>
										<label>Email</label>
										<input type='email' className='form-control' name='email_customer' placeholder='Email ...' 
										value={values.email_customer} onChange={e => setValues({...values, email_customer: e.target.value})} required />
									</div>
									<div className='form-group'>
										<label>Alamat</label>
										<textarea className='form-control' rows='5' name='alamat_customer' placeholder='Alamat ...' 
                                        value={values.alamat_customer} onChange={e => setValues({...values, alamat_customer: e.target.value})} required ></textarea>
									</div>
								</div>
								<div className='card-footer'>
									<button type='submit' className='btn btn-primary'><i className='fa fa-save'></i> Save Changes</button> &nbsp;
									<Link to="/customer" className='btn btn-danger'><i className='fa fa-undo'></i> Kembali</Link>
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

export default EditCustomer
