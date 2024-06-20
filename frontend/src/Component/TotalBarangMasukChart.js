// components/TotalBarangMasukChart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const TotalBarangMasukChart = () => {
    const [dataBarangMasuk, setDataBarangMasuk] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/totalbarangmasukperbulan');
                setDataBarangMasuk(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Proses data untuk dimasukkan ke dalam chart
    const labels = dataBarangMasuk.map(item => {
        return `${item.bulan}/${item.tahun}`;
    });

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Total Barang Masuk',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: dataBarangMasuk.map(item => item.total_barang_masuk)
            }
        ]
    };

    return (
        <div className="total-barang-masuk-chart bg-gray-100 p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-2">Total Barang Masuk per Bulan</h4>
            <Bar
                data={data}
                options={{
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true
                                }
                            }
                        ]
                    }
                }}
            />
        </div>
    );
};

export default TotalBarangMasukChart;
