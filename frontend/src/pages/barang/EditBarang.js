import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import LayoutAdmin from '../../layout/LayoutAdmin'

function EditBarang() {
	
	const navigate = useNavigate();

    const {id} = useParams();
    
    const [values, setValues] = useState({
        nama_barang: '',
        harga: '',
        stok: '',
        deskripsi: ''
    })

    useEffect(()=> {
        axios.get('http://localhost:8081/editbarang/'+id)
        .then(res => {
            console.log(res)
            setValues({
                ...values, 
                nama_barang: res.data[0].nama_barang, 
                harga: res.data[0].harga,
                stok: res.data[0].stok,
                deskripsi: res.data[0].deskripsi
            });
        })
        .catch(err => console.log(err));
    }, [])

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8081/updatebarang/'+id, values)
        .then(res => {
            Swal.fire({
				icon:"success",
				title:"SUCCESS",
				text:"Data Berhasil Diubah"
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
						<h4 class="page-title">Edit Data Barang</h4>
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
								<Link href="#">Barang</Link>
							</li>
						</ul>
					</div>
					<div class="row">
						<div class="col-md-12">
							<div class="card">
								<div class="card-header">
									<div class="d-flex align-items-center">
										<h4 class="card-title">Edit Data Barang</h4>
									</div>
								</div>
								<form onSubmit={handleUpdate}>
								<div class="card-body">
                                    <div className='form-group'>
										<label>Nama Barang</label>
										<input type='text' className='form-control' name='nama_barang' placeholder='Nama Barang ...' 
										value={values.nama_barang} onChange={e => setValues({...values, nama_barang: e.target.value})} required />
									</div>
									<div class="form-group">
                                        <label>Harga</label>
										<div class="input-group mb-3">
											<div class="input-group-prepend">
												<span class="input-group-text" id="basic-addon1">Rp</span>
											</div>
											<input type="number" class="form-control" placeholder="Harga ..." name='harga' 
                                            value={values.harga} onChange={e => setValues({...values, harga: e.target.value})} required />
										</div>
									</div>
                                    <div class="form-group">
                                        <label>Stok</label>
										<div class="input-group mb-3">
											<input type="number" class="form-control" placeholder="Stok ..." name='stok' 
                                            value={values.stok} onChange={e => setValues({...values, stok: e.target.value})} required />
                                            <div class="input-group-prepend">
												<span class="input-group-text" id="basic-addon1">Pcs</span>
											</div>
										</div>
									</div>
									<div className='form-group'>
										<label>Deskripsi</label>
										<textarea className='form-control' rows='5' name='deskripsi' placeholder='Deskripsi ...' 
                                        value={values.deskripsi} onChange={e => setValues({...values, deskripsi: e.target.value})} required ></textarea>
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

export default EditBarang
