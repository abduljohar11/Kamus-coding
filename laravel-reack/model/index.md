# Panduan Belajar Eloquent Model Laravel 12

Model adalah komponen MVC yang menangani logika data dan interaksi dengan database menggunakan Eloquent ORM. Dalam stack Inertia + React, Model berperan sebagai penyaji data mentah sebelum diformat untuk dikirim ke frontend.



# 💎 Fondasi & Dasar-Dasar Model (Eloquent)

Eloquent ORM adalah fitur Laravel yang membuat interaksi dengan database terasa seperti berinteraksi dengan objek PHP biasa. Kamu tidak perlu lagi menulis query SQL yang panjang dan rumit.
## 1. Konsep Eloquent ORM

Eloquent memetakan satu tabel di database menjadi satu Class di PHP.

* **Analogi**: **Remote Control & Televisi**.
* Tabel Database adalah Televisi (benda fisiknya).
* Model PHP adalah Remote Control-nya.
* Kamu tidak perlu menyentuh komponen di dalam TV untuk ganti channel, cukup tekan tombol di remote (Model), maka TV (Database) akan berubah.


* **Contoh Kode**:
```php
// Tanpa Model (SQL Manual)
$user = DB::select("SELECT * FROM users WHERE id = 1");

// Dengan Model Eloquent (Lebih Manusiawi)
$user = User::find(1);

```



---

## 2. Konvensi Penamaan (Singular vs Plural)

Laravel punya aturan "pintar" agar Model otomatis tahu tabel mana yang harus ia kelola.

* **Analogi**: **Identitas Individu vs Kelompok**.
* Nama **Model** harus **Singular** (Tunggal), karena satu objek model mewakili satu baris data.
* Nama **Tabel** harus **Plural** (Jamak), karena tabel berisi banyak baris data.


* **Tabel Aturan**:
| Nama Model (PHP) | Nama Tabel (Database) |
| :--- | :--- |
| `User` | `users` |
| `Product` | `products` |
| `Category` | `categories` |

---

## 3. Pembuatan Model

Gunakan perintah Artisan untuk membuat file model secara instan di folder `app/Models/`.

* **Kode Terminal**:
```bash
# Membuat model saja
php artisan make:model Product

# Membuat model + migration sekaligus (Recommended!)
php artisan make:model Category -m

# Membuat model + migration + controller + resource (Komplit)
php artisan make:model Post -mcr

```



---

## 4. Primary Keys & Timestamps

Secara default, Laravel menganggap tabelmu punya kolom `id` dan `timestamps`. Jika tidak, kamu harus memberitahu Model-mu.

* **Primary Key Custom**:
Jika tabelmu menggunakan `kode_produk` sebagai kunci utama, bukan `id`.
```php
protected $primaryKey = 'kode_produk';

// Jika primary key-mu bukan angka (misal: String/UUID)
public $incrementing = false;
protected $keyType = 'string';

```


* **Menonaktifkan Timestamps**:
Jika tabelmu tidak punya kolom `created_at` dan `updated_at`.
```php
// Tambahkan ini di dalam class Model
public $timestamps = false;

```



---

## 💡 Contoh Implementasi Fondasi Model

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    // Jika nama tabelmu bukan 'products', deklarasikan di sini:
    protected $table = 'm_produk'; 

    // Jika primary key bukan 'id'
    protected $primaryKey = 'product_id';

    // Jika tidak ingin mencatat waktu otomatis
    public $timestamps = true; 
}

```




# 🛡️ Pengaturan Data (Properties & Security)

Bagian ini mengatur bagaimana Model berinteraksi dengan tabel secara spesifik dan bagaimana kita mengamankan data dari serangan *Mass Assignment Injection*.


## 1. Mass Assignment: `$fillable` vs `$guarded`

Mass Assignment adalah fitur yang memungkinkan kamu menyimpan data hanya dengan satu baris kode (misal: `User::create($request->all())`). Namun, ini berbahaya jika tidak dibatasi.

* **`$fillable` (Whitelist)**
* **Analogi**: **Daftar Tamu VIP**. Hanya orang yang namanya ada di daftar yang boleh masuk ke pesta. Jika ada penyusup mencoba masuk, penjaga (Laravel) akan mengabaikannya.
* **Strategi**: Sebutkan kolom apa saja yang **boleh** diisi oleh user.
* **Kode**:
```php
protected $fillable = ['name', 'email', 'password'];

