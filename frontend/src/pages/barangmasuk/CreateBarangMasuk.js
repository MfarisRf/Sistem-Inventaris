import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LayoutGudang from '../../layout/LayoutGudang'
import axios from 'axios'
import Swal from 'sweetalert2'

function CreateBarangMasuk() {

	const navigate = useNavigate();
  
    const [values, setValues] = useState({
        id_supplier: '',
        id_barang: '',
        tgl_masuk: '',
		stok_masuk: '',
    })

    const [barangList, setBarang]     = useState([]);
    const [supplierList, setSupplier] = useState([]);
    
    const fetchBarang = async () => {
    const response = await axios.get('http://localhost:8081/getbarang');
        
    setBarang(response.data.map(barang => ({
        	label: barang.nama_barang, 
        	value: barang.id
		})))
    }
        
    useEffect(() => {
        fetchBarang();
    }, []);

	const fetchSupplier = async () => {
	const response = await axios.get('http://localhost:8081/getsupplier');
			
		setSupplier(response.data.map(supplier => ({
			label: supplier.nama_supplier, 
			value: supplier.id
		})))
	}
			
	useEffect(() => {
		fetchSupplier();
	}, []);

	const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/tambahbarangmasuk', values)
        .then(res => {
            if(res.data.Status === "Success") {
                Swal.fire({
                    icon:"success",
                    title:"SUCCESS",
                    text:"Data Berhasil Disimpan"
                })
                navigate('/barangmasuk');
            }else {
				Swal.fire({
                    icon:"error",
                    title:"ERROR",
                    text:res.data.Error
                })
            }
        })
        .then(err => console.log(err));
    }

  return (
    <div class="wrapper">
        <LayoutGudang />
        
        <div class="main-panel">
			<div class="content">
				<div class="page-inner">
					<div class="page-header">
						<h4 class="page-title">Create Data Barang Masuk</h4>
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
								<Link href="#">Barang Masuk</Link>
							</li>
						</ul>
					</div>
					<div class="row">
						<div class="col-md-12">
							<div class="card">
								<div class="card-header">
									<div class="d-flex align-items-center">
										<h4 class="card-title">Create Data Barang Masuk</h4>
									</div>
								</div>
								<form onSubmit={handleSubmit}>
								<div class="card-body">
									<div className='form-group'>
										<label>Nama Supplier</label>
										<select className='form-control' name='id_supplier' onChange={e => setValues({...values, id_supplier: e.target.value})} required>
											<option value="" hidden>-- Pilih Supplier --</option>
                                            {
                                                supplierList.map(supplier => 
                                                <option key={supplier.value} value={supplier.value}> {supplier.label}</option>
                                            )}
										</select>
									</div>
									<div className='form-group'>
										<label>Nama Barang</label>
										<select className='form-control' name='id_barang' onChange={e => setValues({...values, id_barang: e.target.value})} required>
											<option value="" hidden>-- Pilih Barang --</option>
                                            {
                                                barangList.map(barang => 
                                                <option key={barang.value} value={barang.value}> {barang.label}</option>
                                            )}
										</select>
									</div>
									<div className='form-group'>
										<label>Tgl Masuk</label>
										<input type='date' className='form-control' name='tgl_masuk' 
										onChange={e => setValues({...values, tgl_masuk: e.target.value})} required />
									</div>
                                    <div class="form-group">
                                        <label>Stok Masuk</label>
										<div class="input-group mb-3">
											<input type="number" class="form-control" placeholder="Stok Masuk ..." name='stok_masuk' 
                                            onChange={e => setValues({...values, stok_masuk: e.target.value})} required />
                                            <div class="input-group-prepend">
												<span class="input-group-text" id="basic-addon1">Pcs</span>
											</div>
										</div>
									</div>
								</div>
								<div className='card-footer'>
									<button type='submit' className='btn btn-primary'><i className='fa fa-save'></i> Save Changes</button> &nbsp;
									<Link to="/barangmasuk" className='btn btn-danger'><i className='fa fa-undo'></i> Kembali</Link>
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

export default CreateBarangMasuk
