
# 🚀 Full Stack Guide: Laravel + Inertia + React

Halaman ini adalah panduan lengkap dari instalasi, konfigurasi database `.env`, hingga contoh kodingan siap pakai.

---

## 📦 1. Langkah Instalasi Utama

Jalankan perintah ini secara berurutan di terminal kamu:

### Install Project & Starter Kit
```bash
# Buat project baru
composer create-project laravel/laravel nama-project

# Masuk ke folder project
cd nama-project

# Install Breeze untuk scaffolding (Auth, Tailwind, Inertia)
composer require laravel/breeze --dev

# Install React stack
php artisan breeze:install react

```

### Install Node Modules

```bash
# Wajib agar React & Tailwind bisa berjalan
npm install

```

---

## 🗄️ 2. Konfigurasi Database (.env)

Cari file bernama `.env` di root folder kamu, lalu sesuaikan bagian **DB_CONNECTION** agar bisa terhubung ke MySQL (XAMPP atau Database lokal lainnya).

### Settingan Default MySQL:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_database_kamu
DB_USERNAME=root
DB_PASSWORD=

```

### Jalankan Migrasi

Setelah database dibuat di phpMyAdmin, sinkronkan tabelnya:

```bash
php artisan migrate

```

---

## 🔌 3. Library Tambahan (Opsional)

Tambahkan library ini untuk mempercantik UI aplikasi kamu:

### SweetAlert2 & Lucide Icons

```bash
# Untuk notifikasi pop-up yang cantik
npm install sweetalert2

# Untuk icon modern yang ringan
npm install lucide-react

```

---

## 💻 4. Contoh Implementasi Kode

Gunakan contoh di bawah ini pada file React kamu (misal: `resources/js/Pages/Dashboard.jsx`) untuk mengetes apakah library sudah berfungsi:

```jsx
import React from 'react';
import Swal from 'sweetalert2';
import { ShieldCheck, Database, Save } from 'lucide-react';

export default function ExampleComponent() {
    
    const handleSave = () => {
        Swal.fire({
            title: 'Koneksi Aman!',
            text: 'Database berhasil dikonfigurasi',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Mantap!'
        });
    };

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                <h1 className="flex items-center gap-2 text-xl font-bold">
                    <ShieldCheck className="text-green-600" /> Status Keamanan
                </h1>
                
                <p className="mt-2 text-gray-600 flex items-center gap-2">
                    <Database size={16} /> Database: Connected
                </p>
                
                <button 
                    onClick={handleSave}
                    className="mt-6 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition"
                >
                    <Save size={18} /> Simpan Perubahan
                </button>
            </div>
        </div>
    );
}

```

---

## 🏗️ 5. Menjalankan & Build

### Mode Development (Saat Koding)

Jalankan di dua tab terminal berbeda:

```bash
# Terminal 1: Backend Server
php artisan serve

# Terminal 2: Frontend Asset (Hot Reload)
npm run dev

```

### Persiapan Produksi (Wajib Sebelum Upload)

Jalankan ini agar semua asset di-minify dan siap di-upload ke hosting:

```bash
npm run build

```

---

## 💡 Info VitePress

::: tip TIPS
Arahkan kursor ke pojok kanan atas setiap blok kode untuk menyalin (Copy) secara cepat.
:::

::: warning CYBER SECURITY
Pastikan file `.env` kamu masuk dalam `.gitignore` agar password database tidak bocor ke publik saat di-push ke GitHub.
:::
[ Kembali ke Beranda ](../index.md)