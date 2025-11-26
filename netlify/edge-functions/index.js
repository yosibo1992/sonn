export default async (request) => {
  try {
    const url = new URL(request.url);  // request.url tam URL içerir
    const ua = (request.headers.get("user-agent") || "").toLowerCase();

    // Sadece ana sayfa ve index.html için çalışsın
    const pathname = url.pathname;
    if (pathname !== "/" && pathname !== "/index.html") {
      return null;  // Diğer istekler devam etsin
    }

    // Googlebot kontrolü (senin regex'in aynısı)
    const isGooglebot = /googlebot|mediapartners-google|adsbot-google|google-inspectiontool|googleweblight/i.test(ua);

    if (isGooglebot) {
      console.log("Googlebot detected – serving index.html");
      return null;  // index.html dönsün (SEO/rich results için)
    }

    // Normal kullanıcı → tr.html'e yönlendir
    console.log("Normal user – redirecting to /tr.html");
    const origin = new URL(request.url).origin;  // Güvenli origin alma
    return Response.redirect(new URL("/tr.html", origin).toString(), 302);
  } catch (error) {
    console.error("Edge Function error:", error);
    return new Response("Internal Error", { status: 500 });  // Hata durumunda fallback
  }
};

// Path config (docs'a göre string veya object)
export const config = { path: "/*" };  // Tüm yolları yakala, içerde filtrele
