import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LayoutAdmin from '../../layout/LayoutAdmin'
import axios from 'axios'
import Swal from 'sweetalert2'

function CreateBarang() {

	const [values, setValues] = useState({
        nama_barang: '',
        harga: '',
        stok: '',
        deskripsi: ''
    })

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/tambahbarang', values)
        .then(res => {
            Swal.fire({
				icon:"success",
				title:"SUCCESS",
				text:"Data Berhasil Disimpan"
			})
            navigate('/barang')
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
						<h4 class="page-title">Create Data Barang</h4>
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
										<label>Nama Barang</label>
										<input type='text' className='form-control' name='nama_barang' placeholder='Nama Barang ...' 
										onChange={e => setValues({...values, nama_barang: e.target.value})} required />
									</div>
									<div class="form-group">
                                        <label>Harga</label>
										<div class="input-group mb-3">
											<div class="input-group-prepend">
												<span class="input-group-text" id="basic-addon1">Rp</span>
											</div>
											<input type="number" class="form-control" placeholder="Harga ..." name='harga' 
                                            onChange={e => setValues({...values, harga: e.target.value})} required />
										</div>
									</div>
                                    <div class="form-group">
                                        <label>Stok</label>
										<div class="input-group mb-3">
											<input type="number" class="form-control" placeholder="Stok ..." name='stok' 
                                            onChange={e => setValues({...values, stok: e.target.value})} required />
                                            <div class="input-group-prepend">
												<span class="input-group-text" id="basic-addon1">Pcs</span>
											</div>
										</div>
									</div>
									<div className='form-group'>
										<label>Deskripsi</label>
										<textarea className='form-control' rows='5' name='deskripsi' placeholder='Deskripsi ...' 
                                        onChange={e => setValues({...values, deskripsi: e.target.value})} required ></textarea>
									</div>
								</div>
								<div className='card-footer'>
									<button type='submit' className='btn btn-primary'><i className='fa fa-save'></i> Save Changes</button> &nbsp;
									<Link to="/barang" className='btn btn-danger'><i className='fa fa-undo'></i> Kembali</Link>
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

export default CreateBarang