```




* **`$guarded` (Blacklist)**
* **Analogi**: **Daftar Cekal**. Semua orang boleh masuk, KECUALI orang-orang yang namanya ada di daftar hitam.
* **Strategi**: Sebutkan kolom yang **tidak boleh** diisi sembarangan (seperti `is_admin` atau `balance`).
* **Kode**:
```php
// Melindungi kolom is_admin agar tidak bisa diubah lewat request
protected $guarded = ['is_admin']; 

// Jika dikosongkan, berarti SEMUA kolom boleh diisi (Hati-hati!)
protected $guarded = []; 

```





---

## 2. Database Connection (`$connection`)

Gunakan ini jika aplikasimu sangat besar dan data tersebar di beberapa database berbeda (misal: database utama dan database khusus log/arsip).

* **Analogi**: **Kunci Cadangan**. Biasanya Model hanya memegang kunci untuk rumah utama (database default). Dengan properti ini, kamu memberi Model kunci untuk membuka gudang di alamat yang berbeda.
* **Kode**:
```php
class ActivityLog extends Model
{
    // Model ini akan mencari tabel 'logs' di koneksi 'mysql_secondary'
    protected $connection = 'mysql_secondary';
}

```



---

## 3. Table Aliases (`$table`)

Gunakan jika kamu bekerja dengan database lama (Legacy) atau database yang penamaannya tidak mengikuti aturan Laravel (Plural).

* **Analogi**: **Nama Panggung**. Nama asli di akta kelahiran (Database) adalah `m_user_induk`, tapi di dalam kodingan kita cukup memanggilnya dengan Model `User`.
* **Kode**:
```php
class User extends Model
{
    // Memberitahu Laravel: "Eh, tabel aslinya namanya 'm_users', bukan 'users' ya!"
    protected $table = 'm_users';
}

```



---

## 💡 Contoh Implementasi Security

Berikut adalah contoh Model yang aman dan terkonfigurasi secara manual:

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    // Konfigurasi Tabel
    protected $table = 'tb_transaksi'; // Nama tabel manual
    protected $connection = 'sqlite';   // Menggunakan koneksi SQLite

    // Keamanan (Cyber Security Best Practice)
    protected $fillable = [
        'product_id', 
        'amount', 
        'payment_method'
    ];

    // Kolom 'status' dan 'user_id' tidak dimasukkan ke fillable 
    // agar user tidak bisa mengubah status transaksi sendiri lewat form.
}

```

---

## 🛡️ Catatan Cyber Security

::: danger SECURITY ALERT
Jangan pernah mengosongkan `$guarded` (`protected $guarded = [];`) pada Model yang menerima data langsung dari `$request->all()`. Penyerang bisa mengirimkan data tambahan seperti `is_admin=1` melalui Postman dan mengambil alih hak akses akun jika kamu tidak waspada.
:::




# 📝 CRUD & Query Builder Level Pemula

CRUD (*Create, Read, Update, Delete*) adalah operasi dasar yang akan kamu lakukan 90% dari waktu kodingmu. Eloquent membuatnya menjadi sangat mudah.



## 1. Retrieving Data (Mengambil Data)

Cara mengambil informasi dari database tanpa menulis `SELECT * FROM`.

* **Analogi**: **Memesan Menu**. Kamu bisa minta "Semua Menu", "Menu Nomor 5", atau "Menu yang paling atas".
* **Contoh Kode**:
```php
// Ambil semua data
$users = User::all();

// Cari berdasarkan Primary Key (ID)
$user = User::find(1);

// Ambil data pertama yang ditemukan
$user = User::where('active', 1)->first();

// Jika data tidak ada, langsung tampilkan error 404 (Bagus untuk Security)
$user = User::findOrFail(1);

```



