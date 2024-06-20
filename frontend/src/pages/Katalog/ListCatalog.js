import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LayoutAdmin from '../../layout/LayoutAdmin';
import axios from 'axios';
import Swal from 'sweetalert2';
import Modal from 'react-modal';

import 'jquery/dist/jquery.min.js';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import './Modal.css';  // Import CSS untuk modal

Modal.setAppElement('#root'); // Sesuaikan dengan id root aplikasi Anda

function ListCatalog() {
    const [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
        fetchData();
        $(document).ready(function () {
            setTimeout(function () {
                $('#example').DataTable();
            }, 1000);
        });
    }, []);

    const fetchData = async () => {
        await axios.get('http://localhost:8081/katalog')
            .then(res => {
                if (Array.isArray(res.data)) {
                    setData(res.data);
                } else {
                    console.error('Data fetched is not an array:', res.data);
                    setData([]);
                }
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                setData([]);
            });
    };

    const handleDelete = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            return result.isConfirmed;
        });

        if (!isConfirm) {
            return;
        }

        axios.delete('http://localhost:8081/deletekatalog/' + id)
            .then(res => {
                Swal.fire({
                    icon: "success",
                    title: "SUCCESS",
                    text: "Data Berhasil Dihapus"
                });
                fetchData();
            }).catch(err => console.log(err));
    };

    const openModal = (image, width, height) => {
        setSelectedImage(image);
        setImageWidth(width);
        setImageHeight(height);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedImage('');
        setImageWidth(0);
        setImageHeight(0);
        setIsZoomed(false); // Reset zoom state saat modal ditutup
    };

    const toggleZoom = () => {
        setIsZoomed(!isZoomed); // Toggle nilai isZoomed
    };

    return (
        <div className="wrapper">
            <LayoutAdmin />

            <div className="main-panel">
                <div className="content">
                    <div className="page-inner">
                        <div className="page-header">
                            <h4 className="page-title">Data Katalog</h4>
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
                                    <Link to="#">Data</Link>
                                </li>
                                <li className="separator">
                                    <i className="flaticon-right-arrow"></i>
                                </li>
                                <li className="nav-item">
                                    <Link to="#">Barang</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="d-flex align-items-center">
                                            <h4 className="card-title">Data Katalog</h4>
                                            <Link className="btn btn-primary btn-round ml-auto" to="/createKatalog">
                                                <i className="fa fa-plus"></i>
                                                Tambah Data
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table id='example' className="display table table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Nama Produk</th>
                                                        <th>Gambar</th>
                                                        <th>Deskripsi</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Array.isArray(data) && data.map((row, key) => (
                                                        <tr key={key}>
                                                            <td>{key + 1}</td>
                                                            <td>{row.nama_produk}</td>
                                                            <td>
                                                                <img
                                                                    src={`http://localhost:8081/uploads/${row.image}`}
                                                                    alt={row.nama_produk}
                                                                    style={{ width: '100px', height: '100px', cursor: 'pointer' }}
                                                                    onClick={() => openModal(`http://localhost:8081/uploads/${row.image}`, row.width, row.height)} // Tambahkan event onClick
                                                                />
                                                            </td>
                                                            <td>{row.deskripsi}</td>
                                                            <td>
                                                                <Link to={`/editKatalog/${row.id}`} className='btn btn-xs btn-primary'><i className='fa fa-edit'></i> Edit</Link> &nbsp;
                                                                <button onClick={() => handleDelete(row.id)} className='btn btn-xs btn-danger'><i className='fa fa-trash'></i> Hapus</button>
                                                            </td>
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
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="modal-content"
                overlayClassName="modal-overlay"
                style={{
                    content: {
                        width: isZoomed ? 'auto' : (imageWidth ? imageWidth + 'px' : 'auto'),
                        height: isZoomed ? 'auto' : (imageHeight ? imageHeight + 'px' : 'auto')
                    }
                }}
            >
                <button onClick={closeModal} className="close-button">&times;</button>
                <img
                    src={selectedImage}
                    alt="Preview"
                    style={{ width: '100%', height: 'auto' }}
                    onClick={toggleZoom} // Tambahkan event onClick untuk toggle zoom
                />
                {isZoomed && (
                    <button className="zoom-button" onClick={toggleZoom}>
                        Zoom Out
                    </button>
                )}
            </Modal>
        </div>
    );
}

export default ListCatalog;
