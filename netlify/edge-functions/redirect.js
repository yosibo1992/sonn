exports.handler = async (event, context) => {
  try {
    const userAgent = (event.headers["user-agent"] || "").toLowerCase();
    const path = event.path;

    // Sadece ana sayfa ve index.html için çalışsın
    if (path !== "/" && path !== "/index.html") {
      return { statusCode: 200 }; // Diğer istekler normal devam etsin
    }

    // Googlebot kontrolü (senin regex'in aynısı)
    const isGooglebot = /googlebot|mediapartners-google|adsbot-google|google-inspectiontool|googleweblight/i.test(userAgent);

    if (isGooglebot) {
      console.log("Googlebot detected – serving index.html (SEO için)");
      return { statusCode: 200 }; // index.html dönsün
    }

    // Normal kullanıcı → tr.html'e yönlendir
    console.log("Normal user – redirecting to /tr.html");
    return {
      statusCode: 302,
      headers: {
        Location: "/tr.html"
      }
    };
  } catch (error) {
    console.error("Function error:", error);
    return { statusCode: 500, body: "Internal Error" };
  }
};
