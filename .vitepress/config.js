export default {
  title: "Kamus Coding kangajo",
  description: "Kamus coding pribadi",
  base: "/Kamus-coding/", // WAJIB: Sesuaikan dengan nama repo GitHub kamu
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Panduan", link: "/README" },
    ],
    sidebar: [
      {
        text: "Daftar Isi",
        items: [
          { text: "Pendahuluan", link: "/README" },
          { text: "Kamus HTML", link: "/html" },
        ],
      },
    ],
  },
};
