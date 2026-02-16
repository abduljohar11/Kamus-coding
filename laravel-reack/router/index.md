# Panduan Belajar Routing Laravel 12

Router adalah mekanisme yang memetakan setiap URL ke logika tertentu di dalam aplikasi. Dalam stack Inertia + React, Router tidak hanya mengelola alamat halaman, tetapi juga menjadi jembatan utama untuk navigasi antar-komponen frontend.

---

## 1. Fondasi Routing (Pemula)

- Konsep Dasar Routing: Memahami peran file routes/web.php sebagai pusat kontrol navigasi.
- Sintaks Dasar: Cara menulis rute sederhana menggunakan Route::get, post, put, patch, dan delete.
- Route View: Menggunakan Route::view() untuk halaman statis tanpa perlu Controller.
- Naming Routes: Memberikan nama pada rute (Contoh: ->name('home')) agar mudah dipanggil di Laravel maupun React.

## 2. Parameter & Kontrol Rute

- Required Parameters: Menangkap data dari URL (Contoh: /produk/{id}).
- Optional Parameters: Menambahkan tanda tanya pada parameter URL (Contoh: /user/{name?}).
- Regular Expression Constraints: Membatasi format parameter (Misal: ID harus angka) menggunakan ->where().
- Route Redirects: Cara mengalihkan satu URL ke URL lainnya secara otomatis.

## 3. Organisasi Rute (Intermediate)

- Route Groups: Mengelompokkan rute untuk efisiensi penulisan.
- Path Prefixes: Menambahkan awalan pada grup URL (Contoh: /admin/dashboard, /admin/users).
- Name Prefixes: Menambahkan awalan pada nama rute (Contoh: admin.dashboard).
- Middleware Integration: Menerapkan filter keamanan langsung pada grup rute.
- Controller Groups: Menentukan satu Controller untuk banyak rute sekaligus agar kode lebih bersih.

## 4. Routing Khusus Inertia.js (Wajib Proyekmu)

- Inertia Navigation: Cara kerja navigasi antar-halaman di React tanpa melakukan reload browser.
- Ziggy Vue: Menggunakan library Ziggy agar kamu bisa memanggil rute Laravel langsung di dalam komponen React menggunakan fungsi route().
- Manual Visits: Memahami cara melakukan navigasi manual via skrip di frontend React.
- Handling 404 & Errors: Mengatur halaman error agar tetap tampil konsisten dalam desain Inertia.

## 5. Resource & Advanced Routing

- Route Resources: Mendaftarkan semua rute CRUD (Create, Read, Update, Delete) hanya dengan satu baris kode.
- Nested Resources: Mengelola rute untuk data yang bertingkat (Contoh: /guru/{id}/jadwal).
- Scoped Bindings: Memastikan data anak memang milik data induk tertentu saat diakses melalui URL.
- Fallback Routes: Menangani URL yang tidak terdaftar agar tidak muncul error default server.

## 6. Pro Level: Arsitektur & Performa

- Route Caching: Mempercepat pemrosesan rute di server production menggunakan perintah php artisan route:cache.
- Rate Limiting: Membatasi akses rute tertentu untuk mencegah serangan atau penyalahgunaan API.
- Domain Routing: Mengatur rute khusus jika aplikasi kamu menggunakan sub-domain berbeda.
- Route Discovery: Mempelajari bagaimana Laravel 12 memuat rute secara otomatis melalui file bootstrap/app.php.

## 7. Testing & Debugging

- List Routes: Menggunakan php artisan route:list untuk melihat semua daftar rute yang aktif.
- Route Testing: Melakukan pengujian otomatis untuk memastikan setiap URL mengarah ke halaman yang benar.

---

[ Kembali ke Beranda ](../index.md)
