import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const handler = async (event) => {
  const ua = (event.headers["user-agent"] || "").toLowerCase();
  const path = event.path;

  // Sadece kök ve index.html için çalış
  if (path !== "/" && path !== "/index.html") {
    return { statusCode: 200 };
  }

  // Googlebot kontrolü
  const isGooglebot = /googlebot|mediapartners-google|adsbot-google|google-inspectiontool|googleweblight/i.test(ua);

  if (isGooglebot) {
    try {
      // Gerçek index.html dosyasını oku ve sun
      const filePath = join(process.cwd(), "index.html");
      const html = await readFile(filePath, "utf-8");
      return {
        statusCode: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
        body: html
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: "index.html okunamadı"
      };
    }
  }

  // Normal kullanıcı → tr.html'e kalıcı yönlendir
  return {
    statusCode: 301,
    headers: { Location: "/tr.html" }
  };
};
