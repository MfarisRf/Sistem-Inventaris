import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import LayoutAdmin from '../../layout/LayoutAdmin';

function EditCatalog() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [values, setValues] = useState({
        nama_produk: '',
        image: '',
        deskripsi: ''
    });

    const [existingImage, setExistingImage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8081/editkatalog/${id}`)
            .then(res => {
                console.log(res);
                setValues({
                    ...values,
                    nama_produk: res.data[0].nama_produk,
                    deskripsi: res.data[0].deskripsi
                });
                setExistingImage(res.data[0].image);
            })
            .catch(err => console.log(err));
    }, []);

    const handleUpdate = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', selectedImage || existingImage); // Gunakan existingImage jika selectedImage kosong
        formData.append('nama_produk', values.nama_produk);
        formData.append('deskripsi', values.deskripsi);

        try {
            await axios.put(`http://localhost:8081/updateKatalog/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            Swal.fire({
                icon: "success",
                title: "SUCCESS",
                text: "Data Berhasil Diubah"
            });
            navigate('/katalog');
        } catch (error) {
            console.log(error);
        }
    };

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    return (
        <div className="wrapper">
            <LayoutAdmin />

            <div className="main-panel">
                <div className="content">
                    <div className="page-inner">
                        <div className="page-header">
                            <h4 className="page-title">Edit Data Produk</h4>
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
                                    <Link href="#">Edit Data</Link>
                                </li>
                                <li className="separator">
                                    <i className="flaticon-right-arrow"></i>
                                </li>
                                <li className="nav-item">
                                    <Link href="#">Barang</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="d-flex align-items-center">
                                            <h4 className="card-title">Edit Data Produk</h4>
                                        </div>
                                    </div>
                                    <form onSubmit={handleUpdate}>
                                        <div className="card-body">
                                            <div className='form-group'>
                                                <label>Nama Produk</label>
                                                <input type='text' className='form-control' name='nama_produk' placeholder='Nama Produk ...'
                                                    value={values.nama_produk} onChange={e => setValues({ ...values, nama_produk: e.target.value })} required />
                                            </div>
                                            <div className="form-group">
                                                <label>Gambar Saat Ini</label><br />
                                                {existingImage && (
                                                    <img src={`http://localhost:8081/uploads/${existingImage}`} alt="Existing" style={{ width: '100px', height: 'auto' }} />
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <label>Edit Foto</label>
                                                <input type="file" className="form-control-file" accept="image/*" onChange={handleImageChange} />
                                                {selectedImage && (
                                                    <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ width: '100px', height: 'auto', marginTop: '10px' }} />
                                                )}
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
    );
}

export default EditCatalog;