---

## 2. Inserting & Updating (Simpan & Ubah)

Cara memasukkan data baru atau memperbarui data yang sudah ada.

* **Analogi**: **Mengisi Formulir**. Kamu bisa mengisi formulir baru (Insert) atau mengambil formulir lama dan menghapus/menulis ulang isinya (Update).
* **Contoh Kode**:
```php
// Metode 1: save() (Manual)
$user = new User;
$user->name = 'Ajo';
$user->save();

// Metode 2: create() (Mass Assignment - Praktis)
// Pastikan sudah setting $fillable di Model
User::create(['name' => 'Ajo', 'email' => 'ajo@kos.com']);

// Update data
$user = User::find(1);
$user->update(['name' => 'Ajo v2']);

```



---

## 3. Deleting Data (Menghapus Data)

Cara membuang data yang sudah tidak diperlukan.

* **Analogi**: **Menghancurkan Dokumen**. Kamu bisa menghancurkan dokumen yang sedang kamu pegang, atau menyebutkan nomor dokumen yang ingin dihancurkan dari jauh.
* **Contoh Kode**:
```php
// Metode 1: Lewat objeknya
$user = User::find(1);
$user->delete();

// Metode 2: destroy() (Tanpa ambil datanya dulu, langsung tembak ID)
User::destroy(1);
User::destroy([1, 2, 3]); // Hapus banyak sekaligus

```



---

## 4. Soft Deletes (Fitur "Tempat Sampah")

Data tidak benar-benar hilang dari database, hanya ditandai sebagai "terhapus" (`deleted_at`).

* **Analogi**: **Recycle Bin di Windows**. File hilang dari folder, tapi masih ada di Keranjang Sampah. Kamu bisa mengembalikannya (*Restore*) jika tidak sengaja terhapus.
* **Contoh Kode**:
1. **Di Migration**: `$table->softDeletes();`
2. **Di Model**:
```php
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model {
    use SoftDeletes; // Tambahkan Trait ini
}

```


3. **Penggunaan**:
```php
$post->delete(); // Data masih ada di DB, tapi tidak muncul di query biasa

// Melihat data termasuk yang sudah di hapus
$allPosts = Post::withTrashed()->get();

// Mengembalikan data (Restore)
$post->restore();

```





---

## 💡 Contoh Implementasi CRUD di Controller

```php
public function store(Request $request) {
    // Validasi & Simpan (Create)
    $data = $request->validate(['title' => 'required']);
    Post::create($data);
    
    return redirect()->back();
}

```


# 🔗 Relationship (Relasi Antar Tabel) - Materi Inti

Relasi adalah cara Eloquent menghubungkan objek satu sama lain. Tanpa relasi, kamu akan terjebak menulis banyak query `JOIN` yang membingungkan.



## 1. One to One (Satu ke Satu)

Relasi di mana satu baris data hanya memiliki tepat satu baris data pasangan di tabel lain.

* **Analogi**: **Manusia dan Jantung**. Satu orang (User) secara normal hanya memiliki satu jantung (Profile), dan satu jantung itu spesifik milik orang tersebut.
* **Contoh Kode**:

```php
// app/Models/User.php
use Illuminate\Database\Eloquent\Relations\HasOne;

public function profile(): HasOne {
    return $this->hasOne(Profile::class);
}

// Cara Pakai: $user->profile->bio;

```

---

## 2. One to Many (Satu ke Banyak)

Satu baris data bisa memiliki banyak baris data pasangan di tabel lain. Ini adalah relasi yang paling sering kamu gunakan.

* **Analogi**: **Provider PPOB dan Produk**. Satu Provider (seperti Digiflazz) memiliki banyak Produk (Pulsa, Token, Data). Tapi satu Produk spesifik hanya dimiliki oleh satu Provider tersebut.
* **Contoh Kode**:

