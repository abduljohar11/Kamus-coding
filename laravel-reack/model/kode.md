
# 📜 Ultra Cheat Sheet: Model Eloquent (Full Code)

File ini berisi rangkuman kode teknis tanpa penjelasan panjang. Gunakan `Ctrl + F` untuk mencari perintah.



## 💻 1. Dasar & Konfigurasi Property
```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; // Trait hapus sementara

class Product extends Model
{
    use SoftDeletes; // Mengaktifkan deleted_at

    protected $table = 'm_products';           // Nama tabel manual
    protected $primaryKey = 'uuid';            // PK manual (default 'id')
    public $incrementing = false;              // Jika PK bukan integer (misal: UUID/String)
    protected $keyType = 'string';             // Tipe data PK
    public $timestamps = true;                 // Aktifkan created_at & updated_at
    protected $connection = 'mysql_second';    // Koneksi DB berbeda
}

```

---

## 🛡️ 2. Security & Data Transformation

```php
    // Whitelist: Kolom yang boleh diisi lewat mass assignment
    protected $fillable = ['name', 'price', 'stock', 'metadata', 'category_id'];

    // Blacklist: Kolom yang dilarang diisi (Proteksi Cyber Security)
    protected $guarded = ['is_admin', 'balance'];

    // Sembunyikan dari JSON (Saat dikirim ke React)
    protected $hidden = ['password', 'secret_key'];

    // Menambah kolom virtual ke JSON
    protected $appends = ['discount_price'];

    // Otomatis ubah tipe data saat masuk/keluar
    protected $casts = [
        'metadata' => 'array',       // JSON DB <-> Array PHP
        'is_active' => 'boolean',    // 0/1 <-> True/False
        'price' => 'decimal:2',      // Presisi angka desimal
        'expired_at' => 'datetime',  // String <-> Carbon Object
    ];

```

---

## 🎭 3. Accessors & Mutators (Laravel 12 Style)

```php
use Illuminate\Database\Eloquent\Casts\Attribute;

protected function name(): Attribute
{
    return Attribute::make(
        // Accessor: Muncul di React dalam huruf KAPITAL
        get: fn (string $value) => strtoupper($value),
        
        // Mutator: Simpan ke DB dalam huruf kecil semua (Normalisasi)
        set: fn (string $value) => strtolower($value),
    );
}

// Kolom Virtual (Appends)
protected function discountPrice(): Attribute
{
    return Attribute::make(
        get: fn () => $this->price * 0.9, // Diskon 10% otomatis
    );
}

```

---

## 🔗 4. Master Relationship (Relasi)

```php
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

// 1 ke 1: User punya satu Profil
public function profile(): HasOne {
    return $this->hasOne(Profile::class);
}

// 1 ke Banyak: Satu Provider punya banyak Produk (PPOB)
public function products(): HasMany {
    return $this->hasMany(Product::class, 'provider_id');
}

// Kebalikan (Inverse): Produk milik satu Provider
public function provider(): BelongsTo {
    return $this->belongsTo(Provider::class);
}

// Banyak ke Banyak: Siswa punya banyak Ekskul (Pivot)
public function activities(): BelongsToMany {
    return $this->belongsToMany(Activity::class, 'activity_student');
}

```

---

## 🔍 5. Query Scopes & Optimization

```php
// Local Scope: Filter produk murah
public function scopeCheap($query) {
    return $query->where('price', '<', 50000);
}

// Local Scope: Filter dinamis berdasarkan tipe
public function scopeOfType($query, $type) {
    return $query->where('type', $type);
}

// Cara Pakai di Controller:
// Product::cheap()->ofType('pulsa')->get();

```

---

## 🚀 6. Master Code: Gabungan Proyek Nyata

Contoh Model **`Transaction.php`** yang menggabungkan hampir semua fitur untuk sistem PPOB/Toko Online.

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Prunable;

class Transaction extends Model
{
    use SoftDeletes, Prunable;

    protected $fillable = ['user_id', 'code', 'amount', 'status', 'payload'];

    protected $casts = [
        'payload' => 'array',
        'amount' => 'decimal:0'
    ];

    // Global Scope: Selalu urutkan dari yang terbaru
    protected static function booted() {
        static::addGlobalScope('latest', function (Builder $builder) {
            $builder->latest();
        });
    }

    // Accessor: Format Rupiah untuk React
    protected function formattedAmount(): Attribute {
        return Attribute::make(
            get: fn () => "Rp " . number_format($this->amount, 0, ',', '.')
        );
    }

    // Relasi
    public function user() {
        return $this->belongsTo(User::class);
    }

    // Pruning: Hapus log transaksi sukses yang sudah 2 tahun
    public function prunable() {
        return static::where('status', 'success')->where('created_at', '<=', now()->subYears(2));
    }
}

```

---

## 🧭 Navigasi

| Opsi | Link |
| --- | --- |
| **📂 Kembali ke Modul** | [ 📂 Daftar Isi Model ](./index.md) |
| **📜 Materi Migration** | [ 🗄️ Materi Migration ](../index.md) |
| **🏠 Beranda Utama** | [ 🏠 Kembali ke Beranda ](../../index.md) |


