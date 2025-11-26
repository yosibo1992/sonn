export default async (request) => {
  const url = new URL(request.url);
  const userAgent = (request.headers.get("user-agent") || "").toLowerCase();

  // Sadece ana sayfa ve index.html için çalışsın
  if (url.pathname !== "/" && url.pathname !== "/index.html") {
    return null;  // Diğer istekler devam etsin
  }

  // Googlebot kontrolü (senin regex'in aynısı)
  const isGooglebot = /googlebot|mediapartners-google|adsbot-google|google-inspectiontool|googleweblight/i.test(userAgent);

  if (isGooglebot) {
    console.log("Googlebot detected – serving index.html");
    return null;  // index.html dönsün (SEO/rich results için)
  }

  // Normal kullanıcı → tr.html'e yönlendir
  console.log("Normal user – redirecting to /tr.html");
  return Response.redirect(new URL("/tr.html", url.origin).toString(), 302);
};

export const config = { path: ["/", "/index.html"] };