```php
// app/Models/Provider.php
use Illuminate\Database\Eloquent\Relations\HasMany;

public function products(): HasMany {
    return $this->hasMany(Product::class);
}

// Cara Pakai: $provider->products; // Menghasilkan koleksi produk

```

---

## 3. Many to Many (Banyak ke Banyak)

Banyak baris data di Tabel A bisa berhubungan dengan banyak baris data di Tabel B. Membutuhkan **Pivot Table** (tabel perantara).

* **Analogi**: **Siswa dan Ekstrakurikuler**. Satu Siswa bisa ikut banyak Ekskul (Pramuka, Futsal), dan satu Ekskul (Futsal) bisa diikuti oleh banyak Siswa.
* **Contoh Kode**:

```php
// app/Models/Student.php
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

public function activities(): BelongsToMany {
    return $this->belongsToMany(Activity::class, 'activity_student'); // 'activity_student' adalah pivot
}

```

---

## 4. Has One/Many Through (Relasi Melalui Perantara)

Mengambil data dari tabel jauh melalui tabel perantara.

* **Analogi**: **Kakek ke Cucu**. Kamu ingin tahu siapa Cucu dari seorang Kakek. Kamu harus lewat tabel Ayah (Perantara) dulu untuk sampai ke tabel Cucu.
* **Contoh Kode**:

```php
// app/Models/Owner.php (Pemilik Kos)
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

public function tenants(): HasManyThrough {
    // Pemilik -> Punya banyak Kamar -> Di dalam kamar ada Penyewa
    return $this->hasManyThrough(Tenant::class, Room::class);
}

```

---

## 5. Polymorphic Relationships (Relasi Serbaguna)

Satu model bisa dimiliki oleh lebih dari satu model lain menggunakan satu struktur tabel yang sama.

* **Analogi**: **Sistem Komentar**. Kamu punya tabel `comments`. Komentar ini bisa nempel di `Post` (Berita), tapi bisa juga nempel di `Product` (Barang). Daripada buat tabel `post_comments` dan `product_comments`, kita buat satu tabel yang bisa "berubah bentuk" (Polymorph).
* **Contoh Kode**:

```php
// app/Models/Comment.php
use Illuminate\Database\Eloquent\Relations\MorphTo;

public function commentable(): MorphTo {
    return $this->morphTo();
}

// Di tabel migrations perlu kolom: commentable_id dan commentable_type

```

---

## 💡 Ringkasan Perintah `use`

Agar relasi berjalan lancar, pastikan kamu mengimpor kelas yang tepat di bagian atas file Model kamu:

```php
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

```


# 🎭 Manipulasi Data (Mutators & Casts)

Manipulasi data memungkinkan kita mengubah "wajah" data saat ia keluar dari database (Accessors) atau merubah "bentuk" data sebelum ia masuk ke database (Mutators).



## 1. Accessors & Mutators

Mengambil atau menyimpan data dengan format tertentu secara otomatis.

* **Analogi**: **Kacamata Filter & Mesin Penerjemah**.
* **Accessor (Kacamata Filter)**: Kamu melihat data di database yang terlihat "kusam", tapi saat dilihat lewat kacamata ini (Model), data terlihat cantik (misal: Nama jadi Huruf Kapital).
* **Mutator (Mesin Penerjemah)**: Kamu memasukkan teks bahasa Indonesia, tapi mesin otomatis menyimpannya dalam bahasa rahasia (misal: Password di-hash sebelum disimpan).


* **Contoh Kode (Cara Lama/Lama)**:

```php
// app/Models/User.php

// Mutator: Otomatis enkripsi password saat diisi
public function setPasswordAttribute($value) {
    $this->attributes['password'] = bcrypt($value);
}

// Accessor: Otomatis kapitalisasi nama saat dipanggil
public function getNameAttribute($value) {
    return ucfirst($value);
}

```

---

## 2. Attribute Casting (`$casts`)

Merubah tipe data mentah database ke dalam tipe data PHP yang lebih berguna.

* **Analogi**: **Pengolah Bahan Makanan**. Database memberikan kamu "beras mentah" (String JSON), tapi Casting memasaknya menjadi "nasi" (Array PHP) yang siap dimakan oleh **React**.
* **Contoh Kode**:

