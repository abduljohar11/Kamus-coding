# Panduan Belajar Migration Laravel

Daftar ini berisi kompetensi utama yang harus dikuasai untuk mengelola database pada aplikasi Laravel yang menggunakan stack Inertia.js dan React.


# 📂 Konsep Dasar & Siklus Hidup Migration

Bagian ini menjelaskan dasar-dasar bagaimana Laravel mengelola perubahan database secara terorganisir.

## 1. Apa itu Migration?

Migration adalah **Version Control** untuk database Anda. Jika Git mencatat perubahan pada kode sumber, Migration mencatat perubahan pada skema database.
**Mengapa ini penting?**
* **Kolaborasi Team**: Semua anggota tim memiliki struktur tabel yang sama tanpa perlu kirim file `.sql`.
* **Track Record**: Mengetahui kapan sebuah kolom ditambahkan atau dihapus.
* **Keamanan**: Mengurangi risiko kesalahan manual saat modifikasi database lewat phpMyAdmin.

---

## 2. Struktur File Migration

Setiap file migration terdiri dari dua method utama: `up()` dan `down()`. File ini tersimpan di folder `database/migrations/`.

```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Jalankan perubahan (saat mengetik: php artisan migrate)
     */
    public function up(): void
    {
        Schema::create('flights', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });
    }

    /**
     * Batalkan perubahan (saat mengetik: php artisan migrate:rollback)
     */
    public function down(): void
    {
        Schema::dropIfExists('flights');
    }
};

```

---

## 3. Perintah Artisan Utama

Berikut adalah "senjata" utama kamu saat bekerja dengan migration di terminal.

### A. Membuat File Baru

Membuat kerangka file migration di folder `database/migrations/`.

```bash
php artisan make:migration create_products_table

```

### B. Menjalankan Migrasi

Mengeksekusi semua file migration yang belum pernah dijalankan sebelumnya.

```bash
php artisan migrate

```

### C. Membatalkan (Rollback)

Membatalkan langkah migrasi terakhir yang baru saja dijalankan.

```bash
php artisan migrate:rollback

```

### D. Reset Total (Fresh)

Menghapus seluruh tabel di database (tanpa peduli method `down`) dan menjalankan ulang semua migrasi dari nol.

```bash
php artisan migrate:fresh

```

---

## 💡 Siklus Hidup yang Benar

1. **Create**: Buat file dengan `make:migration`.
2. **Design**: Tentukan kolom-kolomnya di dalam method `up()`.
3. **Execute**: Jalankan dengan `php artisan migrate`.
4. **Fix**: Jika ada kesalahan saat baru saja migrate, gunakan `rollback`, edit filenya, lalu `migrate` kembali.

::: danger PERINGATAN
Jangan pernah mengedit file migration yang **sudah di-push ke server produksi**. Jika ingin mengubah tabel yang sudah live, buatlah file migration baru (Alter Table).
:::

### Tips untuk Kamu:
Saya menambahkan **diagram alur kerja** di pikiran (visualisasinya) agar kamu ingat bahwa Migration itu melingkar: *Create -> Edit -> Migrate -> Rollback*. 


# 🏗️ Skema Tabel & Tipe Kolom (Schema Builder)

Memilih tipe data yang tepat adalah kunci efisiensi database. Bayangkan database sebagai sebuah **Gudang Penyimpanan**; kamu harus memilih kontainer yang pas agar barang tidak rusak dan ruang gudang tidak mubazir.
## 1. Pemilihan Tipe Data Dasar
Ini adalah kontainer yang paling sering digunakan untuk menyimpan informasi teks dan angka.



* **`string()` (Varchar)**
    * **Analogi**: Label nama pada laci. Digunakan untuk teks pendek (nama, email, password).
    * **Kode**: `$table->string('email', 100)->unique();`
* **`text()`**
    * **Analogi**: Kotak kardus besar. Digunakan untuk konten panjang (artikel, deskripsi produk, biografi).
    * **Kode**: `$table->text('alamat_lengkap');`
