# Consultation form WhatsApp Worker

This Cloudflare Worker accepts consultation form submissions from the Investo Experts website and sends a WhatsApp template message to both business recipients. It returns success only after the WhatsApp API accepts both send requests.

## Cloudflare setup

1. Create and get Meta approval for a WhatsApp message template named `website_consultation_lead` with one body text parameter. Suggested body: `New website consultation request:\n{{1}}`. Use the template language code exactly as shown in WhatsApp Manager.
2. Deploy this Worker from the `cloudflare` directory, or run `npx wrangler deploy --config cloudflare/wrangler.toml` from the repository root.
3. In the Cloudflare Worker settings, add these bindings under Variables and Secrets. Store every value as a secret so none enters the website source:
   - `WHATSAPP_ACCESS_TOKEN`: a production system-user access token with WhatsApp messaging permission.
   - `WHATSAPP_PHONE_NUMBER_ID`: the sender phone number ID from the WhatsApp Cloud API setup. This is the business sender, not either notification recipient.
   - `WHATSAPP_GRAPH_API_VERSION`: the Graph API version supported by the connected Meta app (for example, the version listed in its API setup).
   - `WHATSAPP_TEMPLATE_NAME`: `website_consultation_lead`, or the exact name of your approved template.
   - `WHATSAPP_TEMPLATE_LANGUAGE`: the exact approved language code, such as `en`.
4. Add the Worker custom domain `api.investoexperts.com` in Cloudflare. This requires an active Cloudflare zone for `investoexperts.com`.
5. Verify that the Worker is deployed and that `https://api.investoexperts.com/consultation` responds with HTTP 405 to a GET request. The website sends POST requests to this endpoint.

The API token must stay in Cloudflare Worker secrets; never put it in HTML or JavaScript. WhatsApp template messages are used so submissions can be delivered even when there is no open customer-service conversation window.
