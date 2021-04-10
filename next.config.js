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
    locales: ["en-in"],
    defaultLocale: "en-in",
    domains: [
      {
        domain: "www.daisforall.com",
        defaultLocale: "en-in",
      },
      {
        domain: "www.infinity.cyou",
        defaultLocale: "en-in",
      },
      {
        domain: "www.arnavgupta.net",
        defaultLocale: "en-in",
      },
      {
        domain: "www.passionatebloggers.me",
        defaultLocale: "en-in",
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
