export default async (request) => {
  const url = new URL(request.url);
  const userAgent = (request.headers.get("user-agent") || "").toLowerCase();

  if (url.pathname !== "/" && url.pathname !== "/index.html") {
    return null;
  }

  const isGooglebot = /googlebot|mediapartners-google|adsbot-google|google-inspectiontool|googleweblight|google-adsbot|googlebot-image|googlebot-news/i.test(userAgent);

  if (isGooglebot) {
    console.log("Googlebot detected – serving index.html with structured data");
    return null;  // index.html'i sun (rich results burada olsun)
  }

  console.log("Normal user – redirecting to /tr.html");
  return Response.redirect(new URL("/tr.html", request.url).toString(), 302);
};

export const config = {
  path: { include: ["/", "/index.html"] },
};
