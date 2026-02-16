# 📘 Panduan Menulis Kamus (Markdown)

Gunakan halaman ini sebagai contekan saat kamu ingin menambah materi baru ke kamus koding kamu.

---

## 1. Judul dan Struktur
Gunakan tanda `#` untuk membuat judul. Semakin banyak `#`, semakin kecil ukurannya.
# Judul Besar (H1)
## Judul Materi (H2)
### Sub-materi (H3)

---

## 2. Format Teks
Bantu pembaca menemukan poin penting dengan format ini:
* **Tebal**: Gunakan `**teks**` untuk hal **Sangat Penting**.
* *Miring*: Gunakan `*teks*` untuk *Istilah Asing*.
* ~~Coret~~: Gunakan `~~teks~~` untuk kode yang sudah tidak dipakai.
* `Inline Code`: Gunakan backtick tunggal `` ` `` untuk nama file atau variabel. 
  Contoh: Buka file `SiswaController.php`.

---

## 3. Blok Kode (Paling Penting!)
Agar kode program kamu bisa di-copy dan berwarna, gunakan triple backtick diikuti nama bahasanya. Jangan lupa menutupnya dengan triple backtick lagi di akhir kode.

### Contoh PHP (Laravel - Inertia)
```php
public function index()
{
    // Mengirim data ke React
    return Inertia::render('Dashboard', [
        'users' => User::all()
    ]);
}
