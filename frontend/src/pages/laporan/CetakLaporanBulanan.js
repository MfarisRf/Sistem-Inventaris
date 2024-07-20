import React from 'react';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

function CetakLaporanBulanan() {
    const location = useLocation();
    const { filteredData } = location.state || { filteredData: [] };

    const tanggalCetak = moment().format('DD/MM/YYYY HH:mm:ss');

    return (
        <div>
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
                                {filteredData && filteredData.length > 0 ? (
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
                                            {filteredData.map((row, key) => (
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
                                ) : (
                                    <p>Tidak ada data yang tersedia untuk dicetak.</p>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CetakLaporanBulanan;
