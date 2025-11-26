export default async (request) => {
  const url = new URL(request.url);
  const ua = (request.headers.get("user-agent") || "").toLowerCase();

  // Sadece kök ve index.html için çalışsın
  const pathname = url.pathname;
  if (pathname !== "/" && pathname !== "/index.html") {
    return null; // diğer yollar normal devam etsin
  }

  // Googlebot kontrolü
  const isGooglebot = /googlebot|mediapartners-google|adsbot-google|google-inspectiontool|googleweblight/i.test(ua);

  if (isGooglebot) {
    return null; // Googlebot index.html görsün
  }

  // Normal kullanıcı → tr.html'e yönlendir
  return Response.redirect(new URL("/tr.html", url.origin).toString(), 302);
};

// Artık config burada da /* olarak tanımlı
export const config = {
  path: "/*"
};
