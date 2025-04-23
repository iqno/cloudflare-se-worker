export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const email = request.headers.get("cf-access-authenticated-user-email");
    const country = request.headers.get("cf-ipcountry") || "unknown";

    // Reject unauthenticated users
    if (!email) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Serve /secure endpoint
    if (path === "/secure") {
      const timestamp = new Date().toISOString();
      return new Response(
        `${email} authenticated at ${timestamp} from <a href="/secure/${country}">${country}</a>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    // Serve country flag from /secure/{COUNTRY_CODE}
    const countryMatch = path.match(/^\/secure\/([a-zA-Z]{2})$/);
    if (countryMatch) {
      const countryCode = countryMatch[1].toUpperCase();
      const flagObject = await env.FLAGS.get(`${countryCode}.png`);

      if (!flagObject || !flagObject.body) {
        return new Response("Flag not found", { status: 404 });
      }

      return new Response(flagObject.body, {
        headers: { "Content-Type": "image/png" }
      });
    }

    // Default response for unmatched paths
    return new Response("Not found", { status: 404 });
  }
}
