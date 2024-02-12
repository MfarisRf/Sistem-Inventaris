import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import LayoutGudang from '../../layout/LayoutGudang'
import axios from 'axios'
import moment from 'moment'

function DetailBarangKeluar() {

	const {id} = useParams();
    const [barangkeluar, setBarangKeluar] = useState([])
    
    useEffect(()=> {
        axios.get('http://localhost:8081/detailbarangkeluar/'+id)
        .then(res => {
            console.log(res)
            setBarangKeluar(res.data[0]);
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
						<h4 class="page-title">Detail Data Barang Keluar</h4>
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
								<Link href="#">Barang Keluar</Link>
							</li>
						</ul>
					</div>
					<div class="row">
						<div class="col-md-12">
							<div class="card">
								<div class="card-header">
									<div class="d-flex align-items-center">
										<h4 class="card-title">Detail Data Barang Keluar</h4>
										<Link class="btn btn-primary btn-round ml-auto" to="/barangkeluar">
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
                                                        <td>: {moment(barangkeluar.tgl_keluar).format('DD/MMMM/YYYY')}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Nama Customer</th>
                                                        <td>: {barangkeluar.nama_customer}</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='table-responsive'>
                                                <table className='table'>
                                                    <tr>
                                                        <th>No Handphone</th>
                                                        <td>: {barangkeluar.nohp_customer}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Alamat</th>
                                                        <td>: {barangkeluar.alamat_customer}</td>
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
                                                <th>Stok Keluar</th>
                                                <th>Total</th>
                                            </tr>
                                            <tr>
                                                <td>{barangkeluar.nama_barang}</td>
                                                <td>Rp. {parseInt(barangkeluar.harga).toLocaleString()}</td>
                                                <td>{barangkeluar.stok_keluar} Pcs</td>
                                                <td>Rp. {parseInt(barangkeluar.total).toLocaleString()}</td>
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

export default DetailBarangKeluar