```php
// app/Models/Product.php

protected $casts = [
    'options' => 'array',       // JSON di DB -> Array di PHP (Sangat penting untuk React!)
    'is_active' => 'boolean',   // 0/1 di DB -> true/false di PHP
    'published_at' => 'datetime', // String di DB -> Objek Carbon (Bisa format tanggal)
    'price' => 'decimal:2',     // Pastikan 2 angka di belakang koma
];

```

---

## 3. Laravel Style Attributes (Sintaks Baru)

Laravel 11 dan 12 memperkenalkan cara yang lebih ringkas dan modern menggunakan kelas `Attribute`.

* **Analogi**: **Alat Serbaguna (Swiss Army Knife)**. Kamu mendefinisikan cara mengambil (get) dan cara menyimpan (set) dalam satu fungsi yang sama agar lebih rapi.
* **Contoh Kode**:

```php
// app/Models/User.php
use Illuminate\Database\Eloquent\Casts\Attribute;

protected function name(): Attribute
{
    return Attribute::make(
        // Get: Saat data diambil (Accessor)
        get: fn (string $value) => strtoupper($value),
        
        // Set: Saat data disimpan (Mutator)
        set: fn (string $value) => strtolower($value),
    );
}

```

---

## 💡 Mengapa Ini Penting untuk Stack React/Inertia?

1. **JSON Casting**: Tanpa `$casts`, React akan menerima data JSON sebagai *string*. Dengan casting, React menerima *Object* atau *Array* asli yang bisa langsung di-`map()`.
2. **Date Formatting**: Kamu bisa membuat Accessor untuk memformat tanggal (misal: `2 menit yang lalu`) sehingga frontend React tinggal menampilkan saja tanpa perlu library tambahan seperti Moment.js.




# 🔍 Query Scopes & Pencarian Canggih

Query Scopes memungkinkan kamu mendefinisikan logika *query* yang sering digunakan agar bisa dipanggil kembali dengan sangat mudah di mana saja.



## 1. Local Scopes

Membuat fungsi filter kustom yang bisa kamu pasang atau lepas secara manual saat melakukan query.

* **Analogi**: **Tombol Filter di Toko Online**. Kamu punya daftar semua produk, tapi kamu menyediakan tombol "Cek Produk Murah" atau "Cek Produk Populer". Saat tombol ditekan, daftar otomatis menyusut sesuai kriteria.
* **Contoh Kode**:
*Pastikan nama fungsi diawali dengan kata `scope` (contoh: `scopeActive`).*

```php
// app/Models/Product.php

// Cara Mendefinisikan
public function scopeCheap($query) {
    return $query->where('price', '<', 100000);
}

public function scopeStatus($query, $type) {
    return $query->where('status', $type);
}

// Cara Pakai di Controller:
$products = Product::cheap()->status('active')->get();

```

---

## 2. Global Scopes

Menerapkan filter secara otomatis untuk **semua** query yang dilakukan pada model tersebut tanpa perlu dipanggil secara manual.

* **Analogi**: **Kacamata Hitam**. Begitu kamu memakai kacamata ini, semua yang kamu lihat akan menjadi gelap secara otomatis. Kamu tidak perlu "mengatur" kegelapan setiap kali melihat benda baru.
* **Contoh Kode**:
Biasanya digunakan untuk fitur seperti `is_active` atau sistem *Multi-tenancy*.

```php
// app/Models/User.php
use Illuminate\Database\Eloquent\Builder;

protected static function booted(): void
{
    static::addGlobalScope('active', function (Builder $builder) {
        // Semua query User otomatis akan ditambah: WHERE status = 'active'
        $builder->where('status', 'active');
    });
}

// Jika ingin mematikan filter ini sesekali:
$allUsers = User::withoutGlobalScope('active')->get();

```

---

## 3. Advanced Filtering (Untuk Fitur Search React)

Teknik pencarian fleksibel yang sering digunakan untuk memproses input *search* atau *filter* dari frontend React.

