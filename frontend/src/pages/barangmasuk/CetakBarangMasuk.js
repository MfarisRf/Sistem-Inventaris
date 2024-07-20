import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print'

function CetakBarangMasuk() {

    const { id } = useParams();
    const [barangmasuk, setBarangMasuk] = useState([]);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'emp-data',
        // onAfterPrint: () => alert('Print Success')
    });

    useEffect(() => {
        axios.get('http://localhost:8081/cetakbarangmasuk/' + id)
            .then(res => {
                console.log(res)
                setBarangMasuk(res.data[0]);
                handlePrint()
            })
            .catch(err => console.log(err));
    }, [id]);

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
                                                INVENTORY REACT
                                                <br />TANGERANG
                                                <br />0812121212
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <hr style={{ border: "0", borderStyle: "inset", borderTop: "1px solid #000" }} />
                            <p align="center">
                                CETAK BARANG MASUK
                                <br />Tanggal Cetak: {tanggalCetak}
                            </p>

                            <hr />

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <th>Tgl Masuk</th>
                                                    <td>: {moment(barangmasuk.tgl_masuk).format('DD/MMMM/YYYY')}</td>
                                                </tr>
                                                <tr>
                                                    <th>Nama Supplier</th>
                                                    <td>: {barangmasuk.nama_supplier}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <th>No Handphone</th>
                                                    <td>: {barangmasuk.nohp_supplier}</td>
                                                </tr>
                                                <tr>
                                                    <th>Alamat</th>
                                                    <td>: {barangmasuk.alamat_supplier}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th>Nama Barang</th>
                                            <th>Harga</th>
                                            <th>Stok Masuk</th>
                                            <th>Total</th>
                                        </tr>
                                        <tr>
                                            <td>{barangmasuk.nama_barang}</td>
                                            <td>Rp. {parseFloat(barangmasuk.harga).toLocaleString()}</td>
                                            <td>{barangmasuk.stok_masuk} Kg</td>
                                            <td>Rp. {parseFloat(barangmasuk.total).toLocaleString()}</td>
                                        </tr>
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

export default CetakBarangMasuk
