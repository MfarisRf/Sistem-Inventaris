import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';

import ListUser from './pages/user/ListUser'
import CreateUser from './pages/user/CreateUser'
import EditUser from './pages/user/EditUser'

import ListCustomer from './pages/customer/ListCustomer'
import CreateCustomer from './pages/customer/CreateCustomer'
import EditCustomer from './pages/customer/EditCustomer'

import ListSupplier from './pages/supplier/ListSupplier'
import CreateSupplier from './pages/supplier/CreateSupplier'
import EditSupplier from './pages/supplier/EditSupplier'

import ListBarang from './pages/barang/ListBarang'
import CreateBarang from './pages/barang/CreateBarang'
import EditBarang from './pages/barang/EditBarang'

import ListBarangMasuk from './pages/barangmasuk/ListBarangMasuk'
import CreateBarangMasuk from './pages/barangmasuk/CreateBarangMasuk'
import DetailBarangMasuk from './pages/barangmasuk/DetailBarangMasuk'
import CetakBarangMasuk from './pages/barangmasuk/CetakBarangMasuk'

import ListBarangKeluar from './pages/barangkeluar/ListBarangKeluar'
import CreateBarangKeluar from './pages/barangkeluar/CreateBarangKeluar'
import DetailBarangKeluar from './pages/barangkeluar/DetailBarangKeluar'
import CetakBarangKeluar from './pages/barangkeluar/CetakBarangKeluar'

import LaporanBarangMasuk from './pages/laporan/LaporanBarangMasuk'
import LaporanBarangKeluar from './pages/laporan/LaporanBarangKeluar'
import CetakAllBarangMasuk from './pages/laporan/CetakAllBarangMasuk'
import CetakAllBarangKeluar from './pages/laporan/CetakAllBarangKeluar'

import ListCatalog from './pages/Katalog/ListCatalog';
import CreateCatalog from './pages/Katalog/CreateCatalog';
import EditCatalog from './pages/Katalog/EditCatalog';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/home' element={<Home />}></Route>
            
            {/* Data User */}
            <Route path='/user' element={<ListUser />}></Route>
            <Route path='/createUser' element={<CreateUser />}></Route>
            <Route path='/editUser/:id' element={<EditUser />}></Route>

            {/* Data Customer */}
            <Route path='/customer' element={<ListCustomer />}></Route>
            <Route path='/createCustomer' element={<CreateCustomer />}></Route>
            <Route path='/editCustomer/:id' element={<EditCustomer />}></Route>

            {/* Data Supplier */}
            <Route path='/supplier' element={<ListSupplier />}></Route>
            <Route path='/createSupplier' element={<CreateSupplier />}></Route>
            <Route path='/editSupplier/:id' element={<EditSupplier />}></Route>

            {/* Data Catalog */}
            <Route path='/Katalog' element={<ListCatalog />}></Route>
            <Route path='/createKatalog' element={<CreateCatalog />}></Route>
            <Route path='/editSupplier/:id' element={<EditCatalog />}></Route>

            {/* Data Barang */}
            <Route path='/barang' element={<ListBarang />}></Route>
            <Route path='/createBarang' element={<CreateBarang />}></Route>
            <Route path='/editBarang/:id' element={<EditBarang />}></Route>

            {/* Data Barang Masuk */}
            <Route path='/barangmasuk' element={<ListBarangMasuk />}></Route>
            <Route path='/createBarangMasuk' element={<CreateBarangMasuk />}></Route>
            <Route path='/detailBarangMasuk/:id' element={<DetailBarangMasuk />}></Route>
            <Route path='/cetakBarangMasuk/:id' element={<CetakBarangMasuk />}></Route>

            {/* Data Barang Keluar */}
            <Route path='/barangkeluar' element={<ListBarangKeluar />}></Route>
            <Route path='/createBarangKeluar' element={<CreateBarangKeluar />}></Route>
            <Route path='/detailBarangKeluar/:id' element={<DetailBarangKeluar />}></Route>
            <Route path='/cetakBarangKeluar/:id' element={<CetakBarangKeluar />}></Route>

            {/* Data Laporan */}
            <Route path='/laporanbarangmasuk' element={<LaporanBarangMasuk />}></Route>
            <Route path='/laporanbarangkeluar' element={<LaporanBarangKeluar />}></Route>
            <Route path='/cetakallbarangmasuk' element={<CetakAllBarangMasuk />}></Route>
            <Route path='/cetakallbarangkeluar' element={<CetakAllBarangKeluar />}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
