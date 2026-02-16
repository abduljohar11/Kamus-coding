# Panduan Belajar Eloquent Model Laravel 12

Model adalah komponen MVC yang menangani logika data dan interaksi dengan database menggunakan Eloquent ORM. Dalam stack Inertia + React, Model berperan sebagai penyaji data mentah sebelum diformat untuk dikirim ke frontend.

---

## 1. Fondasi & Dasar-Dasar Model

- Konsep Eloquent ORM: Memahami pemetaan tabel database ke dalam class PHP.
- Konvensi Penamaan: Standar nama class (Singular) dan hubungannya dengan nama tabel (Plural).
- Pembuatan Model: Menggunakan perintah php artisan make:model NamaModel.
- Primary Keys & Timestamps: Mengatur kolom kunci utama dan menonaktifkan/mengaktifkan fitur pencatatan waktu otomatis.

## 2. Pengaturan Data (Properties & Security)

- Mass Assignment: Perbedaan mendalam antara $fillable (whitelist) dan $guarded (blacklist) untuk keamanan data.
- Database Connection: Menentukan koneksi database khusus jika aplikasi menggunakan lebih dari satu database.
- Table Aliases: Menentukan nama tabel secara manual jika tidak mengikuti konvensi Laravel.

## 3. CRUD & Query Builder Level Pemula

- Retrieving Data: Mengambil semua data (all), mencari berdasarkan ID (find), atau mengambil data pertama (first).
- Inserting & Updating: Menggunakan metode save(), create(), dan update().
- Deleting Data: Menggunakan delete() dan destroy().
- Soft Deletes: Mengimplementasikan fitur "Tempat Sampah" (data tidak benar-benar dihapus) dengan trait SoftDeletes.

## 4. Relationship (Relasi Antar Tabel) - Materi Inti

- One to One: Relasi sederhana (contoh: User memiliki satu Profil).
- One to Many: Relasi paling umum (contoh: Satu Provider PPOB memiliki banyak Produk).
- Many to Many: Menggunakan tabel perantara (pivot table) (contoh: Siswa dan Ekstrakurikuler).
- Has One/Many Through: Mengakses data melalui perantara tabel lain.
- Polymorphic Relationships: Relasi fleksibel di mana satu model bisa terhubung ke banyak jenis model lain (contoh: Sistem Komentar untuk Beranda dan Produk).

## 5. Manipulasi Data (Mutators & Casts)

- Accessors & Mutators: Cara mengubah format data secara otomatis saat diambil atau disimpan (contoh: Otomatis huruf kapital pada nama).
- Attribute Casting: Merubah tipe data database ke tipe PHP (contoh: Kolom JSON di DB menjadi Array di PHP, atau kolom tanggal menjadi objek Carbon).
- Laravel 12 Style Attributes: Menggunakan sintaks baru protected function data(): Attribute untuk definisi accessors/mutators.

## 6. Query Scopes & Pencarian Canggih

- Global Scopes: Menerapkan filter secara otomatis untuk semua query model (contoh: Selalu filter produk yang berstatus 'aktif').
- Local Scopes: Membuat fungsi filter kustom yang bisa dipanggil berulang kali (contoh: $query->wherePrice('murah')).
- Advanced Filtering: Teknik pencarian data kompleks untuk fitur search di React.

## 7. Model Events & Observers

- Lifecycle Events: Memanfaatkan moment creating, updated, deleting, dll.
- Observers: Memisahkan logika event ke dalam class terpisah agar Model tetap bersih (contoh: Mengirim notifikasi otomatis saat ada transaksi PPOB baru).

## 8. Integrasi dengan Inertia & React (Pro Level)

- API Resources: Memformat data Model menjadi JSON yang bersih sebelum dikirim ke props React.
- Lazy Loading vs Eager Loading: Mengatasi masalah performa "N+1 Query" menggunakan with() atau load().
- Appends & Hidden: Mengontrol kolom mana yang boleh muncul atau disembunyikan saat data dikirim ke frontend.
- Pagination: Mengirim data dalam bentuk potongan (halaman) agar loading di React tetap cepat.

## 9. Fitur Pro & Optimasi

- Pruning Models: Membersihkan data lama secara otomatis (contoh: Menghapus log transaksi yang sudah lebih dari 1 tahun).
- Replicating Models: Menyalin data model dengan cepat menggunakan fungsi replicate().
- Caching Model: Teknik menyimpan hasil query di memori agar aplikasi sangat cepat.

---

[ Kembali ke Beranda ](../index.md)
