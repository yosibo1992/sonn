exports.handler = async (event) => {
  const ua = (event.headers["user-agent"] || "").toLowerCase();
  const path = event.path;

  // Sadece ana sayfa ve index.html
  if (path !== "/" && path !== "/index.html") {
    return { statusCode: 200 };
  }

  // Googlebot kontrolü
  const isGooglebot = /googlebot|mediapartners-google|adsbot-google|google-inspectiontool|googleweblight/i.test(ua);

  if (isGooglebot) {
    return { statusCode: 200 }; // index.html göster
  }

  // Normal kullanıcı → tr.html'e yönlendir
  return {
    statusCode: 302,
    headers: { Location: "/tr.html" }
  };
};
