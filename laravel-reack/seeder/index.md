# Panduan Belajar Database Seeder & Factory Laravel 12

Seeder dan Factory adalah alat untuk mengisi database dengan data contoh (dummy data) secara otomatis. Dalam stack Inertia + React, fitur ini sangat membantu untuk menguji tampilan komponen UI (seperti tabel atau grafik) dengan data yang bervariasi.

---

## 1. Fondasi Seeding (Pemula)

- Konsep Database Seeding: Memahami kegunaan Seeder untuk pengisian data awal aplikasi.
- DatabaseSeeder.php: Mengenal file utama sebagai gerbang eksekusi seluruh seeder.
- Membuat Seeder: Menggunakan perintah php artisan make:seeder NamaSeeder.
- Menjalankan Seeder:
  - php artisan db:seed: Menjalankan seeder utama.
  - php artisan db:seed --class=NamaSeeder: Menjalankan file seeder spesifik.
  - php artisan migrate:fresh --seed: Reset database sekaligus isi data.

## 2. Definisi Data dengan Factory (Intermediate)

- Pengenalan Model Factory: Cara membuat cetakan data otomatis untuk model tertentu.
- Integrasi Faker Library: Menggunakan library Faker untuk menghasilkan nama, alamat, email, dan teks secara acak.
- Definisi Blueprint: Mengatur kolom mana saja yang akan diisi data otomatis di dalam file Factory.
- Artisan Command: php artisan make:factory NamaFactory --model=NamaModel.

## 3. Teknik Produksi Data Massal

- Single Record: Membuat satu baris data contoh.
- Multiple Records: Menggunakan count(10)->create() untuk membuat banyak data sekaligus.
- Sequence: Mengatur urutan data tertentu (misal: selang-seling antara status 'active' dan 'inactive').
- Factory States: Membuat variasi data khusus (misal: User::factory()->admin()->create()).

## 4. Seeding dengan Relasi (Advanced)

- Has Many Relationship: Membuat User sekaligus otomatis membuat 5 postingan miliknya.
- Belongs To Relationship: Membuat data anak yang otomatis terhubung ke data induk yang sudah ada.
- Many to Many (Pivot): Mengisi tabel perantara secara otomatis (misal: Siswa memiliki banyak Mata Pelajaran).
- Nested Seeding: Menjalankan seeder di dalam seeder lain menggunakan method call().

## 5. Integrasi Workflow Inertia & React (Pro Level)

- UI Mocking: Menggunakan Seeder untuk memastikan komponen React (seperti tabel atau pagination) tampil sempurna saat data penuh.
- Image Seeding: Mengisi kolom gambar dengan URL gambar placeholder untuk testing galeri atau foto profil di frontend.
- Shared Auth Data: Menggunakan seeder untuk membuat akun Admin tetap yang bisa digunakan tim pengembang untuk login ke dashboard Inertia.

## 6. Fitur Pro & Best Practices

- Conditional Seeding: Menjalankan seeder hanya di lingkungan local, bukan di production agar data dummy tidak masuk ke server asli.
- Silent Seeding: Menjalankan perintah seeding tanpa memunculkan output di terminal.
- Factory Triggers: Menggunakan afterCreating() atau afterMaking() untuk menjalankan logika tambahan setelah data berhasil dibuat.
- Idempotent Seeders: Teknik menulis seeder agar bisa dijalankan berkali-kali tanpa menyebabkan error data ganda (unique constraint).

---

[ Kembali ke Beranda ](../index.md)
