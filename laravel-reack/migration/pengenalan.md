# Pengenalan Laravel Migration

Migration adalah **Version Control** untuk database Anda. Jika Anda menggunakan Git untuk melacak perubahan pada kode program, maka Migration digunakan untuk melacak perubahan pada struktur (skema) database.

---

## 1. Analogi: Migration vs Blueprint Arsitektur

Bayangkan Anda sedang membangun sebuah gedung:

* **Database** adalah gedung fisiknya.
* **Migration** adalah **Blueprint (Cetak Biru)** di atas kertas.

Jika Anda ingin menambah ruangan (tabel) atau memasang stop kontak baru (kolom), Anda tidak langsung menjebol tembok. Anda mencatatnya di blueprint (file migration), lalu memberikannya kepada mandor (perintah Artisan) untuk dikerjakan. 

Jika ada kesalahan desain, Anda tinggal melihat catatan sebelumnya dan melakukan instruksi pembatalan sesuai blueprint tersebut. Dengan cara ini, setiap arsitek (developer) dalam tim memiliki instruksi gedung yang persis sama.

---

## 2. Struktur Kode Migration

Setiap file migration menggunakan class PHP yang memiliki dua metode utama: `up()` dan `down()`.

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Method UP: Menjalankan perubahan.
     * Digunakan saat kita mengetik: php artisan migrate
     */
    public function up(): void
    {
        Schema::create('produk', function (Blueprint $table) {
            $table->id();               // Membuat kolom ID (Primary Key)
            $table->string('nama');      // Membuat kolom VARCHAR untuk nama
            $table->integer('harga');    // Membuat kolom INTEGER untuk harga
            $table->text('deskripsi');   // Membuat kolom TEXT
            $table->timestamps();        // Membuat kolom created_at & updated_at
        });
    }

    /**
     * Method DOWN: Membatalkan perubahan.
     * Digunakan saat kita mengetik: php artisan migrate:rollback
     */
    public function down(): void
    {
        // Menghapus tabel 'produk' jika ingin membatalkan migrasi
        Schema::dropIfExists('produk');
    }
};


Catatan: Dengan migration, Anda tidak perlu lagi mengirim file .sql atau export-import database secara manual saat bekerja dalam tim. Cukup bagikan file migration ini melalui Git.