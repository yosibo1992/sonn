export default async (request) => {
  const url = new URL(request.url);
  const ua = (request.headers.get("user-agent") || "").toLowerCase();

  // Sadece ana sayfa için çalışsın
  if (url.pathname !== "/" && url.pathname !== "/index.html") {
    return null;
  }

  // Googlebot kontrolü
  const isGooglebot = /googlebot|mediapartners-google|adsbot-google|google-inspectiontool|googleweblight/i.test(ua);

  if (isGooglebot) {
    console.log("Googlebot → index.html gösteriliyor");
    return null; // index.html dönsün
  }

  console.log("Normal kullanıcı → tr.html'e yönlendiriliyor");
  return Response.redirect(new URL("/tr.html", url.origin).toString(), 302);
};

export const config = {
  path: ["/", "/index.html"]
};
