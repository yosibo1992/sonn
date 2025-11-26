exports.handler = async (event) => {
  const ua = (event.headers["user-agent"] || "").toLowerCase();
  const path = event.path;

  if (path !== "/" && path !== "/index.html") {
    return { statusCode: 200 };
  }

  const isGooglebot = /googlebot|mediapartners-google|adsbot-google|google-inspectiontool|googleweblight/i.test(ua);

  if (isGooglebot) {
    // Googlebot → tam index.html içeriğini sun (redirect yok)
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: `<!-- index.html'in tam içeriğini buraya koy veya dosya oku --> <html><head><title>Sonbahis</title></head><body>Gerçek site içeriği burada (SEO için).</body></html>`
    };
  }

  // Normal kullanıcı → tr.html'e 301 yönlendir (kalıcı, SEO dostu)
  return {
    statusCode: 301,
    headers: { Location: "/tr.html" }
  };
};
