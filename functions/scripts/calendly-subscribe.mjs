// One-time setup: tells Calendly to send booking/cancel events to the calendlyWebhook function.
// Run from the project root:  node functions/scripts/calendly-subscribe.mjs
// It asks for a Calendly personal access token (Calendly > Integrations > API & Webhooks) and
// reads the signing key from Firebase secrets, so neither ends up in a file or the shell history.
import { execSync } from 'node:child_process'
import { createInterface } from 'node:readline/promises'

const WEBHOOK_URL = 'https://us-central1-aiecc-landing-page.cloudfunctions.net/calendlyWebhook'
const API = 'https://api.calendly.com'

const rl = createInterface({ input: process.stdin, output: process.stdout })
const token = (await rl.question('Paste your Calendly personal access token: ')).trim()
rl.close()
if (!token) throw new Error('No token entered.')

const signingKey = execSync('npx firebase functions:secrets:access CALENDLY_SIGNING_KEY', {
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'ignore'],
}).trim()

async function calendly(path, init = {}) {
  const res = await fetch(API + path, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...init.headers },
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`${path} -> ${res.status}: ${body.message || JSON.stringify(body)}`)
  return body
}

const me = (await calendly('/users/me')).resource
console.log(`\nSigned in to Calendly as ${me.name}.`)

const types = (await calendly(`/event_types?user=${encodeURIComponent(me.uri)}&count=100`)).collection
console.log('Your event types (bookings whose name contains "clarity" get the prep email):')
for (const t of types) console.log(`  ${/clarity/i.test(t.name) ? '✓' : ' '} ${t.name}${t.active ? '' : ' (inactive)'}`)

const existing = (
  await calendly(
    `/webhook_subscriptions?organization=${encodeURIComponent(me.current_organization)}&user=${encodeURIComponent(me.uri)}&scope=user`
  )
).collection
if (existing.some((w) => w.callback_url === WEBHOOK_URL && w.state === 'active')) {
  console.log('\nThe webhook is already set up. Nothing to do.')
} else {
  await calendly('/webhook_subscriptions', {
    method: 'POST',
    body: JSON.stringify({
      url: WEBHOOK_URL,
      events: ['invitee.created', 'invitee.canceled'],
      organization: me.current_organization,
      user: me.uri,
      scope: 'user',
      signing_key: signingKey,
    }),
  })
  console.log('\nDone: Calendly will now notify the site when a Clarity Call is booked or canceled.')
}