* **Analogi**: **Asisten Pribadi**. Kamu memberikan asisten sebuah daftar keinginan (keyword, kategori, rentang harga). Asisten tersebut hanya akan membawakan barang yang cocok dengan semua atau salah satu kriteria tersebut.
* **Contoh Kode**:

```php
// app/Models/Product.php

public function scopeSearch($query, array $filters) {
    // Filter berdasarkan Keyword (Nama atau Deskripsi)
    $query->when($filters['search'] ?? null, function ($query, $search) {
        $query->where(function ($query) use ($search) {
            $query->where('name', 'like', '%'.$search.'%')
                  ->orWhere('description', 'like', '%'.$search.'%');
        });
    });

    // Filter berdasarkan Kategori
    $query->when($filters['category'] ?? null, function ($query, $category) {
        $query->where('category_id', $category);
    });
}

```

---

## 💡 Keuntungan untuk Stack Inertia/React

Dengan memindahkan logika pencarian ke dalam **Scope Search**, Controller kamu akan terlihat sangat elegan seperti ini:

```php
// app/Http/Controllers/ProductController.php
public function index(Request $request) {
    return Inertia::render('Products/Index', [
        'products' => Product::query()
            ->search($request->only(['search', 'category']))
            ->paginate(10)
            ->withQueryString(),
    ]);
}

```




# 🔔 Model Events & Observers

Model Events adalah "sinyal" yang dipancarkan oleh Eloquent saat terjadi sesuatu pada data. Kamu bisa menangkap sinyal ini untuk menjalankan perintah tertentu (seperti log aktivitas atau kirim email).



## 1. Lifecycle Events (Momen Penting)

Ada banyak momen dalam siklus hidup sebuah data yang bisa kamu manfaatkan.

* **Analogi**: **Alarm Sensor Rumah**.
* `creating`: Alarm bunyi saat ada orang *baru mencoba* membuka pintu (sebelum data masuk DB).
* `created`: Alarm bunyi saat orang tersebut *sudah berhasil* masuk ke dalam rumah (setelah data masuk DB).
* `deleting`: Alarm bunyi saat seseorang *mencoba membuang* barang ke tempat sampah.


* **Contoh Kode (Langsung di Model)**:
Biasanya digunakan untuk hal simpel seperti membuat **UUID** atau **Slug** secara otomatis.

```php
// app/Models/Post.php
use Illuminate\Support\Str;

protected static function booted()
{
    // Sebelum data disimpan, buat slug otomatis dari judul
    static::creating(function ($post) {
        $post->slug = Str::slug($post->title);
    });
}

```

---

## 2. Observers (Kelas Terpisah)

Jika logika event kamu sudah terlalu panjang (misal: kirim email, kirim notifikasi WA, dan potong saldo sekaligus), jangan taruh di Model. Gunakan **Observer**.

* **Analogi**: **Sekretaris Khusus**. Daripada Manajer (Model) mengerjakan semuanya sendiri, dia menyewa Sekretaris (Observer) yang tugasnya hanya memantau: "Kalau ada transaksi baru, tolong kirimkan laporannya ke bos ya!"
* **Contoh Kode (Sistem PPOB)**:
1. **Buat Observer**: `php artisan make:observer TransactionObserver --model=Transaction`
2. **Isi Logika**:



```php
// app/Observers/TransactionObserver.php
namespace App\Observers;

use App\Models\Transaction;
use App\Notifications\PaymentNotification;

class TransactionObserver
{
    public function created(Transaction $transaction): void
    {
        // Otomatis kirim notifikasi saat transaksi PPOB berhasil dibuat
        $transaction->user->notify(new PaymentNotification($transaction));
    }
}

```

```
3.  **Daftarkan di Model**:

```

```php
// app/Models/Transaction.php
use App\Observers\TransactionObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;

#[ObservedBy([TransactionObserver::class])]
class Transaction extends Model { ... }

```

---

## 💡 Perbandingan Penggunaan