* **`integer()` & `bigInteger()`**
    * **Analogi**: Dompet (integer) vs Brankas Bank (bigInteger). Gunakan `bigInteger` untuk angka yang sangat besar seperti jumlah penduduk atau ID utama.
    * **Kode**: `$table->integer('stok');` atau `$table->bigInteger('views');`
* **`decimal()`**
    * **Analogi**: Timbangan emas. Digunakan untuk angka yang butuh presisi koma, seperti harga barang atau koordinat GPS.
    * **Kode**: `$table->decimal('harga', 15, 2);` *(15 digit total, 2 di belakang koma)*.

---

## 2. Data Kompleks (Modern Development)
Tipe data ini sangat krusial saat kamu menghubungkan Laravel dengan **React/Inertia**.

* **`boolean()`**
    * **Analogi**: Saklar lampu (On/Off). Hanya menyimpan nilai 1 (true) atau 0 (false).
    * **Kode**: `$table->boolean('is_published')->default(false);`
* **`enum()`**
    * **Analogi**: Menu Pilihan. Membatasi input hanya pada daftar tertentu.
    * **Kode**: `$table->enum('status', ['draft', 'published', 'archived']);`
* **`json()` (Sangat Penting untuk React!)**
    * **Analogi**: Tas serbaguna. Kamu bisa memasukkan objek atau array apa saja ke dalamnya. Sangat fleksibel untuk mengirim konfigurasi ke frontend React.
    * **Kode**: `$table->json('metadata');`
    * *Tips: Di React, data ini akan diterima langsung sebagai Object JavaScript.*

---

## 3. Kolom Standar Laravel
Laravel menyediakan fungsi "Sakti" yang otomatis membuat kolom-kolom yang sangat berguna.

* **`timestamps()`**
    * **Fungsi**: Otomatis membuat dua kolom: `created_at` dan `updated_at`.
    * **Kode**: `$table->timestamps();`
* **`softDeletes()`**
    * **Analogi**: Keranjang Sampah (Recycle Bin). Data tidak benar-benar dihapus dari database, hanya ditandai sebagai "dihapus".
    * **Kode**: `$table->softDeletes();` *(Menambahkan kolom `deleted_at`)*.
* **`rememberToken()`**
    * **Fungsi**: Digunakan oleh Laravel untuk fitur "Remember Me" pada sistem login.
    * **Kode**: `$table->rememberToken();`

---

## 💡 Contoh Implementasi Full

Berikut adalah contoh bagaimana menggabungkan semua poin di atas dalam satu skema tabel produk:

```php
Schema::create('products', function (Blueprint $table) {
    $table->id();
    $table->string('slug')->unique(); 
    $table->string('name');
    $table->text('body');
    $table->decimal('price', 12, 2);
    $table->integer('stock')->default(0);
    $table->json('specifications'); // Data untuk ditampilkan di React
    $table->enum('condition', ['new', 'used']);
    $table->boolean('is_active')->default(true);
    $table->softDeletes();
    $table->timestamps();
});

```

::: tip PROGRAMMER NOTE
Saat menggunakan stack **Inertia.js**, tipe data `json()` sangat membantu karena kamu bisa menyimpan data atribut yang dinamis tanpa harus terus-menerus menambah kolom baru di database.
:::

# 🛠️ Modifikasi Atribut Kolom (Column Modifiers)

Setelah memilih tipe data (kontainer), kita perlu mengatur **perilaku** atau **sifat** dari kolom tersebut. Di Laravel, ini disebut sebagai *Column Modifiers*.



## 1. Nilai Default (`default()`)
Memberikan nilai otomatis jika saat input data kita tidak mengisi kolom tersebut.

