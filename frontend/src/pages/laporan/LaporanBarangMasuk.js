import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LayoutAdmin from '../../layout/LayoutAdmin';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';

function LaporanBarangMasuk() {
    const [data, setData] = useState([]);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [filteredData, setFilteredData] = useState([]);

    const navigate = useNavigate(); // Mengganti useHistory dengan useNavigate

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8081/laporanbarangmasuk');
            setData(response.data);
            filterData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const filterData = (data) => {
        let filtered = data;
        if (month !== '' && year !== '') {
            filtered = data.filter(row => {
                const date = moment(row.tgl_masuk);
                return date.format('MM') === month && date.format('YYYY') === year;
            });
        }

        if (searchTerm !== '') {
            filtered = filtered.filter(row => 
                row.nama_supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.nama_barang.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredData(filtered);
    }

    const handleDelete = async (id) => {
        const isConfirmed = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => result.isConfirmed);

        if (!isConfirmed) {
            return;
        }

        try {
            await axios.delete(`http://localhost:8081/deletelaporanmasuk/${id}`);
            Swal.fire({
                icon: "success",
                title: "SUCCESS",
                text: "Data Berhasil Dihapus"
            });
            fetchData();
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    }

    const handlePrint = () => {
        // Redirect to print page with filtered data using state
        navigate('/cetaklaporanbulanan', { state: { filteredData } });
    }

    const handleFilter = () => {
        filterData(data);
    }

    const handleResetFilter = () => {
        setMonth('');
        setYear('');
        setSearchTerm('');
        filterData(data);
    }

    return (
        <div className="wrapper">
            <LayoutAdmin />

            <div className="main-panel">
                <div className="content">
                    <div className="page-inner">
                        <div className="page-header">
                            <h4 className="page-title">Data Laporan Bahan Masuk</h4>
                            <ul className="breadcrumbs">
                                <li className="nav-home">
                                    <Link to="#">
                                        <i className="flaticon-home"></i>
                                    </Link>
                                </li>
                                <li className="separator">
                                    <i className="flaticon-right-arrow"></i>
                                </li>
                                <li className="nav-item">
                                    <Link to="#">Data Laporan</Link>
                                </li>
                                <li className="separator">
                                    <i className="flaticon-right-arrow"></i>
                                </li>
                                <li className="nav-item">
                                    <Link to="#">Bahan Masuk</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="d-flex align-items-center">
                                            <h4 className="card-title">Data Laporan Bahan Masuk</h4>
                                            <button className="btn btn-primary btn-round ml-auto" onClick={handlePrint}>
                                                <i className="fa fa-print"></i>
                                                Cetak Data
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-inline mb-3">
                                            <label className="mr-2">Pilih Bulan: </label>
                                            <select className="form-control mr-2" value={month} onChange={e => setMonth(e.target.value)}>
                                                <option value="">Semua Bulan</option>
                                                {moment.months().map((monthName, index) => (
                                                    <option key={index} value={moment().month(index).format('MM')}>
                                                        {monthName}
                                                    </option>
                                                ))}
                                            </select>
                                            <label className="mr-2">Pilih Tahun: </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={year}
                                                onChange={e => setYear(e.target.value)}
                                                min="2000"
                                                max={moment().year()}
                                            />
                                            <button className="btn btn-secondary ml-3" onClick={handleFilter}>
                                                Filter
                                            </button>
                                            <button className="btn btn-secondary ml-3" onClick={handleResetFilter}>
                                                Reset Filter
                                            </button>
                                        </div>
                                        <div className="form-inline mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search"
                                                value={searchTerm}
                                                onChange={e => setSearchTerm(e.target.value)}
                                            />
                                            <button className="btn btn-secondary ml-3" onClick={handleFilter}>
                                                Search
                                            </button>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-striped table-hover">
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
                                                    {filteredData.map((row, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
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
                </div>
            </div>
        </div>
    )
}

export default LaporanBarangMasuk;
