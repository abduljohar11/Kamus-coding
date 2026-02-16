# Panduan Belajar Middleware Laravel 12

Middleware adalah mekanisme untuk menyaring permintaan HTTP yang masuk ke aplikasi. Dalam stack Inertia + React, middleware berperan sebagai filter keamanan dan jembatan data antara server (Laravel) dan frontend (React).

---

## 1. Konsep Dasar Middleware

- Definisi Middleware: Memahami peran middleware sebagai lapisan keamanan atau filter sebelum request mencapai Controller.
- Siklus Request & Response: Bagaimana request melewati middleware (handle) dan bagaimana response dikirimkan kembali ke user.
- Struktur Class: Mengenal anatomi file middleware, terutama penggunaan parameter $next untuk melanjutkan request.

## 2. Pendaftaran Middleware (Struktur Baru Laravel 12)

- Konfigurasi bootstrap/app.php: Mempelajari cara mendaftarkan middleware melalui method withMiddleware() (menggantikan file Kernel.php lama).
- Global Middleware: Menjalankan filter untuk setiap permintaan yang masuk ke aplikasi.
- Middleware Aliases: Memberikan nama unik (alias) pada middleware agar mudah dipanggil di dalam file Route.
- Middleware Groups: Mengelola kelompok middleware seperti grup web untuk Inertia atau grup api untuk layanan data.

## 3. Autentikasi & Otorisasi

- Auth Middleware: Membatasi akses rute hanya untuk pengguna yang telah terautentikasi (login).
- Guest Middleware (RedirectIfAuthenticated): Mengalihkan pengguna yang sudah login agar tidak bisa mengakses halaman login/register lagi.
- Role-Based Access Control (RBAC): Membuat middleware kustom untuk membedakan akses Admin, Guru, atau Reseller PPOB.

## 4. Middleware Khusus Inertia.js (Sangat Penting)

- HandleInertiaRequests: Jantung dari aplikasi Inertia yang berfungsi membagikan data (_Shared Data_) ke seluruh komponen React secara otomatis.
- Sharing Auth State: Mengirimkan data user yang sedang login agar bisa diakses langsung lewat props auth di React.
- Sharing Flash Messages: Mengatur pengiriman pesan sukses atau error agar bisa tampil sebagai notifikasi di frontend.
- Validation Redirection: Mengelola bagaimana middleware menangani error validasi agar pesan error muncul dengan tepat di komponen React.

## 5. Keamanan & Proteksi

- CSRF Protection: Memahami cara Laravel melindungi aplikasi dari serangan lintas situs menggunakan token.
- Rate Limiting: Membatasi jumlah request untuk mencegah _spamming_, misalnya pada tombol transaksi PPOB.
- CORS Management: Mengatur izin akses jika frontend React dan backend Laravel berada di domain yang berbeda.

## 6. Manipulasi Request & Response

- Sanitizing Input: Middleware otomatis untuk merapikan input data (seperti TrimStrings dan ConvertEmptyStringsToNull).
- Localization Middleware: Mengatur bahasa aplikasi (multi-bahasa) berdasarkan preferensi user.
- Header Security: Menambahkan header keamanan pada response HTTP untuk melindungi browser user.

## 7. Implementasi Proyek Nyata

- Maintenance Mode: Cara mengaktifkan halaman "Sedang Perbaikan" melalui middleware.
- Activity Logging: Mencatat setiap aksi penting user (seperti transaksi atau input nilai) ke dalam database secara otomatis.
- Subscription Check: Mengecek status langganan atau kecukupan saldo sebelum user melakukan aksi tertentu.

## 8. Testing Middleware

- Unit Testing: Menguji logika internal middleware tanpa harus menjalankan server penuh.
- Integration Testing: Memastikan middleware terpasang dan berfungsi dengan benar pada rute yang spesifik.

---

[ Kembali ke Beranda ](../index.md)
