module.exports = {
  async headers() {
    return [
      {
        source: "/api/users/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml",
          },
        ],
      },
      {
        source: "/api/posts/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml",
          },
        ],
      },
      {
        source: "/api/image/users/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml",
          },
        ],
      },
      {
        source: "/api/image/posts/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml",
          },
        ],
      },
    ];
  },
  i18n: {
    locales: ["en-us", "en-in", "en-uk", "en-nl", "en-au", "en-ca"],
    defaultLocale: "en-us",
    domains: [
      {
        domain: "www.daisforall.com",
        defaultLocale: "en-us",
      },
      {
        domain: "www.daisonline.com",
        defaultLocale: "en-ca",
      },
      {
        domain: "www.daisforall.in",
        defaultLocale: "en-in",
      },
      {
        domain: "www.infinity.cyou",
        defaultLocale: "en-uk",
      },
      {
        domain: "www.arnavgupta.net",
        defaultLocale: "en-nl",
      },
      {
        domain: "www.passionatebloggers.me",
        defaultLocale: "en-au",
      },
    ],
  },
  plugins: [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
        features: {
          "custom-properties": false,
        },
      },
    ],
    [
      "@fullhuman/postcss-purgecss",
      {
        content: [
          "./pages/**/*.{js,jsx,ts,tsx}",
          "./components/**/*.{js,jsx,ts,tsx}",
        ],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: ["html", "body"],
      },
    ],
  ],
};
