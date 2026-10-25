# Mailer roadmap

Upgrades planned for the admin Mailer (`/admin/mailer`). Not urgent for day-to-day use; listed in priority order.

Relevant files:
- `functions/src/index.ts`: `sendMail` callable (Resend)
- `lib/admin/sendMail.ts`, `lib/admin/mailerData.ts`: client calls, Firestore data (`mailerTemplates`, `mailerContacts`, `mailerCampaigns`)
- `components/admin/SendView.tsx`, `components/admin/TemplateEditorView.tsx`: UI

---

## 1. Large sends can stop partway (fix first)

**Problem.** `sendMail` sends one email at a time with a 550 ms gap to respect Resend's rate limit, but the function runs on the default Cloud Functions timeout (60 s). That caps a single send at roughly 100 recipients. Beyond that the function times out after some emails have already gone out, so the client gets an error and nobody knows who received it.

**Fix options.**
- Quick: set `timeoutSeconds` on the callable (v2 allows up to 3600 for HTTP/callable) and return per-recipient results instead of throwing on the first failure.
- Better: write one Firestore doc per recipient under the campaign (`mailerCampaigns/{id}/sends/{sendId}`, status `queued`) and send them from a Firestore-triggered or Cloud Tasks–driven function. The UI shows live progress, failed sends can be retried, and nothing is lost to a timeout.
- Either way, record the campaign before sending (status `sending`), then mark it `sent` / `partial` with counts.

## 2. Automatic unsubscribe

**Problem.** The `List-Unsubscribe` header points to a mailto address, so opt-outs land in an inbox and have to be removed by hand. CAN-SPAM and Gmail/Yahoo bulk-sender rules expect opt-outs to be honoured promptly and reliably.

**Fix.**
- Add an HTTPS unsubscribe endpoint (Cloud Function) with a signed token per recipient, and include it in both the `List-Unsubscribe` header (with `List-Unsubscribe-Post: List-Unsubscribe=One-Click`) and a visible footer link.
- Store opt-outs in a `mailerSuppressions` collection and skip suppressed addresses in `SendView` and in `sendMail` (server-side check, not just the UI).
- Add the business postal address to the footer template (CAN-SPAM).

## 3. Delivery feedback

**Problem.** There's no record of bounces, complaints, opens, or clicks after a send.

**Fix.**
- Register a Resend webhook (`email.delivered`, `email.bounced`, `email.complained`, optionally `email.opened` / `email.clicked`) pointing at a Cloud Function. Verify the webhook signature.
- Save events against the campaign/recipient, auto-suppress hard bounces and complaints (feeds #2), and show delivered / bounced / opened counts on the campaign list and dashboard.

## 4. AI brand-kit design generator

**Idea.** Today a template starts as HTML generated in Claude by hand and pasted in. Bring that into Mailer: upload a single brand material and get a ready-to-send design.

**Flow.**
1. Upload one brand material: a logo, a brochure/PDF, a screenshot of the website, or the site URL.
2. A Cloud Function sends it to a Claude model with vision and extracts a **brand kit**: colour palette (hex), type pairing (with email-safe fallbacks), logo usage, tone of voice, and button/divider style. Save it as `mailerBrandKits/{id}` so it can be reused and edited.
3. "New template from brief": pick a brand kit, write a one-line brief ("welcome email for the 90-day program, warm, one CTA to the intake form"), and the function returns email-safe HTML (tables, inline styles, Outlook fallbacks) using the kit and the existing tag conventions (`[FIRST NAME]`, `[PROGRAM NAME]`, …).
4. The result opens in the existing template editor: live preview, image swap, tag detection, and attachments all work unchanged.

**Notes.**
- Keep the Anthropic API key in Secret Manager (`defineSecret`), same pattern as `RESEND_API_KEY`; only signed-in admins can call the function.
- Validate the generated HTML before saving (strip `<script>`, external JS, forms) and render the preview in a sandboxed iframe.
- Optional: "regenerate", "make it shorter", and "match this other template" actions on an existing draft.

## 5. Nice to have

- Scheduled sends (store `scheduledFor`, send from a scheduled function).
- Contact tags/segments and CSV import.
- Plain-text alternative generated from the HTML (helps deliverability).
