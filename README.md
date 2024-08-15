# Sistem Inventaris

Sistem Inventaris adalah aplikasi berbasis web yang dirancang untuk mengelola dan melacak barang masuk dan keluar dalam sebuah inventaris. Sistem ini memudahkan pengguna dalam memantau stok barang, mencatat transaksi barang masuk dan keluar, serta mengelola data pelanggan, pemasok, dan produk.

## Fitur

- **Manajemen Barang Masuk**: Mencatat dan melacak barang-barang yang masuk ke dalam inventaris.
- **Manajemen Barang Keluar**: Mencatat dan melacak barang-barang yang keluar dari inventaris.
- **Manajemen Produk**: Menambah, mengubah, dan menghapus data produk.
- **Manajemen Pelanggan**: Mengelola data pelanggan yang bertransaksi.
- **Manajemen Pemasok**: Mengelola data pemasok yang menyediakan barang.
- **Sistem Autentikasi**: Fitur login dan logout dengan verifikasi JWT.
- **Lupa Kata Sandi**: Mengirim tautan reset kata sandi melalui email.
- **Laporan dan Cetak**: Menyediakan laporan barang masuk dan keluar yang dapat dicetak.

## User
- **Owner**: Memiliki peran untuk memonitoring dan melihat semua data yang ada di perusahaan.
- **Admin**: Memiliki hak penuh untuk melakukan perubahan dan manajement data pada sistem.
- **Admin Gudang**: Memiliki peran untuk melakukan pencatatan barang masuk dan barang keluar.
## Teknologi yang Digunakan

- **Frontend**: React.js, Axios, SweetAlert2, DataTables, Tailwind CSS
- **Backend**: Node.js, Express.js, JWT (JSON Web Token)
- **Database**: MySQL
- **Autentikasi**: JWT, Middleware verifikasi pengguna
- **Pengiriman Email**: Mailgun

## Instalasi

1. Clone repositori ini ke dalam komputer Anda:
    ```bash
    git clone https://github.com/MfarisRf/sistem-inventaris.git
    ```

2. Masuk ke direktori proyek:
    ```bash
    cd sistem-inventaris
    ```

3. Install dependensi untuk backend:
    ```bash
    cd backend
    npm install
    ```

4. Install dependensi untuk frontend:
    ```bash
    cd ../frontend
    npm install
    ```

5. Buat file `.env` di root direktori backend dan tambahkan variabel lingkungan sesuai konfigurasi:
    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=db_inventory
    JWT_SECRET=yourjwtsecret
    MAILGUN_API_KEY=yourmailgunapikey
    MAILGUN_DOMAIN=yourmailgundomain
    ```

6. Migrasikan database dan jalankan server:
    ```bash
    npx sequelize-cli db:migrate
    npm start
    ```

7. Jalankan frontend:
    ```bash
    cd ../frontend
    npm start
    ```

## Penggunaan

1. Buka browser dan akses aplikasi melalui `http://localhost:3000/login`.
2. Login menggunakan akun yang telah terdaftar.
3. Akses fitur-fitur yang tersedia seperti manajemen barang masuk, barang keluar, produk, pelanggan, dan pemasok.
4. Gunakan fitur laporan untuk melihat dan mencetak data inventaris.

## Kontribusi

Jika Anda ingin berkontribusi, silakan fork repositori ini dan buat pull request. Pastikan untuk menulis deskripsi yang jelas tentang perubahan yang Anda buat.

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).
