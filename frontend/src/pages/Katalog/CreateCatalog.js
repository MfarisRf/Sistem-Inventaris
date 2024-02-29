import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LayoutAdmin from '../../layout/LayoutAdmin'
import axios from 'axios'
import Swal from 'sweetalert2'

function CreateCatalog() {

	const [values, setValues] = useState({
        nama_katalog: '',
		image: '',
		deskripsi: ''

    })

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/tambahkatalog', values)
        .then(res => {
            Swal.fire({
				icon:"success",
				title:"SUCCESS",
				text:"Data Berhasil Disimpan"
			})
            navigate('/katalog')
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
						<h4 class="page-title">Create Data Katalog</h4>
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
								<Link href="#">Barang</Link>
							</li>
						</ul>
					</div>
					<div class="row">
						<div class="col-md-12">
							<div class="card">
								<div class="card-header">
									<div class="d-flex align-items-center">
										<h4 class="card-title">Create Data Barang</h4>
									</div>
								</div>
								<form onSubmit={handleSubmit}>
								<div class="card-body">
									<div className='form-group'>
										<label>Nama Katalog</label>
										<input type='text' className='form-control' name='nama_barang' placeholder='Nama Barang ...' 
										onChange={e => setValues({...values, nama_katalog: e.target.value})} required />
									</div>
									<div class="form-group">
										<label>Gambar</label>
										<input type="file" class="form-control" name='image'
										onChange={e => setValues({...values, image: e.target.value})} required />
									</div>
									<div className='form-group'>
										<label>Deskripsi</label>
										<textarea className='form-control' rows='5' name='deskripsi' placeholder='Deskripsi ...' 
                                        onChange={e => setValues({...values, deskripsi: e.target.value})} required ></textarea>
									</div>
								</div>
								<div className='card-footer'>
									<button type='submit' className='btn btn-primary'><i className='fa fa-save'></i> Save Changes</button> &nbsp;
									<Link to="/katalog" className='btn btn-danger'><i className='fa fa-undo'></i> Kembali</Link>
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

export default CreateCatalog
