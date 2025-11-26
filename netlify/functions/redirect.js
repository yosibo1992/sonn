exports.handler = async (event) => {
  const userAgent = (event.headers["user-agent"] || "").toLowerCase();
  const path = event.path;

  // Sadece ana sayfa için çalışsın
  if (path !== "/" && path !== "/index.html") {
    return { statusCode: 200 }; // diğer sayfalar normal açılsın
  }

  // Googlebot mu kontrol et
  const isGooglebot = /googlebot|mediapartners-google|adsbot-google|google-inspectiontool|googleweblight/i.test(userAgent);

  if (isGooglebot) {
    // Googlebot → index.html görsün (rich results burada olacak)
    return { statusCode: 200 };
  }

  // Normal kullanıcı → tr.html’e yönlendir
  return {
    statusCode: 302,
    headers: {
      Location: "/tr.html",
    },
  };
};
