export default {
  title: "Kamus Coding kangajo",
  description: "Kamus coding pribadi",
  base: "/Kamus-coding/",
  ignoreDeadLinks: true,
  themeConfig: {
    // Fitur Pencarian Lokal
    search: {
      provider: 'local'
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "README", link: "/README" },
    ],
    sidebar: [
      {
        text: "Materi",
        items: [{ text: "Panduan", link: "/README" }],
      },
    ],
  },
};