* **Analogi**: Setelan Pabrik. Jika kamu membeli HP baru, wallpaper-nya sudah ada dari sana. Kamu bisa menggantinya nanti, tapi kalau tidak diganti, ya tetap pakai setelan pabrik itu.
* **Contoh Kode**:
    ```php
    // Memberikan status 'pending' secara otomatis pada transaksi baru
    $table->string('status')->default('pending');

    // Memberikan nilai 0 untuk stok awal
    $table->integer('stock')->default(0);
    ```

---

## 2. Nullable (`nullable()`)
Mengizinkan sebuah kolom untuk dikosongkan (berisi nilai `NULL`).

* **Analogi**: Kolom "Catatan Tambahan" di formulir. Kamu boleh mengisinya jika ada pesan khusus, tapi kalau dikosongkan pun formulir kamu tetap sah dan diterima.
* **Contoh Kode**:
    ```php
    // Bio profil boleh kosong, tidak semua user punya kata-kata mutiara
    $table->text('bio')->nullable();

    // Foto produk cadangan boleh kosong
    $table->string('secondary_image')->nullable();
    ```

---

## 3. Posisi Kolom (`after()`)
Mengatur urutan letak kolom di dalam tabel database (hanya untuk MySQL/MariaDB).

* **Analogi**: Menyelipkan bangku di barisan bioskop. Jika barisan sudah penuh, kamu ingin duduk tepat di sebelah temanmu, bukan di paling ujung.
* **Contoh Kode**:
    ```php
    // Menambahkan kolom 'phone' tepat setelah kolom 'email' agar rapi saat dilihat di phpMyAdmin
    $table->string('phone')->after('email');
    ```

---

## 💡 Contoh Implementasi Gabungan

Bayangkan kamu sedang membuat sistem **Manajemen User** yang aman dan rapi:

```php
Schema::table('users', function (Blueprint $table) {
    // 1. Kolom role dengan default 'customer'
    $table->string('role')->default('customer');

    // 2. Kolom alamat yang boleh kosong (nullable)
    $table->text('address')->nullable();

    // 3. Menyelipkan kolom sosmed setelah kolom username
    $table->string('instagram_handle')->nullable()->after('username');
});

```

---

## 🛡️ Catatan Programmer & Security

::: tip TIPS
Selalu gunakan `default()` untuk kolom status atau angka agar aplikasi kamu tidak error saat mencoba menghitung data yang kosong.
:::

::: warning SECURITY
Gunakan `nullable()` dengan bijak. Jangan berikan `nullable()` pada kolom penting seperti `email` atau `password`, karena setiap user **wajib** memilikinya untuk keamanan autentikasi.
:::


# 🔗 Relasi Database (Foreign Keys)

Relasi database adalah cara kita menghubungkan satu tabel dengan tabel lainnya. Tanpa relasi, data kita hanyalah kumpulan tabel yang terisolasi dan tidak punya arti.



## 1. Sintaks Modern (`foreignId`)
Laravel menyediakan cara yang sangat singkat untuk membuat kolom kunci tamu (Foreign Key).

* **Analogi**: KTP Anak. Di KTP seorang anak, ada kolom "Nama Orang Tua". Kolom itu menghubungkan identitas anak ke identitas orang tuanya yang ada di tabel kependudukan lain.
* **Contoh Kode**:
    ```php
    // Cara lama (Ribet)
    $table->unsignedBigInteger('user_id');
    $table->foreign('user_id')->references('id')->on('users');

    // Cara Modern (Sangat Efisien)
    $table->foreignId('user_id');
    ```

---

## 2. Integritas Data (`constrained` & `cascade`)
Ini adalah aturan main agar hubungan antar tabel tetap konsisten dan tidak ada data "yatim piatu".



* **`constrained()`**
    * **Fungsi**: Memastikan ID yang dimasukkan **wajib ada** di tabel tujuan. Kamu tidak bisa mencatat transaksi untuk User ID 99 jika User ID 99 itu tidak ada.