| Moment | Kegunaan Umum |
| --- | --- |
| **retrieved** | Menambah data virtual setelah data diambil dari DB. |
| **creating / created** | Membuat Slug, UUID, atau mengirim Email selamat datang. |
| **updating / updated** | Mencatat log siapa yang mengubah data (Audit Log). |
| **deleting / deleted** | Menghapus file gambar terkait di storage saat data dihapus. |

---

## 🛡️ Catatan Cyber Security & Programmer

::: tip TIPS
Gunakan **Observers** agar Model kamu tetap ramping dan mudah dibaca (Clean Code). Ini sangat membantu saat project kamu sudah mulai besar seperti "Ajocell v2".
:::

::: warning PENTING
Hati-hati dengan *Infinite Loop* (Putaran Tak Terbatas). Misalnya, di dalam event `updated`, kamu melakukan perintah `$model->update()`. Ini akan memicu event `updated` lagi dan aplikasi kamu akan *crash*.
:::



# ⚛️ Integrasi dengan Inertia & React (Pro Level)

Bagian ini memastikan data dari database sampai ke tangan user melalui React dengan cepat, ringan, dan aman.



## 1. API Resources (Transformasi Data)

Jangan pernah mengirim data Model mentah-mentah ke React. Gunakan Resource untuk memfilternya.

* **Analogi**: **Penyajian Restoran**. Database adalah dapur yang berantakan. API Resource adalah pelayan yang menata makanan di piring cantik sebelum disajikan ke meja pelanggan (React). Pelanggan tidak perlu tahu rahasia dapur (seperti `password` atau `created_at` yang tidak perlu).
* **Contoh Kode**:

```php
// app/Http/Resources/UserResource.php
public function toArray($request): array {
    return [
        'id'    => $this->id,
        'nama'  => $this->name,
        'email' => $this->email,
        // Kita bisa menambah data custom (virtual)
        'is_admin' => $this->role === 'admin',
    ];
}

```

---

## 2. Lazy Loading vs Eager Loading (Solusi N+1)

Masalah performa paling umum di Laravel adalah **N+1 Query**.

* **Analogi**: **Belanja ke Pasar**.
* **Lazy Loading (N+1)**: Kamu butuh 10 barang, dan kamu bolak-balik ke pasar 10 kali hanya untuk mengambil 1 barang setiap jalan. (Sangat lambat!)
* **Eager Loading (`with`)**: Kamu bawa daftar belanjaan, pergi sekali ke pasar, dan bawa semua 10 barang sekaligus dalam satu mobil. (Sangat cepat!)


* **Contoh Kode**:

```php
// ❌ BURUK (Lazy Loading) - Query database berulang kali di dalam loop
$books = Book::all(); 

// ✅ BAGUS (Eager Loading) - Hanya 2 Query database
$books = Book::with('author')->get(); 

```

---

## 3. Appends & Hidden (Kontrol Visibilitas)

Mengontrol data apa yang "bocor" ke frontend saat Model diubah menjadi JSON.

* **Analogi**: **Sensor Film**.
* `hidden`: Menyensor bagian sensitif (password/token).
* `appends`: Menambah subtitle atau informasi tambahan yang aslinya tidak ada di video mentah.


* **Contoh Kode**:

```php
// app/Models/User.php
class User extends Model {
    // Sembunyikan dari JSON (React tidak akan bisa melihat ini)
    protected $hidden = ['password', 'remember_token'];

    // Tambahkan data virtual ke JSON
    protected $appends = ['formatted_balance'];

    public function getFormattedBalanceAttribute() {
        return 'Rp ' . number_format($this->balance, 0, ',', '.');
    }
}

```

---

## 4. Pagination (Manajemen Data Besar)

Jangan kirim 10.000 data sekaligus ke React, karena browser user akan *freeze*.

* **Analogi**: **Buku Pelajaran**. Kamu tidak membaca semua halaman buku sekaligus dalam satu lembar kertas raksasa. Kamu membacanya halaman demi halaman (Halaman 1, 2, dst).
* **Contoh Kode**:

