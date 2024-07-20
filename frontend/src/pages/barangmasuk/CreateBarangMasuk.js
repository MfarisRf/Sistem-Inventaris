import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LayoutGudang from '../../layout/LayoutGudang';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import Select from 'react-select';

function CreateBarangMasuk() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        id_supplier: '',
        id_barang: '',
        tgl_masuk: moment().format('YYYY-MM-DD'),
        stok_masuk: '',
    });

    const [barangList, setBarangList] = useState([]);
    const [supplierList, setSupplierList] = useState([]);
    const [sisaStok, setSisaStok] = useState('');

    const fetchBarang = async () => {
        try {
            const response = await axios.get('http://localhost:8081/getbarang');
            setBarangList(response.data.map(barang => ({
                label: barang.nama_barang,
                value: barang.id
            })));
        } catch (error) {
            console.error('Error fetching barang:', error);
        }
    };

    const fetchSupplier = async () => {
        try {
            const response = await axios.get('http://localhost:8081/getsupplier');
            setSupplierList(response.data.map(supplier => ({
                label: supplier.nama_supplier,
                value: supplier.id
            })));
        } catch (error) {
            console.error('Error fetching supplier:', error);
        }
    };

    useEffect(() => {
        fetchBarang();
        fetchSupplier();
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
        axios.post('http://localhost:8081/tambahbarangmasuk', values)
            .then(res => {
                if (res.data.Status === "Success") {
                    Swal.fire({
                        icon: "success",
                        title: "SUCCESS",
                        text: "Data Berhasil Disimpan"
                    });
                    navigate('/barangmasuk');
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "ERROR",
                        text: res.data.Error
                    });
                }
            })
            .catch(err => console.error('Error submitting data:', err));
    };

    const handleBarangChange = selectedOption => {
        setValues({ ...values, id_barang: selectedOption.value });
    };

    const handleSupplierChange = selectedOption => {
        setValues({ ...values, id_supplier: selectedOption.value });
    };

    return (
        <div className="wrapper">
            <LayoutGudang />
            <div className="main-panel">
                <div className="content">
                    <div className="page-inner">
                        <div className="page-header">
                            <h4 className="page-title">Create Data Barang Masuk</h4>
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
                                    <Link to="#">Create Data</Link>
                                </li>
                                <li className="separator">
                                    <i className="flaticon-right-arrow"></i>
                                </li>
                                <li className="nav-item">
                                    <Link to="#">Barang Masuk</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="d-flex align-items-center">
                                            <h4 className="card-title">Create Data Barang Masuk</h4>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="card-body">
                                            <div className='form-group'>
                                                <label>Nama Supplier</label>
                                                <Select
                                                    value={supplierList.find(supplier => supplier.value === values.id_supplier)}
                                                    onChange={handleSupplierChange}
                                                    options={supplierList}
                                                    placeholder="Pilih Supplier..."
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
                                                <label>Tgl Masuk</label>
                                                <input type='date' className='form-control' name='tgl_masuk'
                                                    value={values.tgl_masuk}
                                                    onChange={e => setValues({ ...values, tgl_masuk: e.target.value })} required />
                                            </div>
                                            <div className="form-group">
                                                <label>Stok Masuk</label>
                                                <div className="input-group mb-3">
                                                    <input type="number" step={0.01} className="form-control" placeholder="Stok Masuk ..." name='stok_masuk'
                                                        onChange={e => setValues({ ...values, stok_masuk: e.target.value })} required />
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" id="basic-addon1">Pcs</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='card-footer'>
                                            <button type='submit' className='btn btn-primary'><i className='fa fa-save'></i> Save Changes</button> &nbsp;
                                            <Link to="/barangmasuk" className='btn btn-danger'><i className='fa fa-undo'></i> Kembali</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateBarangMasuk;
