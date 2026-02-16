# Panduan Belajar Migration Laravel

Daftar ini berisi kompetensi utama yang harus dikuasai untuk mengelola database pada aplikasi Laravel yang menggunakan stack Inertia.js dan React.

---

## 1. Konsep Dasar & Siklus Hidup

- [Pengenalan](./pengenalan.md) Migration Memahami peran migration sebagai _version control_ untuk skema database.
- Struktur File: Mempelajari fungsi method up() (untuk menjalankan perubahan) dan down() (untuk membatalkan perubahan).
- Perintah Artisan Utama:
  - php artisan make:migration: Membuat file skema baru.
  - php artisan migrate: Menjalankan migrasi yang belum terdaftar.
  - php artisan migrate:rollback: Membatalkan langkah migrasi terakhir.
  - php artisan migrate:fresh: Menghapus semua tabel dan menjalankan ulang dari awal.

## 2. Skema Tabel & Tipe Kolom (Schema Builder)

- Pemilihan Tipe Data: Penggunaan string(), text(), integer(), bigInteger(), dan decimal().
- Data Kompleks: Mempelajari boolean(), enum(), serta json() (sangat penting untuk menyimpan konfigurasi fleksibel yang akan dikonsumsi oleh React).
- Kolom Standar: Fungsi timestamps(), softDeletes(), dan rememberToken().

## 3. Modifikasi Atribut Kolom (Column Modifiers)

- Nilai Default: Mengatur nilai awal kolom dengan default().
- Nullable: Mengizinkan kolom tidak diisi dengan nullable().
- Posisi Kolom: Mengatur urutan letak kolom menggunakan after('nama_kolom').

## 4. Relasi Database (Foreign Keys)

- Sintaks Modern: Penggunaan foreignId() untuk efisiensi penulisan.
- Integritas Data: Menguasai constrained(), onDelete('cascade'), dan onUpdate('cascade').
- Relasi Antar Tabel: Cara menghubungkan tabel transaksi dengan user atau produk.

## 5. Indeks & Performa

- Unique Constraint: Memastikan data tidak ganda dengan unique().
- Optimasi Query: Penggunaan index() dan primary() untuk mempercepat pencarian data.

## 6. Modifikasi Tabel yang Sudah Ada

- Alter Table: Cara menambah kolom baru pada tabel yang sudah berisi data.
- Mengubah Kolom: Teknik merubah tipe data atau mengganti nama kolom.
- Penghapusan: Cara menghapus kolom secara aman melalui file migration baru.

## 7. Integrasi dengan Workflow Inertia/React

- Sinkronisasi Model: Memastikan kolom database terdaftar di $fillable pada Model Laravel.
- Data Preparation: Mempersiapkan struktur data agar mudah diolah oleh Inertia Resource sebelum dikirim ke frontend React.

## 8. Best Practices (Praktik Terbaik)

- Konvensi Penamaan: Standar penamaan tabel (plural) dan file migration.
- Strategi Deployment: Cara menjalankan migration yang aman pada server production.

---

## 9. Monitoring & Maintenance (Tambahan Penting)

- Status Migrasi: Menggunakan php artisan migrate:status untuk melihat daftar file mana yang sudah atau belum dijalankan di database.
- Refresh vs Fresh:
  - migrate:refresh: Membatalkan (rollback) lalu menjalankan ulang migrasi (lebih aman untuk tes fungsi down()).
  - migrate:fresh: Menghapus semua tabel tanpa mempedulikan fungsi down() (cepat tapi berisiko kehilangan data).

## 10. Opsi Penghapusan Relasi (Advanced Foreign Keys)

- On Delete Cascade: Menghapus data anak jika data induk dihapus.
- On Delete Set Null: Mengatur kolom menjadi NULL jika data induk dihapus (berguna untuk riwayat transaksi agar data tetap ada).
- On Delete Restrict: Mencegah penghapusan induk jika masih ada data anak yang terhubung.

## 11. Skalabilitas Database

- Migration Squashing: Teknik menggabungkan banyak file migration menjadi satu file skema SQL untuk mempercepat proses migrasi pada proyek besar.
- Anonymizing Migrations: Menggunakan _anonymous class_ (fitur Laravel baru) agar tidak terjadi konflik nama class jika ada dua file migrasi dengan nama yang mirip.

---

### Tips Cepat (Cheat Sheet):

> Catatan: Jika kamu bekerja dengan React/Inertia, pastikan setelah melakukan php artisan migrate, kamu juga memeriksa file Model terkait untuk memastikan properti $fillable sudah sesuai dengan kolom baru di database.

[ Kembali ke Beranda ](../index.md)
