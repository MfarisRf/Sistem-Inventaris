import React, {useEffect, useState, useRef} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print'

function CetakBarangKeluar() {

	const {id} = useParams();
    const [barangkeluar, setBarangKeluar] = useState([])
    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-data',
        // onAfterPrint: () => alert('Print Success')
    })

    useEffect(()=> {
        axios.get('http://localhost:8081/cetakbarangkeluar/'+id)
        .then(res => {
            console.log(res)
            setBarangKeluar(res.data[0]);
            handlePrint()
        })
        .catch(err => console.log(err));
    }, [])

  return (
    
    <div class="row" ref={componentRef}>
        <div class="col-md-12">
            <div class="card">       
                <div class="card-body">
                    <table style={{"width": "100%"}}>
                        <tr>
                            <td align="center">
                              <span style={{"line-height": 1.6, "font-weight": "bold"}}>
                                INVENTORY REACT
                                <br/>TANGERANG
                                <br/>0812121212
                              </span>
                            </td>
                        </tr>
                    </table>

                    <hr style={{"border": "0", "border-style": "inset", "border-top": "1px solid #000"}} /> 
                    <p align="center">
                        CETAK BARANG KELUAR
                    </p>
                
                <hr/>
                
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='table-responsive'>
                            <table className='table'>
                                <tr>
                                    <th>Tgl Keluar</th>
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
                            <th>Stok Masuk</th>
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
  )
}

export default CetakBarangKeluar