* **`onDelete('cascade')`**
    * **Analogi**: Akun Media Sosial. Jika kamu menghapus akun Instagram kamu (Induk), maka semua foto dan komentar kamu (Anak) akan otomatis ikut terhapus.
* **`onUpdate('cascade')`**
    * **Fungsi**: Jika ID Induk berubah, maka ID di tabel Anak akan otomatis ikut berubah agar tetap sinkron.

---

## 3. Relasi Antar Tabel (Contoh Kasus)
Mari kita hubungkan tabel **Transaksi** dengan tabel **User** dan **Produk**. Ini adalah standar yang akan sering kamu temui di project PPOB atau E-commerce.

```php
Schema::create('transactions', function (Blueprint $table) {
    $table->id();
    
    // Menghubungkan ke tabel users
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    
    // Menghubungkan ke tabel products
    $table->foreignId('product_id')->constrained()->onDelete('restrict');
    
    $table->integer('amount');
    $table->enum('status', ['pending', 'success', 'failed']);
    $table->timestamps();
});

```

> **Penjelasan Kode Di Atas:**
> 1. Jika **User dihapus**, maka semua riwayat transaksinya akan **ikut terhapus** (`cascade`).
> 2. Jika **Produk dihapus**, Laravel akan **menolak/melarang** (`restrict`) jika masih ada data transaksi yang menggunakan produk tersebut. Ini untuk menjaga laporan keuangan kamu agar tidak rusak.
> 
> 

---

## 💡 Tips untuk React & Inertia

::: tip TIPS
Saat kamu mengirim data relasi ke React, pastikan di Controller kamu menggunakan fungsi `with()`.
Contoh: `Transaction::with('user')->get();`
Dengan begitu, di frontend React kamu bisa langsung memanggil `props.transaction.user.name`.
:::

::: danger KEAMANAN
Gunakan `onDelete('restrict')` untuk data-data sensitif seperti transaksi keuangan. Jangan sampai data laporan kamu hilang hanya karena seseorang tidak sengaja menghapus nama produk.
:::

# ⚡ Indeks & Performa

Indeks adalah cara kita memberi tahu database bagaimana cara menemukan data dengan cepat. Tanpa indeks, database harus membaca setiap baris satu per satu (*Full Table Scan*), yang akan membuat aplikasi kamu lambat saat data sudah ribuan.



## 1. Unique Constraint (`unique()`)
Memastikan bahwa tidak ada dua baris data yang memiliki nilai yang sama pada kolom tertentu.

* **Analogi**: Nomor Induk Kependudukan (NIK) atau Username. Di seluruh Indonesia, tidak boleh ada dua orang yang memiliki NIK yang sama. Jika ada yang mencoba mendaftar dengan NIK yang sudah ada, sistem akan menolak.
* **Contoh Kode**:
    ```php
    // Email tidak boleh sama antar user
    $table->string('email')->unique();

    // Username untuk login juga harus unik
    $table->string('username')->unique();
    ```

---

## 2. Primary Key (`primary()`)
Identitas utama dari sebuah tabel. Secara default Laravel menggunakan `id()`, tapi kamu bisa menentukannya sendiri.

* **Analogi**: Plat Nomor Kendaraan. Ini adalah pengenal utama yang paling cepat dikenali oleh polisi (database) untuk mengidentifikasi sebuah mobil (data).
* **Contoh Kode**:
    ```php
    // Jika kamu ingin menggunakan kode string sebagai kunci utama
    $table->string('product_code')->primary();
    ```

---

## 3. Optimasi Query (`index()`)
Membuat semacam "Daftar Isi" di belakang layar database untuk kolom yang sering dicari.



