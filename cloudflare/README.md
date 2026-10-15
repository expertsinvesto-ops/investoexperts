# Consultation form WhatsApp Worker

This Cloudflare Worker accepts consultation form submissions from the Investo Experts website and sends an approved WhatsApp template message to both business recipients. It returns success only after the WhatsApp API accepts both send requests.

## Cloudflare and Meta setup

1. Create and get Meta approval for a WhatsApp message template named `website_consultation_lead` with one body text parameter. Suggested body: `New website consultation request: {{1}}`. Use the template language code exactly as shown in WhatsApp Manager.
2. Deploy this Worker from the repository root with `npx wrangler deploy --config cloudflare/wrangler.toml`. The configured custom domain is `api.investoexperts.com`; this requires an active Cloudflare zone for `investoexperts.com`.
3. In Cloudflare, open Workers & Pages, select `investoexperts-consultation-api`, then Settings > Variables and Secrets. Add these bindings. Store them as Worker secrets so the values are not exposed in the website or source repository:
   - `WHATSAPP_ACCESS_TOKEN`: production system-user access token with WhatsApp messaging permission.
   - `WHATSAPP_PHONE_NUMBER_ID`: sender phone number ID from WhatsApp Cloud API setup. This is the registered business sender, not either recipient.
   - `WHATSAPP_GRAPH_API_VERSION`: Graph API version supported by the connected Meta app.
   - `WHATSAPP_TEMPLATE_NAME`: `website_consultation_lead`, or the exact name of your approved template.
   - `WHATSAPP_TEMPLATE_LANGUAGE`: the exact approved language code, such as `en`.
4. Save the bindings and deploy the latest Worker version. Confirm the custom domain is active.
5. The website sends POST requests to `https://api.investoexperts.com/consultation`. The Worker accepts requests from `investoexperts.com` and `www.investoexperts.com` only.

The API token must stay in Cloudflare Worker secrets; never put it in HTML or JavaScript. WhatsApp template messages are used so notifications can be sent when there is no open customer-service conversation window.
