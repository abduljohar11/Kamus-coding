# Panduan Belajar Service Layer Laravel 12

Service Layer adalah tempat di mana seluruh logika bisnis utama aplikasi berada. Dengan memindahkan logika dari Controller ke Service, aplikasi kamu akan lebih mudah dirawat dan diuji (testing).

---

## 1. Konsep & Arsitektur Service (Pemula)

- Definisi Service Pattern: Memahami mengapa logika bisnis harus dipisahkan dari Controller.
- Struktur Folder: Cara membuat folder app/Services secara manual karena Laravel tidak menyediakan perintah artisan default.
- Class Dasar: Membuat class PHP biasa dengan metode public untuk menangani satu tugas spesifik.

## 2. Implementasi & Dependency Injection (Intermediate)

- Injecting Service: Cara memanggil Service di dalam Controller menggunakan _Type-hinting_ pada constructor atau method.
- Single Responsibility Principle (SRP): Memastikan satu Service hanya menangani satu domain (Contoh: TransactionService khusus untuk uang, AuthService khusus login).
- Returning Data: Teknik mengembalikan data dari Service dalam bentuk objek, array, atau Boolean ke Controller.

## 3. Logika Utama yang Harus Ada di Service (Core Logic)

- Complex Database Transactions: Mengelola banyak perubahan tabel sekaligus menggunakan DB::transaction agar data tidak korup jika terjadi error.
- Third-Party API Integration: Logika memanggil API eksternal (Contoh: Integrasi API Provider Pulsa di Ajocell).
- Data Transformation: Mengubah format data mentah dari database sebelum dikirim ke Inertia React.
- Heavy Calculations: Rumus matematika berat (Contoh: Menghitung markup harga otomatis, diskon bertingkat, atau kalkulasi nilai rata-rata siswa).

## 4. Handling Error & Exception di Service

- Custom Exceptions: Membuat pesan error khusus agar Controller bisa menangkap masalah bisnis secara spesifik.
- Validation in Service: Melakukan validasi logika tambahan yang tidak bisa dilakukan oleh Form Request (Contoh: Cek apakah saldo user cukup sebelum transaksi).
- Logging: Mencatat aktivitas penting atau error log langsung di dalam Service untuk keperluan debugging.

## 5. Pro Level: Abstraksi & Fleksibilitas

- Interface & Contracts: Menggunakan Interface agar Service bisa ditukar-tukar tanpa merusak Controller (sangat berguna untuk ganti provider API).
- Service Providers: Mendaftarkan Service ke dalam _Service Container_ Laravel untuk pengaturan yang lebih kompleks.
- Static vs Non-Static: Memahami kapan harus menggunakan metode statis dan kapan menggunakan objek instansiasi.

## 6. Testing & Maintenance

- Unit Testing Service: Menguji logika bisnis secara mandiri tanpa perlu menjalankan rute atau tampilan UI.
- Mocking Services: Teknik memalsukan respons Service saat melakukan testing di Controller agar testing berjalan cepat.

---

[ Kembali ke Beranda ](../index.md)