```php
// Di Controller
public function index() {
    return Inertia::render('Products/Index', [
        // Menggunakan paginate() otomatis mengirim link navigasi ke React
        'products' => Product::latest()->paginate(10),
    ]);
}

```

---

## 💡 Pro Tip untuk React Developer

Di sisi React, saat menggunakan `paginate()`, data kamu tidak lagi langsung berada di `props.products`, tapi pindah ke `props.products.data`. Informasi halaman ada di `props.products.links`.



# 🚀 Fitur Pro & Optimasi

Optimasi adalah perbedaan antara aplikasi yang sekadar "jalan" dengan aplikasi yang siap melayani ribuan pengguna.



## 1. Pruning Models (Pembersihan Otomatis)

Fitur untuk menghapus data lama yang sudah tidak diperlukan secara terjadwal tanpa perlu campur tangan manual.

* **Analogi**: **Petugas Kebersihan Harian**. Setiap malam, petugas akan berkeliling kantor dan membuang sampah yang sudah menumpuk di meja agar esok hari meja kembali bersih.
* **Contoh Kode**:
1. Tambahkan trait `Prunable` di Model.
2. Tentukan kriteria data yang dianggap "sampah".



```php
// app/Models/LogActivity.php
use Illuminate\Database\Eloquent\Prunable;

class LogActivity extends Model {
    use Prunable;

    public function prunable() {
        // Otomatis hapus data yang dibuat lebih dari 1 tahun lalu
        return static::where('created_at', '<=', now()->subYear());
    }
}

```

---

## 2. Replicating Models (Duplikasi Cepat)

Fungsi untuk menyalin isi sebuah baris data ke baris baru dengan satu perintah.

* **Analogi**: **Mesin Fotokopi**. Kamu punya satu formulir yang sudah diisi lengkap. Daripada menulis ulang semuanya dari nol, kamu fotokopi saja, lalu ganti sedikit bagian yang perlu diubah (seperti tanggal atau nama).
* **Contoh Kode**:

```php
// Berguna untuk fitur "Repeat Order" atau "Copy Product"
$product = Product::find(1);
$newProduct = $product->replicate();

$newProduct->name = 'Product Copy - ' . $product->name;
$newProduct->save();

```

---

## 3. Caching Model (Kecepatan Memori)

Menyimpan hasil query database ke dalam memori (seperti Redis) agar tidak perlu membebani database berulang kali.

* **Analogi**: **Menghafal Jawaban**. Jika guru bertanya "Berapa 5 x 5?", kamu tidak perlu mengambil kalkulator (Database) setiap saat. Kamu sudah hafal jawabannya di kepala (Cache), jadi bisa menjawab secara instan.
* **Contoh Kode**:

```php
use Illuminate\Support\Facades\Cache;

// Ambil data dari cache, jika tidak ada, ambil dari DB dan simpan ke cache selama 60 menit
$popularProducts = Cache::remember('popular_products', 3600, function () {
    return Product::where('views', '>', 1000)->get();
});

```

---

## 💡 Strategi Optimasi untuk Programmer

1. **Pruning**: Gunakan untuk tabel `notifications`, `failed_jobs`, atau `activity_logs`. Jangan biarkan tabel ini mencapai jutaan baris jika datanya sudah tidak relevan.
2. **Replicate**: Sangat membantu di dashboard admin agar kamu tidak perlu mengisi form yang panjang berkali-kali jika hanya ada sedikit perbedaan data.
3. **Caching**: Wajib digunakan untuk data yang jarang berubah tapi sering diakses (seperti *Setting Aplikasi* atau *Daftar Harga Provider PPOB*).

---

## 🧭 Navigasi

| Navigasi | Link Tujuan |
| --- | --- |
| **📜 Kode Cheat Sheet** | [ 📜 Lihat Kode Model](./kode.md) |
| **📂 Daftar Isi** | [ 📂 Kembali ke Daftar Isi ](../index.md) |
| **🏠 Beranda** | [ 🏠 Kembali ke Beranda ](../../index.md) |

