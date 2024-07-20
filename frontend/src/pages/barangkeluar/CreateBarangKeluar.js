import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LayoutGudang from '../../layout/LayoutGudang'
import axios from 'axios'
import Swal from 'sweetalert2'
import moment from 'moment'
import Select from 'react-select'

function CreateBarangKeluar() {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        id_customer: '',
        id_barang: '',
        tgl_keluar: moment().format('YYYY-MM-DD'),
        stok_keluar: '',
    });

    const [barangList, setBarang] = useState([]);
    const [customerList, setCustomer] = useState([]);
    const [sisaStok, setSisaStok] = useState('');

    const fetchBarang = async () => {
        const response = await axios.get('http://localhost:8081/getbarang');
        setBarang(response.data.map(barang => ({
            label: barang.nama_barang,
            value: barang.id
        })))
    }

    const fetchCustomer = async () => {
        const response = await axios.get('http://localhost:8081/getcustomer');
        setCustomer(response.data.map(customer => ({
            label: customer.nama_customer,
            value: customer.id
        })))
    }

    useEffect(() => {
        fetchBarang();
        fetchCustomer();
    }, []);

    const fetchSisaStok = async (barangId) => {
        try {
            const response = await axios.get(`http://localhost:8081/getbarang/${barangId}`);
            setSisaStok(response.data.stok);
        } catch (error) {
            console.error('Error fetching sisa stok:', error);
        }
    };

    useEffect(() => {
        if (values.id_barang) {
            fetchSisaStok(values.id_barang);
        }
    }, [values.id_barang]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/tambahbarangkeluar', values)
            .then(res => {
                if (res.data.Status === "Success") {
                    Swal.fire({
                        icon: "success",
                        title: "SUCCESS",
                        text: "Data Berhasil Disimpan"
                    })
                    navigate('/barangkeluar');
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "ERROR",
                        text: res.data.Error
                    })
                }
            })
            .catch(err => console.log(err));
    }

    const handleBarangChange = selectedOption => {
        setValues({ ...values, id_barang: selectedOption.value });
    };

    const handleCustomerChange = selectedOption => {
        setValues({ ...values, id_customer: selectedOption.value });
    };

    return (
        <div className="wrapper">
            <LayoutGudang />
            <div className="main-panel">
                <div className="content">
                    <div className="page-inner">
                        <div className="page-header">
                            <h4 className="page-title">Create Data Barang Keluar</h4>
                            <ul className="breadcrumbs">
                                <li className="nav-home">
                                    <Link href="#">
                                        <i className="flaticon-home"></i>
                                    </Link>
                                </li>
                                <li className="separator">
                                    <i className="flaticon-right-arrow"></i>
                                </li>
                                <li className="nav-item">
                                    <Link href="#">Create Data</Link>
                                </li>
                                <li className="separator">
                                    <i className="flaticon-right-arrow"></i>
                                </li>
                                <li className="nav-item">
                                    <Link href="#">Barang Keluar</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="d-flex align-items-center">
                                            <h4 className="card-title">Create Data Barang Keluar</h4>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="card-body">
                                            <div className='form-group'>
                                                <label>Nama Customer</label>
                                                <Select
                                                    value={customerList.find(customer => customer.value === values.id_customer)}
                                                    onChange={handleCustomerChange}
                                                    options={customerList}
                                                    placeholder="Pilih Customer..."
                                                />
                                            </div>
                                            <div className='form-group'>
                                                <label>Nama Barang</label>
                                                <Select
                                                    value={barangList.find(barang => barang.value === values.id_barang)}
                                                    onChange={handleBarangChange}
                                                    options={barangList}
                                                    placeholder="Pilih Barang..."
                                                />
                                                <medium className="form-text text-muted">Sisa Stok: {sisaStok + ' Kg'}</medium>
                                            </div>
                                            <div className='form-group'>
                                                <label>Tgl Keluar</label>
                                                <input type='date' className='form-control' name='tgl_keluar'
                                                    value={values.tgl_keluar}
                                                    onChange={e => setValues({ ...values, tgl_keluar: e.target.value })} required />
                                            </div>
                                            <div className="form-group">
                                                <label>Stok Keluar</label>
                                                <div className="input-group mb-3">
                                                    <input type="number" step={0.01} className="form-control" placeholder="Stok Keluar ..." name='stok_keluar'
                                                        onChange={e => setValues({ ...values, stok_keluar: e.target.value })} required />
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" id="basic-addon1">Kg</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='card-footer'>
                                            <button type='submit' className='btn btn-primary'><i className='fa fa-save'></i> Save Changes</button> &nbsp;
                                            <Link to="/barangkeluar" className='btn btn-danger'><i className='fa fa-undo'></i> Kembali</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateBarangKeluar
