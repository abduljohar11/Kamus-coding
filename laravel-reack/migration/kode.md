
# 🗄️ Ultra Cheat Sheet: Laravel Migration

Dokumentasi teknis berfokus pada kode untuk manajemen database Laravel.



## 💻 1. Perintah Artisan (Terminal)
```bash
# Manajemen Dasar
php artisan make:migration create_users_table         # Buat tabel baru
php artisan make:migration add_role_to_users_table    # Modifikasi tabel
php artisan migrate                                   # Eksekusi migrasi
php artisan migrate:status                            # Cek status ran/pending

# Rollback & Reset (Batch Management)
php artisan migrate:rollback                          # Mundur 1 batch terakhir
php artisan migrate:rollback --step=2                 # Mundur 2 file terakhir
php artisan migrate:reset                             # Rollback semua migrasi
php artisan migrate:refresh --seed                    # Reset + Jalankan ulang + Data dummy
php artisan migrate:fresh --seed                      # Drop All + Jalankan ulang + Data dummy

# Maintenance Proyek Besar
php artisan schema:dump                               # Dump skema ke SQL
php artisan schema:dump --prune                       # Dump + Hapus file migrasi lama

```

---

## 🏗️ 2. Schema Builder: Tipe Kolom Lengkap

Daftar tipe data paling sering digunakan dalam pengembangan aplikasi modern.

```php
Schema::create('example', function (Blueprint $table) {
    // ID & Kunci Utama
    $table->id();                                     // BigIncremental ID
    $table->uuid('uuid')->unique();                   // UUID (Keamanan extra)
    
    // String & Teks
    $table->string('title', 200);                     // Varchar(200)
    $table->string('slug')->unique();                 // Index unik untuk SEO
    $table->text('description');                      // Text panjang
    $table->longText('content');                      // Sangat panjang
    
    // Angka & Finansial (PPOB / E-commerce)
    $table->integer('stock')->default(0);             // Angka bulat
    $table->bigInteger('balance')->default(0);        // Angka besar (Saldo)
    $table->decimal('price', 15, 2);                  // Presisi uang (Total 15 digit, 2 desimal)
    $table->float('rating', 3, 2);                    // Angka desimal kecil (Contoh: 4.50)
    
    // Pilihan & Status
    $table->boolean('is_active')->default(true);      // 1 atau 0 (Boolean)
    $table->enum('role', ['admin', 'user', 'guest']); // Pilihan terbatas
    $table->json('settings')->nullable();             // Konfigurasi JSON (Object React)
    
    // Waktu & Sistem
    $table->date('birthday');                         // YYYY-MM-DD
    $table->dateTime('published_at');                 // YYYY-MM-DD HH:MM:SS
    $table->timestamps();                             // created_at & updated_at
    $table->softDeletes();                            // deleted_at (Fitur Trash)
    $table->rememberToken();                          // Token login
});

```

---

## 🛠️ 3. Column Modifiers (Sifat Kolom)

```php
$table->string('avatar')->nullable();                 // Boleh kosong (NULL)
$table->string('status')->default('active');          // Nilai default
$table->string('phone')->unique();                    // Tidak boleh duplikat
$table->string('note')->comment('Catatan internal');  // Komentar DB
$table->unsignedInteger('points');                    // Hanya angka positif
$table->string('address')->after('email');            // Posisi kolom (MySQL)

```

---

## 🔗 4. Foreign Keys (Relasi Antar Tabel)

```php
// Relasi Standard (User -> Post)
$table->foreignId('user_id')->constrained()->onDelete('cascade');

// Relasi Manual (Jika nama kolom/tabel berbeda)
$table->foreignId('author_id')->references('id')->on('users')->onDelete('cascade');

// Relasi dengan Proteksi (Dilarang hapus jika ada transaksi)
$table->foreignId('product_id')->constrained()->onDelete('restrict');

// Relasi Set Null (User hapus, data tetap ada dengan ID null)
$table->foreignId('category_id')->nullable()->constrained()->onDelete('set null');

```

---

## 🔄 5. Modifikasi Tabel (Alter Table)

Gunakan jika tabel sudah ada isinya. Wajib buat file migrasi baru.

```php
Schema::table('users', function (Blueprint $table) {
    // Menambah Kolom Baru
    $table->string('bio')->nullable();
    
    // Mengubah Tipe/Sifat Kolom (Wajib: composer require doctrine/dbal)
    $table->string('name', 50)->nullable()->change();
    
    // Mengganti Nama Kolom
    $table->renameColumn('old_name', 'new_name');
    
    // Menghapus Kolom
    $table->dropColumn('temporary_data');
    $table->dropColumn(['field_1', 'field_2']); // Hapus banyak
});

```

---

## ⚡ 6. Indexing (Performa Query)

```php
$table->index('category_id');                         // Tambah index biasa
$table->unique('transaction_code');                   // Tambah index unik
$table->index(['lat', 'lng'], 'geo_index');           // Index gabungan (Composite)
$table->dropIndex(['category_id']);                   // Hapus index

```

---

## 🛡️ 7. Security & Best Practices

```php
// Gunakan Anonymous Class (Standard Laravel Baru)
return new class extends Migration {
    public function up(): void {
        // Logic create/alter
    }
    public function down(): void {
        // Logic rollback (Wajib diisi agar aman!)
        Schema::dropIfExists('table_name');
    }
};

```

---

## 🧭 Navigasi Cepat

| Navigasi | Link Tujuan |
| :--- | :--- |
| **🚀 Migration** | [ 📜 Lihat migrasi ](./index.md) |
| **📂 Daftar Isi** | [ 📂 Kembali ke Daftar Isi ](../index.md) |
| **🏠 Beranda** | [ 🏠 Kembali ke Beranda ](../../index.md) |

---