* **Analogi**: Indeks di buku pelajaran. Jika kamu ingin mencari kata "Inertia" di buku setebal 500 halaman, kamu tidak akan membaca dari halaman 1. Kamu langsung buka halaman indeks di paling belakang, cari huruf "I", lihat nomor halamannya, lalu langsung lompat ke sana.
* **Contoh Kode**:
    ```php
    // Jika kamu sering mencari produk berdasarkan kategori atau status
    $table->string('status')->index();
    $table->foreignId('category_id')->index();
    
    // Indeks Gabungan (Composite Index)
    // Berguna jika kamu sering mencari dengan dua filter sekaligus (misal: status aktif DAN kategori elektronik)
    $table->index(['status', 'category_id']);
    ```

---

## 💡 Perbandingan Performa

| Tanpa Indeks | Dengan Indeks |
| :--- | :--- |
| Database mencari dari baris 1 sampai akhir. | Database langsung lompat ke lokasi data. |
| Sangat lambat jika data > 10.000. | Tetap cepat meski data jutaan. |
| Membebaskan beban CPU server. | Menggunakan sedikit ruang penyimpanan tambahan. |

---

## 🛡️ Catatan Cyber Security & Programmer
::: tip TIPS
Selalu beri `index()` pada kolom yang sering muncul di dalam fungsi `where()` pada Controller kamu. Contoh: `User::where('status', 'active')->get();` -> Kolom `status` wajib diberi indeks.
:::

::: warning PENTING
Jangan memberikan `index()` pada **semua** kolom. Setiap indeks memakan ruang penyimpanan dan bisa sedikit memperlambat proses `INSERT` (karena database harus memperbarui "daftar isi" setiap ada data baru). Gunakan hanya pada kolom yang sering dicari.
:::



# 🔄 Modifikasi Tabel yang Sudah Ada

Seiring perkembangan aplikasi, struktur database pasti akan berubah. Modifikasi tabel (Alter Table) memungkinkan kita menambah, mengubah, atau menghapus kolom tanpa harus menghancurkan data yang sudah ada di dalamnya.
## 1. Menambah Kolom (Alter Table)
Menambahkan "ruangan baru" pada struktur yang sudah berdiri.

* **Analogi**: Renovasi Rumah. Kamu ingin menambah satu kamar mandi di dalam kamar tidur utama. Kamu tidak perlu merobohkan seluruh rumah, cukup panggil tukang untuk membangun sekat dan pipa baru di area tersebut.
* **Contoh Kode**:
    Jalankan: `php artisan make:migration add_phone_to_users_table`
    ```php
    Schema::table('users', function (Blueprint $table) {
        // Menambah kolom phone tepat setelah kolom email
        $table->string('phone')->nullable()->after('email');
    });
    ```

---

## 2. Mengubah Kolom (Change & Rename)
Mengganti tipe data atau mengganti nama kolom yang salah ketik.

* **Analogi**: Alih Fungsi Ruangan. Kamu punya gudang, tapi sekarang ingin kamu ubah fungsinya menjadi kantor pribadi. Luasnya tetap, tapi kegunaannya berubah.
* **Contoh Kode**:
    *Catatan: Kamu perlu menginstall library tambahan: `composer require doctrine/dbal` (untuk Laravel versi lama).*
    ```php
    Schema::table('users', function (Blueprint $table) {
        // 1. Mengubah tipe data (misal: dari string ke text)
        $table->text('bio')->change();

        // 2. Mengganti nama kolom
        $table->renameColumn('fullname', 'full_name');
    });
    ```

---

## 3. Penghapusan Kolom (`dropColumn`)
Menghapus bagian yang sudah tidak diperlukan secara aman.

* **Analogi**: Membongkar Lemari Tua. Kamu punya lemari besar yang sudah tidak dipakai dan hanya memenuhi ruangan. Kamu membongkarnya agar ruangan jadi lebih lega, tapi barang di lemari lain tetap aman.
* **Contoh Kode**:
    ```php
    Schema::table('users', function (Blueprint $table) {
        // Menghapus kolom yang sudah tidak digunakan
        $table->dropColumn('old_plugin_data');
        
        // Menghapus banyak kolom sekaligus
        $table->dropColumn(['temporary_token', 'temp_status']);
    });
    ```

