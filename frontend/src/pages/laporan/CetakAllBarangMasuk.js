import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print'

function CetakAllBarangMasuk() {

    const [data, setData] = useState([]);
    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-data',
        // onAfterPrint: () => alert('Print Success')
    })
    
    useEffect(() => {
        fetchData() 
    }, [])

    const fetchData = async () => {
        await axios.get('http://localhost:8081/cetakallbarangmasuk')
        .then(res => {
            setData(res.data)
            handlePrint()
        })
        .catch(err => console.log(err));
    }
  
    const tanggalCetak = moment().format('DD/MM/YYYY HH:mm:ss');

    return (
        <div ref={componentRef}>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">       
                        <div className="card-body">
                            <table style={{ width: "100%" }}>
                                <tbody>
                                    <tr>
                                        <td align="center">
                                            <span style={{ lineHeight: 1.6, fontWeight: "bold" }}>
                                                Satori Rattan
                                                <br />Cirebon
                                                <br />082319523935
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <hr style={{ border: "0", borderStyle: "inset", borderTop: "1px solid #000" }} /> 
                            <p align="center">
                                CETAK LAPORAN BARANG MASUK
                                <br />Tanggal Cetak: {tanggalCetak}
                            </p>
                        
                            <hr />

                            <div className='table-responsive'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Supplier</th>
                                            <th>Barang</th>
                                            <th>Tgl Masuk</th>
                                            <th>Stok Masuk</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((row, key) => (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{row.nama_supplier}</td>
                                                <td>{row.nama_barang}</td>
                                                <td>{moment(row.tgl_masuk).format('DD/MMMM/YYYY')}</td>
                                                <td>{row.stok_masuk} Kg</td>
                                                <td>Rp. {row.total.toLocaleString()}</td>
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
    )
}

export default CetakAllBarangMasuk
