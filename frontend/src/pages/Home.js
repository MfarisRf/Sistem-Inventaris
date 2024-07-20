import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LayoutAdmin from '../layout/LayoutAdmin';
import LayoutGudang from '../layout/LayoutGudang';
import LayoutOwner from '../layout/LayoutOwner';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function Home() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [nama_user, setNama] = useState('');
    const [role, setRole] = useState('');
    const [totalSuppliers, setTotalSuppliers] = useState(null);
    const [totalCustomers, setTotalCustomers] = useState(null);
    const [totalKatalog, setTotalKatalog] = useState(null);
    const [totalBarang, setTotalBarang] = useState(null);
    const [chartDataBarangMasuk, setChartDataBarangMasuk] = useState(null);
    const [chartDataBarangKeluar, setChartDataBarangKeluar] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081')
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setNama(res.data.nama_user);
                    setRole(res.data.role);
                } else {
                    setAuth(false);
                    setMessage(res.data.Error);
                }
            })
            .catch(err => console.log(err));

        const fetchData = async () => {
            try {
                const suppliersResponse = await axios.get('http://localhost:8081/suppliers/totalsupplier');
                const customersResponse = await axios.get('http://localhost:8081/customers/totalcustomer');
                const katalogResponse = await axios.get('http://localhost:8081/totalKatalog');
                const barangResponse = await axios.get('http://localhost:8081/totalBarang');

                console.log('Suppliers response:', suppliersResponse.data);
                console.log('Customers response:', customersResponse.data);
                console.log('Katalog response:', katalogResponse.data);
                console.log('Barang response:', barangResponse.data);

                const suppliersData = suppliersResponse.data;
                const customersData = customersResponse.data;
                const katalogData = katalogResponse.data;
                const barangData = barangResponse.data;

                if (suppliersData && Array.isArray(suppliersData) && suppliersData.length > 0) {
                    setTotalSuppliers(suppliersData[0].totalSuppliers);
                } else {
                    console.error('Suppliers data format is incorrect:', suppliersData);
                }

                if (customersData && customersData.totalCustomers !== undefined) {
                    setTotalCustomers(customersData.totalCustomers);
                } else {
                    console.error('Customers data format is incorrect:', customersData);
                }

                if (Array.isArray(katalogData) && katalogData.length > 0) {
                    setTotalKatalog(katalogData[0].totalKatalog);
                } else if (katalogData.totalKatalog !== undefined) {
                    setTotalKatalog(katalogData.totalKatalog);
                } else {
                    console.error('Katalog data format is incorrect:', katalogData);
                }

                if (Array.isArray(barangData) && barangData.length > 0) {
                    setTotalBarang(barangData[0].totalBarang);
                } else if (barangData.totalBarang !== undefined) {
                    setTotalBarang(barangData.totalBarang);
                } else {
                    console.error('Barang data format is incorrect:', barangData);
                }

                // Fetch data barang masuk per bulan
                const totalBarangMasukResponse = await axios.get('http://localhost:8081/totalbarangmasukperbulan');
                const barangMasukData = totalBarangMasukResponse.data;

                const months = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ];

                const labelsBarangMasuk = barangMasukData.map(item => `${months[item.bulan - 1]} ${item.tahun}`);
                const totalBarangMasuk = barangMasukData.map(item => item.total_barang_masuk);

                setChartDataBarangMasuk({
                    labels: labelsBarangMasuk,
                    datasets: [
                        {
                            label: 'Total Barang Masuk (Kg)',
                            data: totalBarangMasuk,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }
                    ]
                });

                // Fetch data barang keluar per bulan
                const totalBarangKeluarResponse = await axios.get('http://localhost:8081/totalbarangkeluarperbulan');
                const barangKeluarData = totalBarangKeluarResponse.data;

                const labelsBarangKeluar = barangKeluarData.map(item => `${months[item.bulan - 1]} ${item.tahun}`);
                const totalBarangKeluar = barangKeluarData.map(item => item.total_barang_keluar);

                setChartDataBarangKeluar({
                    labels: labelsBarangKeluar,
                    datasets: [
                        {
                            label: 'Total Barang Keluar (Kg)',
                            data: totalBarangKeluar,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }
                    ]
                });

            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="wrapper">
            {role === "admin" && <LayoutAdmin />}
            {role === "gudang" && <LayoutGudang />}
            {role === "owner" && <LayoutOwner />}

            <div className="main-panel">
                <div className="content">
                    <div className="page-inner">
                        <div className="page-header">
                            <h4 className="page-title">Dashboard</h4>
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
                                    <Link to="#">Dashboard</Link>
                                </li>
                                <li className="separator">
                                    <i className="flaticon-right-arrow"></i>
                                </li>
                                <li className="nav-item">
                                    <Link to="#">Dashboard</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                
                                    <div className="card">
                                        <div className="card-body">
                                            <center>
                                                <h2 className="text-3xl font-bold mb-4">SISTEM INVENTORY CV Satori Rattan</h2>
                                                <h3 className="text-xl font-semibold mb-8">SELAMAT DATANG {nama_user}</h3>
                                                <div className="summary-container">
                                                <Link to="/supplierowner"> 
                                                    {totalSuppliers !== null ? (
                                                        <div className="summary-box">
                                                            <h4 className="summary-title">Total Suppliers:</h4>
                                                            <h2 className="summary-value">{totalSuppliers}</h2>
                                                        </div>
                                                    ) : (
                                                        <p>Loading suppliers...</p>
                                                    )}
                                                    </Link>

                                                    <Link to="/customerowner"> 
                                                    {totalCustomers !== null ? (
                                                        <div className="summary-box">
                                                            <h4 className="summary-title">Total Customers:</h4>
                                                            <h2 className="summary-value">{totalCustomers}</h2>
                                                        </div>
                                                    ) : (
                                                        <p>Loading customers...</p>
                                                    )}
                                                    </Link>

                                                    <Link to="/katalogowner"> 
                                                    {totalKatalog !== null ? (
                                                        <div className="summary-box">
                                                            <h4 className="summary-title">Total Katalog:</h4>
                                                            <h2 className="summary-value">{totalKatalog}</h2>
                                                        </div>
                                                    ) : (
                                                        <p>Loading katalog...</p>
                                                    )}
                                                    </Link>

                                                    <Link to="/barangowner"> 
                                                    {totalBarang !== null ? (
                                                        <div className="summary-box">
                                                            <h4 className="summary-title">Total Barang:</h4>
                                                            <h2 className="summary-value">{totalBarang}</h2>
                                                        </div>
                                                    ) : (
                                                        <p>Loading barang...</p>
                                                    )}
                                                    </Link>
                                                </div>
                                            </center>
                                        </div>
                                    </div>
                                
                            </div>
                            
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Total Barang Masuk dan Keluar per Bulan</h5>
                                        <div>
                                            {chartDataBarangMasuk ? (
                                                <Bar 
                                                    data={chartDataBarangMasuk}
                                                    options={{
                                                        responsive: true,
                                                        maintainAspectRatio: false,
                                                        scales: {
                                                            x: {
                                                                type: 'category',
                                                                title: {
                                                                    display: true,
                                                                    text: 'Month'
                                                                }
                                                            },
                                                            y: {
                                                                type: 'linear',
                                                                title: {
                                                                    display: true,
                                                                    text: 'Total Barang Masuk'
                                                                },
                                                                min: 0
                                                            }
                                                        }
                                                    }}
                                                    height={400}
                                                />
                                            ) : (
                                                <p>Loading chart data...</p>
                                            )}
                                        </div>
                                        <div>
                                            {chartDataBarangKeluar ? (
                                                <Bar 
                                                    data={chartDataBarangKeluar}
                                                    options={{
                                                        responsive: true,
                                                        maintainAspectRatio: false,
                                                        scales: {
                                                            x: {
                                                                type: 'category',
                                                                title: {
                                                                    display: true,
                                                                    text: 'Month'
                                                                }
                                                            },
                                                            y: {
                                                                type: 'linear',
                                                                title: {
                                                                    display: true,
                                                                    text: 'Total Barang Keluar'
                                                                },
                                                                min: 0
                                                            }
                                                        }
                                                    }}
                                                    height={400}
                                                />
                                            ) : (
                                                <p>Loading chart data...</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .summary-container {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                    margin-top: 20px;
                }

                .summary-box {
                    background-color: #f3f3f3;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }

                .summary-title {
                    font-size: 1.2rem;
                    margin-bottom: 10px;
                }

                .summary-value {
                    font-size: 2rem;
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
}

export default Home;
