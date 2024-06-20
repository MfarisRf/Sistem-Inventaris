import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LayoutAdmin from '../../layout/LayoutAdmin';
import axios from 'axios';
import Swal from 'sweetalert2';

function CreateCatalog() {
    const [values, setValues] = useState({
        nama_produk: '',
        deskripsi: ''
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedImage) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Silakan pilih gambar terlebih dahulu."
            });
            return;
        }

        try {
            const formData = new FormData();
            formData.append('image', selectedImage); // Pastikan key sesuai dengan yang diharapkan oleh backend
            formData.append('nama_produk', values.nama_produk);
            formData.append('deskripsi', values.deskripsi);

            // Tambahkan katalog dengan mengirimkan data dalam bentuk FormData
            const res = await axios.post('http://localhost:8081/tambahkatalog', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Tipe konten harus ditentukan sebagai multipart/form-data
                }
            });

            Swal.fire({
                icon: "success",
                title: "SUCCESS",
                text: "Data Berhasil Disimpan"
            }).then(() => {
                navigate('/katalog'); // Arahkan kembali ke halaman katalog setelah menyimpan
            });
        } catch (error) {
            console.error(error); // Tampilkan error di console
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Terjadi kesalahan saat menyimpan data. Periksa kembali koneksi dan coba lagi."
            });
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
        } else {
            setSelectedImage(null);
        }
    };

    return (
        <div className="wrapper">
            <LayoutAdmin />

            <div className="main-panel">
                <div className="content">
                    <div className="page-inner">
                        <div className="page-header">
                            <h4 className="page-title">Create Data Katalog</h4>
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
                                    <Link to="#">Katalog</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="d-flex align-items-center">
                                            <h4 className="card-title">Create Data Katalog</h4>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="card-body">
                                            <div className='form-group'>
                                                <label>Nama Produk</label>
                                                <input type='text' className='form-control' name='nama_produk' placeholder='Nama Produk ...'
                                                    value={values.nama_produk} onChange={e => setValues({ ...values, nama_produk: e.target.value })} required />
                                            </div>
                                            <div className="form-group">
                                                <label>Image</label>
                                                <input type="file" className="form-control-file" name='image'
                                                    onChange={handleImageChange} accept="image/*" required />
                                            </div>
                                            <div className='form-group'>
                                                <label>Deskripsi</label>
                                                <textarea className='form-control' rows='5' name='deskripsi' placeholder='Deskripsi ...'
                                                    value={values.deskripsi} onChange={e => setValues({ ...values, deskripsi: e.target.value })} required ></textarea>
                                            </div>
                                        </div>
                                        <div className='card-footer'>
                                            <button type='submit' className='btn btn-primary'><i className='fa fa-save'></i> Save Changes</button> &nbsp;
                                            <Link to="/katalog" className='btn btn-danger'><i className='fa fa-undo'></i> Kembali</Link>
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

export default CreateCatalog;
