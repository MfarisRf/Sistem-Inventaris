import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import LayoutGudang from '../../layout/LayoutGudang'
import axios from 'axios'
import moment from 'moment'

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

function ListBarangKeluar() {

	const [data, setData] = useState([]);

	useEffect(()=>{
        fetchData() 
		$(document).ready(function () {
			setTimeout(function(){
			$('#example').DataTable();
			 } ,1000);
		});
    },[])

    const fetchData = async () => {
        await axios.get('http://localhost:8081/barangkeluar')
		.then(res => setData(res.data))
		.catch(err => console.log(err));
    }

  return (
    <div class="wrapper">
        <LayoutGudang />
        
        <div class="main-panel">
			<div class="content">
				<div class="page-inner">
					<div class="page-header">
						<h4 class="page-title">Data Barang Keluar</h4>
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
								<Link href="#">Data</Link>
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
										<h4 class="card-title">Data Barang Keluar</h4>
										<Link class="btn btn-primary btn-round ml-auto" to="/createBarangKeluar">
											<i class="fa fa-plus"></i> 
											Tambah Data
										</Link>
									</div>
								</div>
								<div class="card-body">
									<div class="table-responsive">
										<table id='example' class="display table table-striped table-hover" >
											<thead>
												<tr>
													<th>No</th>
                                                    <th>Customer</th>
                                                    <th>Barang</th>
													<th>Tgl Keluar</th>
													<th>Stok Keluar</th>
													<th>Total</th>
                                                    <th>Action</th>
												</tr>
											</thead>
											<tbody>
											{data.map((row, key)=>(
												<tr key={key}>
													<td>{key + 1}</td>
													<td>{row.nama_customer}</td>
                                                    <td>{row.nama_barang}</td>
													<td>{moment(row.tgl_keluar).format('DD/MMMM/YYYY')}</td>
                                                    <td>{row.stok_keluar} Pcs</td>
													<td>Rp. {row.total.toLocaleString()}</td>
                                                    <td>
                                                        <Link to={`/detailBarangKeluar/${row.id}`} className='btn btn-xs btn-success'><i className='fa fa-list'></i></Link> &nbsp;
                                                        <Link to={`/cetakBarangKeluar/${row.id}`} target='_blank' className='btn btn-xs btn-secondary'><i className='fa fa-print'></i></Link>
                                                    </td>
												</tr>
											))}
											</tbody>
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

export default ListBarangKeluar
