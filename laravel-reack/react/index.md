# Panduan Belajar React & Inertia Laravel 12

Daftar kompetensi dari tingkat dasar hingga profesional untuk integrasi React di dalam ekosistem Laravel 12.

---

## 1. Fondasi React & Inertia

- Memahami konsep SPA tanpa API melalui protokol Inertia.
- Struktur direktori pada resources/js (Pages, Components, Layouts).
- Setup awal menggunakan Vite dan entry point app.jsx.

## 2. Navigasi & Linking (Fix Error)

- Penggunaan komponen Link untuk perpindahan halaman tanpa reload.
- Cara melakukan import Link dari @inertiajs/react yang benar.
- Menggunakan atribut method dan data pada komponen navigasi.
- Teknik menjaga posisi scroll dan state saat berpindah halaman.

## 3. Komponen & Layouts

- Implementasi Persistent Layouts agar Sidebar/Navbar tidak refresh.
- Pengaturan Layout bertingkat (Nested Layouts) untuk Dashboard.
- Perbedaan penggunaan Data Props dari Laravel dan Local State React.

## 4. State Management & Data Handling

- Mengambil data global aplikasi menggunakan hook usePage.
- Menyimpan input sementara agar tidak hilang dengan hook useRemember.
- Mengakses data otomatis dari middleware HandleInertiaRequests.

## 5. Form & Validasi (Proyek PPOB & Guru)

- Memproses data formulir secara efisien menggunakan hook useForm.
- Menangani status pengiriman (processing) dan disable button otomatis.
- Menampilkan pesan error validasi Laravel langsung di komponen React.
- Implementasi unggah file (foto/bukti bayar) dengan Inertia.

## 6. Pro Level: Optimasi & UX

- Teknik Partial Reloads untuk mengambil data tertentu saja agar hemat bandwidth.
- Implementasi Lazy Loading untuk memecah beban kode saat aplikasi membesar.
- Navigasi via skrip menggunakan router.visit() untuk logika kompleks.
- Mengurangi beban server dengan teknik Debouncing pada fitur pencarian.

## 7. Integrasi Tooling

- Memanggil rute Laravel di React menggunakan helper route() dari Ziggy.
- Integrasi desain responsif menggunakan Tailwind CSS di dalam komponen.
- Mengelola Title dan SEO per halaman menggunakan komponen Head.

---

## 8. State Management Tingkat Lanjut

- React Context dengan Inertia: Mengelola state global yang tidak berasal dari Laravel (seperti tema dark mode).
- Zustand atau Redux Integration: Kapan harus menggunakan state management eksternal di dalam aplikasi Inertia.
- SWR atau React Query: Menangani pengambilan data API pihak ketiga (seperti harga pulsa real-time dari provider) secara independen dari Inertia.

## 9. Penanganan UI & UX Modern

- Inertia Modals & Dialogs: Teknik menampilkan halaman sebagai modal tanpa kehilangan context halaman di bawahnya.
- Toast & Notifications: Sinkronisasi Flash Messages Laravel dengan library notifikasi seperti React Hot Toast atau Sonner.
- Skeleton Screens: Membuat tampilan loading yang halus saat menunggu data dari server menggunakan fitur Deferred Props Laravel 12.

## 10. Testing & Security di Frontend

- Testing React Components: Melakukan pengujian unit pada komponen UI menggunakan Vitest atau React Testing Library.
- Inertia Testing Helpers: Cara mengetes navigasi dan pengiriman data tanpa harus membuka browser.
- Frontend Security: Memahami batasan data sensitif yang boleh dikirim melalui Props agar tidak terlihat oleh user melalui Vue/React DevTools.

[ Kembali ke Beranda ](../index.md)
