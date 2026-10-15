const ALLOWED_ORIGINS = new Set([
  "https://investoexperts.com",
  "https://www.investoexperts.com",
]);

const RECIPIENTS = ["919799922051", "918386002000"];

function json(body, status, origin) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Vary": "Origin",
  };
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
    headers["Access-Control-Max-Age"] = "86400";
  }
  return new Response(JSON.stringify(body), { status, headers });
}

function clean(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      if (!ALLOWED_ORIGINS.has(origin)) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
        "Vary": "Origin",
      }});
    }

    if (!ALLOWED_ORIGINS.has(origin)) return json({ error: "forbidden" }, 403, origin);
    if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405, origin);
    if (url.pathname !== "/consultation") return json({ error: "not_found" }, 404, origin);

    const contentLength = Number(request.headers.get("Content-Length") || "0");
    if (contentLength > 10000) return json({ error: "request_too_large" }, 413, origin);

    let form;
    try {
      form = await request.json();
    } catch {
      return json({ error: "invalid_request" }, 400, origin);
    }
    if (typeof form !== "object" || form === null || Array.isArray(form)) {
      return json({ error: "invalid_request" }, 400, origin);
    }

    // Silently discard bot submissions caught by the hidden honeypot field.
    if (clean(form.website, 200)) return json({ ok: true }, 200, origin);

    const name = clean(form.name, 120);
    const phone = clean(form.phone, 32);
    const email = clean(form.email, 180);
    const service = clean(form.service, 120);
    const amount = clean(form.amount, 80);
    const note = clean(form.message, 1200);

    if (!name || !phone) return json({ error: "missing_required_fields" }, 400, origin);
    if (!env.WHATSAPP_ACCESS_TOKEN || !env.WHATSAPP_PHONE_NUMBER_ID ||
        !env.WHATSAPP_GRAPH_API_VERSION || !env.WHATSAPP_TEMPLATE_NAME ||
        !env.WHATSAPP_TEMPLATE_LANGUAGE) {
      return json({ error: "server_not_configured" }, 503, origin);
    }
    if (!/^v\d+\.\d+$/.test(env.WHATSAPP_GRAPH_API_VERSION)) {
      return json({ error: "server_not_configured" }, 503, origin);
    }

    const details = [
      "Name: " + name,
      "Phone: " + phone,
      email ? "Email: " + email : "",
      service ? "Service: " + service : "",
      amount ? "Investment amount: " + amount : "",
      note ? "Message: " + note : "",
    ].filter(Boolean).join("\n").slice(0, 900);
    const endpoint = "https://graph.facebook.com/" +
      env.WHATSAPP_GRAPH_API_VERSION + "/" +
      env.WHATSAPP_PHONE_NUMBER_ID + "/messages";

    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      type: "template",
      template: {
        name: env.WHATSAPP_TEMPLATE_NAME,
        language: { code: env.WHATSAPP_TEMPLATE_LANGUAGE },
        components: [{
          type: "body",
          parameters: [{ type: "text", text: details }],
        }],
      },
    };

    try {
      const results = await Promise.all(RECIPIENTS.map(async (to) => {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + env.WHATSAPP_ACCESS_TOKEN,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...payload, to }),
        });
        if (!response.ok) {
          const detail = await response.text();
          console.error("WhatsApp API rejected a notification", response.status, detail.slice(0, 500));
          return false;
        }
        return true;
      }));

      if (!results.every(Boolean)) return json({ error: "delivery_failed" }, 502, origin);
      return json({ ok: true }, 200, origin);
    } catch (error) {
      console.error("WhatsApp API request failed", String(error));
      return json({ error: "delivery_failed" }, 502, origin);
    }
  },
};
