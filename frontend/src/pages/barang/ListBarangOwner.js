import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import LayoutOwner from '../../layout/LayoutOwner'
import axios from 'axios'
import Swal from 'sweetalert2'

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

function ListBarangOwner() {
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
        await axios.get('http://localhost:8081/barang')
		.then(res => setData(res.data))
		.catch(err => console.log(err));
    }

	const handleDelete = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            return;
          }

          axios.delete('http://localhost:8081/deletebarang/'+id)
			.then(res => {
				Swal.fire({
					icon:"success",
					title:"SUCCESS",
					text:"Data Berhasil Dihapus"
				})
				fetchData()
			}).catch(err => console.log(err));
    }

  return (
    <div class="wrapper">
        <LayoutOwner />
        
        <div class="main-panel">
			<div class="content">
				<div class="page-inner">
					<div class="page-header">
						<h4 class="page-title">Data Barang</h4>
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
								<Link href="#">Barang</Link>
							</li>
						</ul>
					</div>
					<div class="row">
						<div class="col-md-12">
							<div class="card">
								<div class="card-header">
									<div class="d-flex align-items-center">
										<h4 class="card-title">Data Barang</h4>
									</div>
								</div>
								<div class="card-body">
									<div class="table-responsive">
										<table id='example' class="display table table-striped table-hover" >
											<thead>
												<tr>
													<th>No</th>
													<th>Barang</th>
													<th>Stok</th>
													<th>Harga per Kg</th>
													<th>Deskripsi</th>
												</tr>
											</thead>
											<tbody>
											{data.map((row, key)=>(
												<tr key={key}>
													<td>{key + 1}</td>
													<td>{row.nama_barang}</td>
													<td>{row.stok} Kg</td>
													<td>Rp. {row.harga.toLocaleString()}</td>
													<td>{row.deskripsi}</td>
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

export default ListBarangOwner
