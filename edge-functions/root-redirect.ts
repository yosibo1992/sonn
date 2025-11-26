// Netlify Edge Functions – Deno ortamı (TypeScript destekler)
export default async (request: Request) => {
  const url = new URL(request.url);
  const userAgent = (request.headers.get("user-agent") || "").toLowerCase();

  // Sadece ana sayfa ve /index.html için çalışsın
  if (url.pathname !== "/" && url.pathname !== "/index.html") {
    return null; // diğer istekler direkt siteye gitsin (next gibi)
  }

  // Googlebot kontrolü – senin orijinal kodunla birebir aynı regex
  const isGooglebot = /googlebot|mediapartners-google|adsbot-google|google-inspectiontool|googleweblight/i.test(userAgent);

  if (isGooglebot) {
    console.log("Googlebot detected – serving index.html (SEO için)");
    return null; // Netlify otomatik olarak index.html döner
  }

  // Normal kullanıcılar → tr.html'e 302 yönlendir
  console.log("Normal user – redirecting to /tr.html");

  const redirectUrl = new URL("/tr.html", url.origin);
  return Response.redirect(redirectUrl.toString(), 302);
};

// Bu edge function sadece şu yollara uygulansın
export const config = {
  path: ["/", "/index.html"],
};