---

## 💡 Alur Kerja yang Aman (Best Practice)



1. **Jangan Edit File Lama**: Jika migrasi sudah pernah dijalankan (`migrated`), jangan ubah file `.php` yang lama.
2. **Buat File Baru**: Selalu buat file migrasi baru untuk setiap perubahan (Alter).
3. **Cek Method Down**: Pastikan kamu menulis logika kebalikannya di method `down()` agar bisa di-rollback jika terjadi error.

```php
// Contoh di dalam file migrasi penambahan kolom
public function up() {
    Schema::table('users', function (Blueprint $table) {
        $table->string('api_token')->nullable();
    });
}

public function down() {
    Schema::table('users', function (Blueprint $table) {
        $table->dropColumn('api_token'); // Kembalikan seperti semula jika rollback
    });
}

```

---

## 🛡️ Catatan Cyber Security

::: danger BAHAYA
Menghapus kolom (`dropColumn`) bersifat permanen. Sebelum menjalankan migrasi yang berisi perintah hapus di server asli, pastikan kamu sudah melakukan **Backup Database** terlebih dahulu!
:::

::: tip TIPS
Gunakan `nullable()` saat menambah kolom baru pada tabel yang sudah memiliki ribuan data. Jika tidak, database mungkin akan error karena bingung harus mengisi apa pada data lama yang sudah ada.
:::



# ⚛️ Integrasi dengan Workflow Inertia/React

Setelah tabel database dibuat melalui Migration, langkah selanjutnya adalah memastikan data tersebut bisa mengalir dengan lancar ke frontend React melalui Inertia.js.



## 1. Sinkronisasi Model (`$fillable`)
Langkah pertama setelah migration adalah "mendaftarkan" kolom baru tersebut ke dalam Model Laravel agar bisa diisi.

* **Analogi**: Resepsionis Hotel. Meskipun hotel punya 100 kamar (kolom di database), resepsionis (Model) hanya akan memberikan kunci jika kamar tersebut terdaftar di buku tamu. Jika kolom tidak ada di `$fillable`, Laravel akan menolak menyimpannya demi keamanan.
* **Contoh Kode**:
    Jika kamu baru saja menambah kolom `phone` dan `address` di Migration:
    ```php
    // app/Models/User.php
    class User extends Authenticatable {
        protected $fillable = [
            'name',
            'email',
            'password',
            'phone',   // Wajib didaftarkan
            'address', // Wajib didaftarkan
        ];
    }
    ```

---

## 2. Data Preparation (Inertia Resource)
Sebelum data dikirim ke React, kita harus membungkusnya agar strukturnya rapi dan hanya mengirim data yang diperlukan saja.

* **Analogi**: Bekal Makanan. Kamu punya banyak bahan makanan di kulkas (Database). Kamu tidak mengirim kulkasnya ke sekolah, tapi kamu memotong, memasak, dan menatanya di dalam kotak bekal (Resource) agar siap dimakan oleh anak (React).
* **Contoh Kode**:
    Gunakan **Eloquent Resource** untuk memformat data:
    ```php
    // app/Http/Resources/UserResource.php
    public function toArray($request) {
        return [
            'id' => $this->id,
            'nama_lengkap' => $this->name,
            'kontak' => $this->phone ?? 'Tidak ada nomor',
            'join_sejak' => $this->created_at->format('d M Y'),
        ];
    }
    ```

---

## 3. Mengirim ke Frontend React
Di Controller, kita panggil data tersebut dan kirim lewat Inertia.

```php
// app/Http/Controllers/UserController.php
public function index() {
    $users = User::all();
    
    return Inertia::render('Users/Index', [
        'users' => UserResource::collection($users)
    ]);
}

```

---

## 4. Konsumsi Data di React

Di sisi React, kamu tinggal memanggil data yang sudah rapi tersebut sebagai `props`.

