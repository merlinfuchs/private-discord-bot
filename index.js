addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const { searchParams } = new URL(request.url)

  const guildID = searchParams.get('guild_id')
  const allowed = await KV.get(guildID)
  if (!allowed || !guildID) {
    return new Response('You cant invite the bot to this server', {status: 401})
  }

  const code = searchParams.get('code')
  if (!code) {
    return new Response('No auth code provided', {status: 401})
  }

  const payload = new FormData()
  payload.set('client_id', CLIENT_ID)
  payload.set('client_secret', CLIENT_SECRET)
  payload.set('grant_type', 'authorization_code')
  payload.set('code', code)
  payload.set('redirect_uri', REDIRECT_URI)

  resp = await fetch('https://discord.com/api/v8/oauth2/token', {method: 'POST', body: payload})
  if (!resp.ok) {
    return new Response('Invalid auth code provided', {status: 400})
  }

  return new Response('The bot has been invited!')
}
