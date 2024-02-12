import React, {useEffect, useState, useRef} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print'

function CetakBarangMasuk() {

	const {id} = useParams();
    const [barangmasuk, setBarangMasuk] = useState([])
    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-data',
        // onAfterPrint: () => alert('Print Success')
    })

    useEffect(()=> {
        axios.get('http://localhost:8081/cetakbarangmasuk/'+id)
        .then(res => {
            console.log(res)
            setBarangMasuk(res.data[0]);
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
                        CETAK BARANG MASUK
                    </p>
                
                <hr/>
                
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
  )
}

export default CetakBarangMasuk