```jsx
// resources/js/Pages/Users/Index.jsx
export default function Index({ users }) {
    return (
        <div>
            {users.map(user => (
                <div key={user.id}>
                    <p>{user.nama_lengkap}</p>
                    <span>{user.join_sejak}</span>
                </div>
            ))}
        </div>
    );
}

```

---

## 🛡️ Catatan Cyber Security & Programmer

::: tip TIPS
Selalu gunakan **API Resource** untuk membatasi data. Jangan pernah mengirim seluruh kolom database (seperti password atau token) langsung ke React, meskipun itu tersembunyi di dalam *props*.
:::

::: danger PENTING
Jika kamu menambah kolom JSON di Migration, jangan lupa tambahkan `$casts` di Model:
`protected $casts = ['metadata' => 'array'];`
Agar saat sampai di React, data tersebut otomatis menjadi **Object JavaScript** yang siap pakai.
:::


## 8. Best Practices (Praktik Terbaik)

- Konvensi Penamaan: Standar penamaan tabel (plural) dan file migration.
- Strategi Deployment: Cara menjalankan migration yang aman pada server production.


# 📊 Monitoring & Maintenance (Tambahan Penting)

Mengelola database bukan hanya soal membuat tabel, tapi juga memantau dan merawatnya agar tetap sinkron antara kode kodingan kamu dengan data yang ada di server.



## 1. Monitoring dengan `migrate:status`
Perintah ini digunakan untuk melihat "jejak digital" migrasi kamu.

* **Analogi**: Daftar Ceklis (Checklist). Sebelum kamu berangkat kerja, kamu mengecek daftar barang: Kunci (Sudah), Dompet (Sudah), Helm (Belum). `migrate:status` memberi tahu file mana yang sudah "masuk" ke database dan mana yang masih tertinggal di folder kodingan.
* **Contoh Output**:
    ```bash
    php artisan migrate:status
    ```
    | Ran? | Migration |
    | :--- | :--- |
    | Yes  | 2023_01_01_000001_create_users_table |
    | No   | 2026_02_26_080000_add_role_to_users_table |

---

## 2. Refresh vs Fresh (Dua Cara Reset)
Banyak programmer pemula bingung bedanya. Ini adalah perbandingan pentingnya:



### A. `migrate:refresh` (Cara Sopan)
* **Analogi**: Membongkar pasang Lego sesuai petunjuk. Kamu melepas balok satu per satu (menjalankan fungsi `down()`), lalu memasangnya kembali dari awal.
* **Kelebihan**: Menguji apakah fungsi `down()` kamu bekerja dengan benar. Lebih aman jika ada logika penghapusan file atau cache di dalam `down()`.
* **Kode**: `php artisan migrate:refresh`

### B. `migrate:fresh` (Cara Brutal)
* **Analogi**: Menghancurkan gedung dengan dinamit. Kamu tidak peduli urutan bongkarnya, pokoknya ratakan dengan tanah, lalu bangun gedung baru di atas tanah kosong tersebut.
* **Kelebihan**: Sangat cepat. Tidak peduli jika ada error di fungsi `down()`. Cocok untuk tahap awal development di mana struktur database masih sering berubah-ubah secara ekstrem.
* **Kode**: `php artisan migrate:fresh`

---

## 3. Menjalankan Ulang + Isi Data Dummy
Agar maintenance lebih mudah, biasanya kita menggabungkan perintah reset dengan **Seeder**.

```bash
# Hapus semua, bangun ulang, dan isi data otomatis (User, Produk, dll)
php artisan migrate:fresh --seed

```

---

## 🛡️ Catatan Cyber Security & Maintenance

::: danger PERINGATAN KERAS
**JANGAN PERNAH** menjalankan `migrate:fresh` atau `migrate:refresh` di server **Production** (hosting/vps yang sudah dipakai user). Perintah ini akan menghapus seluruh data asli pelanggan kamu secara permanen!
:::

