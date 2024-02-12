import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import LayoutGudang from '../../layout/LayoutGudang'
import axios from 'axios'
import moment from 'moment'

function DetailBarangMasuk() {

	const {id} = useParams();
    const [barangmasuk, setBarangMasuk] = useState([])
    
    useEffect(()=> {
        axios.get('http://localhost:8081/detailbarangmasuk/'+id)
        .then(res => {
            console.log(res)
            setBarangMasuk(res.data[0]);
        })
        .catch(err => console.log(err));
    }, [])

  return (
    <div class="wrapper">
        <LayoutGudang />
        
        <div class="main-panel">
			<div class="content">
				<div class="page-inner">
					<div class="page-header">
						<h4 class="page-title">Detail Data Barang Masuk</h4>
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
								<Link href="#">Detail Data</Link>
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
										<h4 class="card-title">Detail Data Barang Masuk</h4>
										<Link class="btn btn-primary btn-round ml-auto" to="/barangmasuk">
											<i class="fa fa-undo"></i> 
											Kembali
										</Link>
									</div>
								</div>
								<div class="card-body">
									<div className='row'>
                                        <div className='col-md-6'>
                                            <div className='table-responsive'>
                                                <table className='table'>
                                                    <tr>
                                                        <th>Tgl Masuk</th>
                                                        <td>: {moment(barangmasuk.tgl_masuk).format('DD/MMMM/YYYY')}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Nama Supplier</th>
                                                        <td>: {barangmasuk.nama_supplier}</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='table-responsive'>
                                                <table className='table'>
                                                    <tr>
                                                        <th>No Handphone</th>
                                                        <td>: {barangmasuk.nohp_supplier}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Alamat</th>
                                                        <td>: {barangmasuk.alamat_supplier}</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className='table-responsive'>
                                        <table className='table table-bordered'>
                                            <tr>
                                                <th>Nama Barang</th>
                                                <th>Harga</th>
                                                <th>Stok Masuk</th>
                                                <th>Total</th>
                                            </tr>
                                            <tr>
                                                <td>{barangmasuk.nama_barang}</td>
                                                <td>Rp. {parseInt(barangmasuk.harga).toLocaleString()}</td>
                                                <td>{barangmasuk.stok_masuk} Pcs</td>
                                                <td>Rp. {parseInt(barangmasuk.total).toLocaleString()}</td>
                                            </tr>
                                        </table>
                                    </div>
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

export default DetailBarangMasuk
