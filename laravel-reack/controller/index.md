# Panduan Belajar Controller Laravel 12

Controller berfungsi untuk mengelompokkan logika penanganan permintaan (request) ke dalam satu kelas. Dalam stack Inertia + React, Controller bertugas mengambil data dari Model dan mengembalikannya sebagai respons Inertia agar bisa dirender oleh React.

---

## 1. Dasar-Dasar Controller (Pemula)

- Konsep Controller: Memahami peran Controller dalam pola desain MVC.
- Membuat Controller: Menggunakan perintah php artisan make:controller NamaController.
- Basic Routing: Menghubungkan URL ke method di dalam Controller.
- Return Response: Cara mengembalikan data sederhana atau view (sebelum menggunakan Inertia).

## 2. Resource & API Controllers

- Resource Controllers: Membuat Controller dengan 7 method standar (index, create, store, show, edit, update, destroy) secara otomatis.
- Api Resource: Membuat Controller khusus untuk API tanpa method create dan edit.
- Single Action Controller: Menggunakan method \_\_invoke() untuk Controller yang hanya memiliki satu tugas.

## 3. Integrasi dengan Inertia.js (Wajib Proyekmu)

- Inertia Render: Mengirim data ke komponen React menggunakan Inertia::render('NamaKomponen', $data).
- Passing Props: Cara mengirim data koleksi (list) atau objek tunggal dari Laravel ke props React.
- Redirecting: Mengalihkan user kembali atau ke rute lain setelah aksi tertentu (seperti to_route()).
- Flash Messages: Mengirim pesan sukses/error yang akan ditangkap oleh middleware dan ditampilkan di React.

## 4. Handling Request & Validation

- Dependency Injection: Mengambil data request menggunakan class Request.
- Input Validation: Melakukan validasi data di dalam Controller menggunakan $request->validate().
- Form Request Validation: Memisahkan logika validasi ke file terpisah agar Controller tetap bersih (Pro Practice).
- File Uploads: Menangani unggahan file (seperti foto profil user atau bukti transaksi PPOB).

## 5. Logika Bisnis & Database Interaction

- Model Binding: Mengambil data Model secara otomatis hanya dengan memasukkan parameter ID di method.
- Eager Loading di Controller: Menggunakan with() untuk mencegah masalah N+1 Query saat mengirim data ke React.
- Query Filtering: Mengelola pencarian dan filter data langsung dari parameter URL ($request->query()).

## 6. Pro Level: Clean Code & Architecture

- Service Pattern: Memindahkan logika bisnis yang rumit dari Controller ke class Service agar bisa digunakan kembali.
- Inertia Lazy Props: Mengirim data berat secara terpisah agar loading halaman utama React tetap cepat.
- Authorization: Mengecek izin akses user di dalam Controller menggunakan Gate atau Policy.
- Error Handling: Mengelola try-catch dan mengembalikan respons yang tepat jika terjadi kegagalan sistem.

## 7. Fitur Canggih & Optimasi

- Partial Reloads: Mengoptimalkan Inertia agar hanya mengirim data yang berubah saja ke frontend.
- Controller Caching: Teknik meminimalkan proses berat yang dilakukan berulang kali.
- Testing Controllers: Melakukan pengujian fungsional untuk memastikan Controller mengembalikan respons yang benar.

---

[ Kembali ke Beranda ](../index.md)