::: tip TIPS
Biasakan cek `php artisan migrate:status` sebelum melakukan `git push` ke GitHub atau sebelum melakukan `php artisan migrate` di server baru. Ini memastikan kamu tahu persis apa yang akan terjadi pada database.
:::


# 🛡️ Relasi Tingkat Lanjut & Skalabilitas

Sebagai programmer dan calon pakar security, kamu harus tahu bagaimana data saling terkunci dan bagaimana mengelola ratusan file migrasi tanpa pusing.



## 10. Opsi Penghapusan Relasi (Advanced Foreign Keys)

Ini adalah aturan yang menentukan nasib "Data Anak" ketika "Data Induk" dihapus.



### A. On Delete Cascade (Hapus Massal)
* **Analogi**: Penghapusan Akun Sosmed. Jika kamu menghapus akun utama, maka semua foto, komentar, dan like kamu otomatis ikut terhapus.
* **Kode**: `$table->foreignId('user_id')->constrained()->onDelete('cascade');`

### B. On Delete Set Null (Jejak Sejarah)
* **Analogi**: Anonimitas Penulis. Jika seorang penulis berhenti dari koran dan meminta namanya dihapus, artikelnya tetap ada tapi nama penulisnya berubah menjadi "Anonim" atau "Kosong". Sangat berguna untuk data transaksi agar laporan keuangan tidak hilang.
* **Kode**: `$table->foreignId('author_id')->nullable()->constrained()->onDelete('set null');`

### C. On Delete Restrict (Proteksi Ketat)
* **Analogi**: Larangan Bongkar Bangunan. Kamu tidak bisa menghapus pondasi rumah selama atap dan temboknya masih berdiri. Kamu harus hapus atap dan tembok dulu, baru bisa hapus pondasi.
* **Kode**: `$table->foreignId('category_id')->constrained()->onDelete('restrict');`

---

## 11. Skalabilitas Database

Saat project kamu sudah berjalan setahun, folder `migrations/` mungkin akan berisi ratusan file. Berikut cara menanganinya:

### A. Migration Squashing
* **Konsep**: Menggabungkan (kompres) semua file migrasi lama menjadi satu file SQL mentah. Ini mempercepat proses `migrate:fresh`.
* **Analogi**: Mengarsipkan Folder. Daripada menyimpan ribuan lembar kertas catatan, kamu mem-fotokopi semuanya ke dalam satu buku rangkuman besar.
* **Kode (Terminal)**: 
    ```bash
    php artisan schema:dump --prune
    ```

### B. Anonymous Migrations
* **Konsep**: Menggunakan class tanpa nama agar tidak terjadi bentrok jika ada dua file migrasi dengan nama class yang sama. Ini adalah standar Laravel terbaru (v9+).
* **Kode**:
    ```php
    // Laravel otomatis menggunakan ini sekarang:
    return new class extends Migration {
        // ...
    };
    ```

---

## 🏗️ Tips Pro untuk Proyek Besar

::: tip TIPS
Selalu gunakan **On Delete Restrict** untuk tabel yang berhubungan dengan **Keuangan (PPOB, E-commerce)**. Jangan biarkan data produk dihapus jika sudah pernah ada transaksi menggunakan produk tersebut.
:::

::: danger KEAMANAN
Migration Squashing sangat bagus untuk performa, tapi pastikan kamu memiliki backup file SQL hasil dump tersebut di luar server aplikasi untuk berjaga-jaga jika file dump-nya korup.
:::

---

---
## 🧭 Navigasi Cepat

| Navigasi | Link Tujuan |
| :--- | :--- |
| **🚀 Full Code** | [ 📜 Lihat Cheat Sheet Kode ](./kode.md) |
| **📂 Daftar Isi** | [ 📂 Kembali ke Daftar Isi ](../index.md) |
| **🏠 Beranda** | [ 🏠 Kembali ke Beranda ](../../index.md) |

---


